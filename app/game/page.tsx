import { getDefaultGameState, getGameState } from '~/utils/game-state';

export const runtime = 'edge';

const Game = async () => {
	const gameState = (await getGameState()) ?? getDefaultGameState();

	return <h1>{JSON.stringify(gameState)}</h1>;
};

export default Game;
