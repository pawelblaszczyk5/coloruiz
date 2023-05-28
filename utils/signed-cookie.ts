import 'server-only';
import invariant from 'tiny-invariant';

const textEncoder = new TextEncoder();

const convertStringIntoCryptoKey = async (text: string) =>
	crypto.subtle.importKey('raw', textEncoder.encode(text), { name: 'HMAC', hash: 'SHA-512' }, false, [
		'sign',
		'verify',
	]);

const isValidHexValue = (text: string) => {
	return /^[\da-f]+$/iu.test(text);
};

const convertHexStringIntoBuffer = (text: string) => {
	const matches = text.match(/../gu);

	invariant(matches, 'Text is an invalid hexadecimal value');

	return new Uint8Array(matches.map(hex => Number.parseInt(hex, 16))).buffer;
};

const asyncSome = async <TArrayElement>(
	array: Array<TArrayElement>,
	predicate: (element: TArrayElement) => Promise<boolean>,
) => {
	// eslint-disable-next-line fp/no-loops -- forced to use, standard some doesn't support async
	for (const element of array) if (await predicate(element)) return true;

	return false;
};

export const signCookie = async (value: string, providedSecrets: string | Array<string>) => {
	const secret = Array.isArray(providedSecrets) ? providedSecrets.at(-1) : providedSecrets;

	invariant(secret, "Secrets array can't be empty and a secret must have value");

	const key = await convertStringIntoCryptoKey(secret);

	const signature = await crypto.subtle.sign({ name: 'HMAC' }, key, textEncoder.encode(value));
	const digest = new Uint8Array(signature).reduce((data, byte) => data + byte.toString(16).padStart(2, '0'), '');

	return `${value}.${digest}`;
};

export const unsignCookie = async (value: string, providedSecrets: string | Array<string>) => {
	const secrets = Array.isArray(providedSecrets) ? [...providedSecrets] : [providedSecrets];

	invariant(secrets.length, "Secrets array can't be empty and a secret must have value");

	const dataEndIndex = value.lastIndexOf('.');
	const data = value.slice(0, dataEndIndex);
	const digest = value.slice(dataEndIndex);

	if (!data || !digest) return null;

	const anySecretMatches = await asyncSome(secrets.reverse(), async secret => {
		const key = await convertStringIntoCryptoKey(secret);

		if (!isValidHexValue(digest)) return false;

		return await crypto.subtle.verify(
			{ name: 'HMAC' },
			key,
			convertHexStringIntoBuffer(digest),
			textEncoder.encode(data),
		);
	});

	return anySecretMatches ? data : null;
};
