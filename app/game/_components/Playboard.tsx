import { proceedGame } from '~/app/game/_actions/game';
import { Button } from '~/components/button';
import { type GameState } from '~/utils/game-state';

export const Playboard = ({ state }: { state: GameState }) => {
	const [r, g, b] = state.currentColor;

	return (
		<>
			<div
				className="h-32 w-32 rounded-md shadow-md shadow-stone-950/30 dark:shadow-stone-500/10"
				style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }}
			/>
			<h1>score: {state.score}</h1>
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
