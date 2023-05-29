import { proceedGame, startGame } from '~/app/game/_actions/game';
import { Button } from '~/components/button';
import { getGameState } from '~/utils/game-state';

export const runtime = 'edge';

const Game = async () => {
	const gameState = await getGameState();

	if (!gameState)
		return (
			<form action={startGame}>
				<Button>Start game</Button>
			</form>
		);

	if (gameState.status === 'FINISHED')
		return (
			<>
				<h1>Finished - final score: {gameState.score}</h1>
				<form action={startGame}>
					<Button>New game</Button>
				</form>
			</>
		);

	const [r, g, b] = gameState.currentColor;

	return (
		<>
			<div
				className="h-32 w-32 rounded-md shadow-md shadow-stone-950/30 dark:shadow-stone-500/10"
				style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }}
			/>
			<h1>score: {gameState.score}</h1>
			<form className="flex flex-col gap-3" action={proceedGame}>
				<label htmlFor="color-r">R</label>
				<input min="0" max="255" step={1} required type="number" name="color-r" />
				<label htmlFor="color-g">G</label>
				<input min="0" max="255" step={1} required type="number" name="color-g" id="color-g" />
				<label htmlFor="color-b">B</label>
				<input min="0" max="255" step={1} required type="number" name="color-b" id="color-b" />
				<Button>Complete level</Button>
			</form>
		</>
	);
};

export default Game;
