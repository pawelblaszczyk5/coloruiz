import { match } from 'ts-pattern';
import { handleGameStart } from '~/app/game/_actions/game';
import { Button } from '~/components/button';
import { type GameState } from '~/utils/game-state';

export const Summary = ({ state }: { state: GameState }) => {
	return (
		<div className="flex flex-col items-center gap-10">
			<h1 className="text-4xl">
				{match(state.level)
					.when(
						level => level > 10,
						() => "You're crazy 😮",
					)
					.when(
						level => level > 8,
						() => 'Very good 🥳',
					)
					.when(
						level => level > 6,
						() => "You're learning 🧑‍🎓",
					)
					.when(
						level => level > 4,
						() => 'You can do better 😇',
					)
					.when(
						level => level > 2,
						() => "You'll get better 🙂",
					)
					.otherwise(() => 'That sucks 😞')}
			</h1>
			<div className="flex flex-col gap-1">
				<h2 className="text-lg">Final score: {state.score}</h2>
				<h3 className="text-lg">Final level: {state.level}</h3>
				{typeof state.guessAccuracy === 'number' && (
					<h4 className="text-lg">Last guess accuracy: {state.guessAccuracy}%</h4>
				)}
			</div>

			<form action={handleGameStart}>
				<Button>New game</Button>
			</form>
		</div>
	);
};
