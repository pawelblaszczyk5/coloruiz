import { handleGameStart } from '~/app/game/_actions/game';
import { Button } from '~/components/button';
import { type GameState } from '~/utils/game-state';

export const Summary = ({ state }: { state: GameState }) => {
	return (
		<div className="flex flex-col items-center gap-10">
			<h1>Final score: {state.score}</h1>
			<form action={handleGameStart}>
				<Button>New game</Button>
			</form>
		</div>
	);
};
