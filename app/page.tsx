import { Suspense } from 'react';
import {} from 'react/experimental';

const AsyncComponentTest = async () => {
	await new Promise(resolve => {
		setTimeout(resolve, 3_000);
	});

	return <div>Hello</div>;
};

const Home = () => {
	return (
		<>
			<h1>Hello world</h1>
			<Suspense fallback={<h2>Loading...</h2>}>
				<AsyncComponentTest />
			</Suspense>
		</>
	);
};

export default Home;
