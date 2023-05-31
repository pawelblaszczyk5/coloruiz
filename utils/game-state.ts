import { cookies } from 'next/headers';
import invariant from 'tiny-invariant';
import { z } from 'zod';
import { env } from '~/utils/env.mjs';
import { signCookie, unsignCookie } from '~/utils/signed-cookie';

const COOKIE_NAME = 'coloruiz-game-state';

const colorValueSchema = z.number().min(0).max(255);

const gameStateSchema = z.object({
	level: z.number().min(1),
	score: z.number().min(0),
	currentColor: z.tuple([colorValueSchema, colorValueSchema, colorValueSchema]),
	guessAccuracy: z.number().min(0).max(100).optional(),
	status: z.enum(['IN_PROGRESS', 'FINISHED']),
});

export type GameState = z.infer<typeof gameStateSchema>;

type Color = GameState['currentColor'];

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

const getDefaultGameState = () => {
	return {
		level: 1,
		score: 0,
		currentColor: generateRandomColor(),
		status: 'IN_PROGRESS',
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

const saveGameState = async (state: GameState) => {
	const signedCookieValue = await signCookie(JSON.stringify(state), env.GAME_STATE_COOKIE_SECRET);

	cookies().set(COOKIE_NAME, signedCookieValue, {
		secure: true,
		sameSite: 'strict',
		httpOnly: true,
		path: '/',
		maxAge: 60 * 60 * 24 * 365, // full year,
	});
};

export const startNewGame = async () => saveGameState(getDefaultGameState());

const MAX_DIFF = 3 * 255;

const calculateDiff = (colorA: Color, colorB: Color) => {
	const differenceSum = colorA.reduce((currentSum, colorAValue, index) => {
		const colorBValue = colorB[index];

		invariant(typeof colorBValue === 'number', 'Colors should always have 3 values');

		return currentSum + Math.abs(colorAValue - colorBValue);
	}, 0);

	return differenceSum / MAX_DIFF;
};

const BASE_ALLOWED_DIFF = 0.4;
const ALLOWED_DIFF_PER_LEVEL_MULTIPLIER = 0.9;

const getAllowedDiffPerLevel = (currentLevel: number) =>
	BASE_ALLOWED_DIFF * ALLOWED_DIFF_PER_LEVEL_MULTIPLIER ** (currentLevel - 1);

const PERFECT_SCORE = 500;

export const completeLevel = async (guess: Color) => {
	const gameState = await getGameState();

	invariant(gameState, 'User should start a game before completing level');

	const difference = calculateDiff(guess, gameState.currentColor);
	const allowedDifference = getAllowedDiffPerLevel(gameState.level);

	const accuracy = 1 - difference;

	gameState.score += Math.round(PERFECT_SCORE * accuracy);
	gameState.guessAccuracy = Math.round(accuracy * 100);

	if (difference > allowedDifference) gameState.status = 'FINISHED';
	else gameState.currentColor = generateRandomColor();

	await saveGameState(gameState);
};

export const checkIsActiveGame = async () => {
	const gameState = await getGameState();

	return gameState !== null;
};
