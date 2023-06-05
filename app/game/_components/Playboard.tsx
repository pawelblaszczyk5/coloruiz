'use client';

import { useState } from 'react';
import { P, match } from 'ts-pattern';
import { type handleAnswerSubmission } from '~/app/game/_actions/game';
import { Button } from '~/app/game/_components/Button';
import { HexInput } from '~/app/game/_components/HexInput';
import { SingleValueInput } from '~/app/game/_components/SingleValueInput';
import { formatColor } from '~/lib/formatColor';
import { type GameState } from '~/lib/game';

const HEX_REGEX = /^[\da-f]*$/iu;

type ActionFunction = typeof handleAnswerSubmission;
type ActionPayload = Parameters<ActionFunction>[0];
type ActionErrors = Extract<Awaited<ReturnType<ActionFunction>>, { status: 'invalid' }>['data'];

export const Playboard = ({ state, onAnswerSubmission }: { state: GameState; onAnswerSubmission: ActionFunction }) => {
	const [r, g, b] = state.currentColor;
	const [formState, setFormState] = useState<ActionPayload>({
		r: 0,
		g: 0,
		b: 0,
	});

	const [errors, setErrors] = useState<ActionErrors | null>(null);

	const switchInputMode = () => {
		setFormState(previousState => {
			if ('hex' in previousState) return { r: 0, g: 0, b: 0 };

			return { hex: '' };
		});
	};

	return (
		<div className="flex flex-col items-center gap-10">
			<h1 className="text-center text-4xl">Level {state.level}</h1>
			<div className="flex gap-4">
				<div
					className="h-24 w-24 shrink-0 rounded-md shadow-md shadow-stone-950/30 dark:shadow-stone-200/20 sm:h-32 sm:w-32"
					style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }}
				/>
				<div>
					<h2 className="text-lg">Score: {state.score}</h2>
					{typeof state.guessAccuracy === 'number' && (
						<>
							<h3 className="text-lg">Last guess accuracy: {state.guessAccuracy}%</h3>
							<p>
								{match(state.guessAccuracy)
									.when(
										value => value > 95,
										() => 'Amazing 🚀',
									)
									.when(
										value => value > 90,
										() => 'You rock 🪨',
									)
									.when(
										value => value > 80,
										() => 'Not bad 🙂',
									)
									.when(
										value => value > 65,
										() => 'Could be better 😛',
									)
									.otherwise(() => 'You must train more 🙃')}
							</p>
						</>
					)}
					{Array.isArray(state.previousColor) && (
						<p>Previous answer: {formatColor(state.previousColor, 'hex' in formState ? 'hex' : 'separate')}</p>
					)}
				</div>
			</div>
			<form
				className="flex w-64 flex-col gap-6"
				action={async () => {
					const result = await onAnswerSubmission(formState);

					if (result.status !== 'invalid') {
						setErrors(null);
						return;
					}

					setErrors(result.data);
				}}
			>
				{match(formState)
					.with({ r: P._ }, separateFormState =>
						(['r', 'g', 'b'] as const).map(color => (
							<SingleValueInput
								key={color}
								value={String(separateFormState[color])}
								onChange={({ valueAsNumber }) =>
									setFormState(previousState => ({
										...previousState,
										[color]: valueAsNumber,
									}))
								}
								name={color}
								error={errors?.fieldErrors[color]?.at(0)}
							>
								{match(color)
									.with('r', () => 'Red')
									.with('g', () => 'Green')
									.with('b', () => 'Blue')
									.exhaustive()}{' '}
								value
							</SingleValueInput>
						)),
					)
					.with({ hex: P._ }, hexFormState => (
						<HexInput
							error={errors?.fieldErrors.hex?.at(0)}
							value={hexFormState.hex}
							onChange={e => {
								const newValue = e.currentTarget.value;

								setFormState(previousState => {
									if (HEX_REGEX.test(newValue)) return { hex: newValue };

									return previousState;
								});
							}}
						>
							Hex value
						</HexInput>
					))
					.exhaustive()}
				<Button>Submit answer</Button>
				<Button type="button" onClick={switchInputMode} variant="outlined">
					Switch inputs
				</Button>
			</form>
		</div>
	);
};
