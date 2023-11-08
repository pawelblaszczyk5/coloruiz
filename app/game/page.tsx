import { match } from 'ts-pattern';
import { Introduction } from '~/app/game/_components/Introduction';
import { Playboard } from '~/app/game/_components/Playboard';
import { Summary } from '~/app/game/_components/Summary';
import { getGameState } from '~/lib/game';

const Game = async () => {
	const gameState = await getGameState();

	return match(gameState)
		.with(null, () => <Introduction />)
		.with({ status: 'IN_PROGRESS' }, state => <Playboard state={state} />)
		.with({ status: 'FINISHED' }, state => <Summary state={state} />)
		.exhaustive();
};

export default Game;
