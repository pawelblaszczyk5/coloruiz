import NextLink from 'next/link';
import { checkIsGameInProgress } from '~/utils/game-state';

export const runtime = 'edge';

const Home = async () => {
	const isGameInProgress = await checkIsGameInProgress();

	return (
		<>
			<h1 className="animate-text bg-gradient-to-r from-fuchsia-600 via-teal-400 to-orange-600 bg-clip-text text-6xl font-extrabold text-transparent md:text-7xl">
				coloruiz
			</h1>
			<p className="text-center md:text-lg">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit soluta facere veniam, similique alias
				eos qui sed omnis ad commodi aperiam, vitae amet velit officiis ducimus numquam molestiae? Quas, quibusdam.
			</p>
			<NextLink
				href="/game"
				className={
					'rounded-md text-2xl font-light text-teal-700 underline decoration-1 underline-offset-8 outline-2 outline-offset-4 outline-fuchsia-500 hover:text-teal-600 focus-visible:outline dark:text-teal-400 hover:dark:text-teal-300'
				}
			>
				{isGameInProgress ? 'Continue game' : 'Start playing'}
			</NextLink>
		</>
	);
};

export default Home;
