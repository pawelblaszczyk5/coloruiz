'use server';

import invariant from 'tiny-invariant';
import { z } from 'zod';
import { type Color, completeLevel, startNewGame } from '~/lib/game';
import { vact } from '~/lib/vact';
import { HEX_REGEX, colorValueSchema } from '~/lib/validation';

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

export const handleAnswerSubmission = vact(
	z.union([
		z.object({
			hex: z.union([
				z
					.string({
						invalid_type_error: 'Value is required',
						required_error: 'Value is required',
					})
					.length(3, 'Value must be a valid hex color')
					.regex(HEX_REGEX, 'Value must be a valid hex color'),
				z
					.string({
						invalid_type_error: 'Value is required',
						required_error: 'Value is required',
					})
					.length(6, 'Value must be a valid hex color')
					.regex(HEX_REGEX, 'Value must be a valid hex color'),
			]),
		}),
		z.object({
			r: colorValueSchema,
			g: colorValueSchema,
			b: colorValueSchema,
		}),
	]),
)(async data => completeLevel(normalizeAnswer(data)));

export const handleGameStart = async () => await startNewGame();
