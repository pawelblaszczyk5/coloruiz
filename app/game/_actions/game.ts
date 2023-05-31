'use server';

import invariant from 'tiny-invariant';
import { gameAnswerSchema } from '~/lib/constants';
import { type Color, completeLevel, startNewGame } from '~/lib/game';
import { vact } from '~/lib/vact';

const normalizeAnswer = (answer: { hex: string } | { r: number; g: number; b: number }): Color => {
	if ('r' in answer) return [answer.r, answer.g, answer.b];

	if (answer.hex.length === 3) {
		const matches = answer.hex.match(/./gu);

		invariant(matches, 'Text is an invalid hexadecimal value');

		return matches.map(hex => Number.parseInt(`${hex}${hex}`, 16)) as Color;
	}

	const matches = answer.hex.match(/../gu);

	invariant(matches, 'Text is an invalid hexadecimal value');

	return matches.map(hex => Number.parseInt(hex, 16)) as Color;
};

export const handleAnswerSubmission = vact(gameAnswerSchema)(async data => completeLevel(normalizeAnswer(data)));

export const handleGameStart = async () => await startNewGame();
