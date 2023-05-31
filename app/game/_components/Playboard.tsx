'use client';

import {
	NumberInput,
	NumberInputControl,
	NumberInputDecrementTrigger,
	NumberInputField,
	NumberInputIncrementTrigger,
	NumberInputLabel,
} from '@ark-ui/react';
import { useState, type ReactNode, type ComponentProps, useId } from 'react';
import { match } from 'ts-pattern';
import { type proceedGame as proceedGameAction } from '~/app/game/_actions/game';
import { Button } from '~/components/button';
import { cn } from '~/utils/classnames';
import { type GameState } from '~/utils/game-state';
import LucideChevronDown from '~icons/lucide/chevron-down.jsx';
import LucideChevronUp from '~icons/lucide/chevron-up.jsx';

const DIGIT_REGEX = /\d/u;

const SingleValueInput = ({
	children,
	error,
	...props
}: { children: ReactNode; error?: string | undefined } & Pick<
	ComponentProps<typeof NumberInput>,
	'value' | 'onBlur' | 'onChange' | 'name'
>) => {
	const hasError = typeof error === 'string';
	const errorId = useId();

	return (
		<NumberInput
			translations={{
				decrementLabel: 'Decrement value',
				incrementLabel: 'Increment value',
			}}
			className="flex flex-col gap-2"
			allowMouseWheel
			min={0}
			max={255}
			maxFractionDigits={0}
			step={1}
			inputMode="numeric"
			validateCharacter={char => DIGIT_REGEX.test(char)}
			{...props}
		>
			<NumberInputLabel className="text-lg">{children}</NumberInputLabel>
			<div className="relative">
				<NumberInputField
					aria-describedby={hasError ? errorId : undefined}
					aria-errormessage={hasError ? errorId : undefined}
					className={cn(
						'w-full rounded-md border-2 bg-stone-50 px-14 py-2 text-base outline-2 outline-offset-2 outline-fuchsia-500 focus-visible:outline dark:bg-stone-900',
						hasError ? 'border-rose-700' : 'border-teal-700',
					)}
				/>
				<NumberInputControl className="contents">
					<NumberInputDecrementTrigger
						className={cn(
							'absolute left-0 top-0 grid aspect-square h-full place-items-center border-r-2  text-xl',
							hasError ? 'border-rose-700' : 'border-teal-700',
						)}
					>
						<LucideChevronDown />
					</NumberInputDecrementTrigger>
					<NumberInputIncrementTrigger
						className={cn(
							'absolute right-0 top-0 grid aspect-square h-full place-items-center border-l-2  text-xl',
							hasError ? 'border-rose-700' : 'border-teal-700',
						)}
					>
						<LucideChevronUp />
					</NumberInputIncrementTrigger>
				</NumberInputControl>
			</div>
			{hasError && <p className="text-rose-700 dark:text-rose-400">{error}</p>}
		</NumberInput>
	);
};

export const Playboard = ({ state, proceedGame }: { state: GameState; proceedGame: typeof proceedGameAction }) => {
	const [r, g, b] = state.currentColor;

	const [inputMode, setInputMode] = useState<'hex' | 'separate'>('separate');

	return (
		<div className="flex flex-col items-center gap-10">
			<h1 className="text-4xl">Current color</h1>
			<div
				className="h-32 w-32 rounded-md shadow-md shadow-stone-950/30 dark:shadow-stone-700/80"
				style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }}
			/>
			<h1>score: {state.score}</h1>
			{typeof state.guessAccuracy === 'number' && <p>Last guess accuracy: {state.guessAccuracy}</p>}
			<form className="flex w-64 flex-col gap-6" action={proceedGame}>
				{match(inputMode)
					.with('separate', () => (
						<>
							<SingleValueInput name="color-r">Red</SingleValueInput>
							<SingleValueInput name="color-g">Green</SingleValueInput>
							<SingleValueInput name="color-b">Blue</SingleValueInput>
						</>
					))
					.with('hex', () => <></>)
					.exhaustive()}
				<Button>Submit answer</Button>
			</form>
		</div>
	);
};
