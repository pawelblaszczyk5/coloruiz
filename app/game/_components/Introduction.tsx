import { startGame } from '~/app/game/_actions/game';
import { Button } from '~/components/button';

export const Introduction = () => {
	return (
		<>
			<h1>Introduction</h1>
			<form action={startGame}>
				<Button>Start game</Button>
			</form>
		</>
	);
};
