import { startGame } from '~/app/game/_actions/game';
import { Button } from '~/components/button';

export const Introduction = () => {
	return (
		<div className="flex flex-col items-center gap-10">
			<h1 className="text-4xl">How to play?</h1>
			<div className="flex flex-col gap-4">
				<p className="md:text-lg">
					In each level you&apos;l get a random color displayed. Your goal is to assign RGB (red, green, blue) values to
					a given color.
				</p>
				<p className="md:text-lg">
					Every level gets progressively harder and you need to get closer to actual values to proceed. However, the
					score available to get also increase.
				</p>
				<p className="md:text-lg">
					At all time you can also switch between providing separate RGB values or the hexadecimal value of the color.
				</p>
			</div>
			<form action={startGame}>
				<Button>Start a new game</Button>
			</form>
		</div>
	);
};
