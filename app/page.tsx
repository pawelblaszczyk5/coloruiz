import NextLink from 'next/link';
import { checkIsActiveGame } from '~/utils/game-state';

export const runtime = 'edge';

const Home = async () => {
	const isActiveGame = await checkIsActiveGame();

	return (
		<>
			<h1 className="animate-text bg-gradient-to-r from-fuchsia-600 via-teal-400 to-orange-600 bg-clip-text text-6xl font-extrabold text-transparent md:text-7xl">
				coloruiz
			</h1>
			<p className="text-center md:text-lg">
				How good you&apos;re at recognizing colors? Let&apos;s check it out in with a geek twist! Rules are simple, you
				get a random color and you need to guess it RGB values.
			</p>
			<p className="text-center md:text-lg">It ain&apos;t easy, so lets check your skills and luck!</p>
			<NextLink
				href="/game"
				className={
					'rounded-md text-2xl font-light text-teal-700 underline decoration-1 underline-offset-8 outline-2 outline-offset-4 outline-fuchsia-500 hover:text-teal-600 focus-visible:outline dark:text-teal-400 hover:dark:text-teal-300'
				}
			>
				{isActiveGame ? 'Continue game' : 'Start playing'}
			</NextLink>
		</>
	);
};

export default Home;
