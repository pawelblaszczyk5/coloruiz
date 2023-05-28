import { cookies } from 'next/headers';
import { z } from 'zod';
import { env } from '~/app/env.mjs';
import { signCookie, unsignCookie } from '~/utils/signed-cookie';

const COOKIE_NAME = 'coloruiz-game-state';

const colorValueSchema = z.number().min(0).max(255);

const gameStateSchema = z.object({
	level: z.number().min(1),
	score: z.number().min(0),
	currentColor: z.tuple([colorValueSchema, colorValueSchema, colorValueSchema]),
});

type GameState = z.infer<typeof gameStateSchema>;

const getRandomNumberBetweenInts = (min: number, max: number) => {
	const roundedMin = Math.ceil(min);
	const roundedMax = Math.floor(max);

	return Math.floor(Math.random() * (roundedMax - roundedMin + 1) + roundedMin);
};

const generateRandomColor = () => {
	return [
		getRandomNumberBetweenInts(0, 255),
		getRandomNumberBetweenInts(0, 255),
		getRandomNumberBetweenInts(0, 255),
	] satisfies GameState['currentColor'];
};

export const getDefaultGameState = () => {
	return {
		level: 1,
		score: 0,
		currentColor: generateRandomColor(),
	} satisfies GameState;
};

export const getGameState = async () => {
	const cookieValue = cookies().get(COOKIE_NAME)?.value;

	if (!cookieValue) return null;

	const unsignedCookieValue = await unsignCookie(cookieValue, env.GAME_STATE_COOKIE_SECRET);

	if (!unsignedCookieValue) return null;

	try {
		return gameStateSchema.parse(JSON.parse(unsignedCookieValue));
	} catch {
		return null;
	}
};

export const saveGameState = async (state: GameState) => {
	const signedCookieValue = await signCookie(JSON.stringify(state), env.GAME_STATE_COOKIE_SECRET);

	cookies().set(COOKIE_NAME, signedCookieValue, {
		secure: true,
		sameSite: true,
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 365, // full year,
	});
};

export const checkIsGameInProgress = async () => {
	const gameState = await getGameState();

	return gameState !== null;
};
