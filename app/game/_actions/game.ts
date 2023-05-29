'use server';

import { completeLevel, startNewGame } from '~/utils/game-state';

export const proceedGame = async (formData: FormData) => {
	const r = formData.get('color-r');
	const g = formData.get('color-g');
	const b = formData.get('color-b');

	if (!r || typeof r !== 'string' || !g || typeof g !== 'string' || !b || typeof b !== 'string') throw new Error('bla');

	const rValue = Number(r);
	const gValue = Number(g);
	const bValue = Number(b);

	await completeLevel([rValue, gValue, bValue]);
};

export const startGame = async () => {
	await startNewGame();
};
