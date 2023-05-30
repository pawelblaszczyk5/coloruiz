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
	status: z.enum(['IN_PROGRESS', 'FINISHED']),
});

type GameState = z.infer<typeof gameStateSchema>;
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

const MAXIMUM_DIFFERENCE = 3 * 255;

const calculatePercentageDifference = (colorA: Color, colorB: Color) => {
	const differenceSum = colorA.reduce((currentSum, colorAValue, index) => {
		const colorBValue = colorB[index];

		invariant(typeof colorBValue === 'number', 'Colors should always have 3 values');

		return currentSum + Math.abs(colorAValue - colorBValue);
	}, 0);

	return differenceSum / MAXIMUM_DIFFERENCE;
};

const BASE_ALLOWED_DIFFERENCE = 0.4;
const ALLOWED_DIFFERENCE_PER_LEVEL_MULTIPLIER = 0.9;

const getAllowedPercentageDifferencePerLevel = (currentLevel: number) =>
	BASE_ALLOWED_DIFFERENCE * ALLOWED_DIFFERENCE_PER_LEVEL_MULTIPLIER ** (currentLevel - 1);

const PERFECT_SCORE = 500;

export const completeLevel = async (guess: Color) => {
	const gameState = await getGameState();

	invariant(gameState, 'User should start a game before completing level');

	const percentageDifference = calculatePercentageDifference(guess, gameState.currentColor);
	const allowedPercentageDifference = getAllowedPercentageDifferencePerLevel(gameState.level);

	gameState.score += Math.round(PERFECT_SCORE * (1 - percentageDifference));

	if (percentageDifference > allowedPercentageDifference) gameState.status = 'FINISHED';
	else gameState.currentColor = generateRandomColor();

	await saveGameState(gameState);
};

export const checkIsGameInProgress = async () => {
	const gameState = await getGameState();

	return gameState !== null;
};
