import { startGame } from '~/app/game/_actions/game';
import { Button } from '~/components/button';
import { type GameState } from '~/utils/game-state';

export const Summary = ({ state }: { state: GameState }) => {
	return (
		<>
			<h1>Final score: {state.score}</h1>
			<form action={startGame}>
				<Button>New game</Button>
			</form>
		</>
	);
};
