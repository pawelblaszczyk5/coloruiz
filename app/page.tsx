import Link from 'next/link';
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
			<Link
				className="w-40 max-w-full rounded-md border-2 border-yellow-500 px-6 py-2 text-center text-2xl font-medium outline-2 outline-offset-2 outline-fuchsia-500 focus-visible:outline"
				href="/game"
			>
				{isGameInProgress ? 'Continue' : 'Play'}
			</Link>
		</>
	);
};

export default Home;
