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
import LucideHash from '~icons/lucide/hash.jsx';

const DIGIT_REGEX = /\d/u;
const HEX_REGEX = /[\da-f]*/iu;

const SingleValueInput = ({
	children,
	error,
	...props
}: { children: ReactNode; error?: string | undefined } & Pick<
	ComponentProps<typeof NumberInput>,
	'value' | 'onChange' | 'name'
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

const HexInput = ({
	error,
	children,
	...props
}: { error?: string | undefined; children: ReactNode } & Pick<
	ComponentProps<'input'>,
	'value' | 'onChange' | 'name'
>) => {
	const hasError = typeof error === 'string';
	const id = useId();

	const inputId = `${id}-input`;
	const errorId = `${id}-error`;

	return (
		<div className="flex flex-col gap-2">
			<label className="text-lg" htmlFor={inputId}>
				{children}
			</label>
			<div className="relative">
				<div className="pointer-events-none absolute left-0 top-0 grid aspect-square h-11 w-11 place-items-center text-lg text-stone-500">
					<LucideHash />
				</div>
				<input
					className={cn(
						'w-full rounded-md border-2 bg-stone-50 py-2 pl-10 pr-4 text-base outline-2 outline-offset-2 outline-fuchsia-500 focus-visible:outline dark:bg-stone-900',
						hasError ? 'border-rose-700' : 'border-teal-700',
					)}
					id={inputId}
					aria-describedby={hasError ? errorId : undefined}
					aria-errormessage={hasError ? errorId : undefined}
					autoComplete="off"
					spellCheck={false}
					maxLength={6}
					type="text"
					{...props}
				/>
			</div>
			{hasError && <p className="text-rose-700 dark:text-rose-400">{error}</p>}
		</div>
	);
};

export const Playboard = ({ state, proceedGame }: { state: GameState; proceedGame: typeof proceedGameAction }) => {
	const [r, g, b] = state.currentColor;
	const [inputMode, setInputMode] = useState<'hex' | 'separate'>('separate');

	return (
		<div className="flex flex-col items-center gap-10">
			<h1 className="text-4xl">Level {state.level}</h1>
			<div className="flex gap-4">
				<div
					className="h-24 w-24 shrink-0 rounded-md shadow-md shadow-stone-950/30 dark:shadow-stone-700/80 sm:h-32 sm:w-32"
					style={{ backgroundColor: `rgba(${r}, ${g}, ${b})` }}
				/>
				<div>
					<h2 className="text-lg">Score: {state.score}</h2>
					{typeof state.guessAccuracy === 'number' && <h3>Last guess accuracy: {state.guessAccuracy}%</h3>}
					{typeof state.guessAccuracy === 'number' && (
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
					)}
				</div>
			</div>
			<form className="flex w-64 flex-col gap-6" action={proceedGame}>
				{match(inputMode)
					.with('separate', () => (
						<>
							<SingleValueInput name="color-r">Red value</SingleValueInput>
							<SingleValueInput name="color-g">Green value</SingleValueInput>
							<SingleValueInput name="color-b">Blue value</SingleValueInput>
						</>
					))
					.with('hex', () => <HexInput>Hex value</HexInput>)
					.exhaustive()}
				<Button
					type="button"
					onClick={() => setInputMode(currentValue => (currentValue === 'hex' ? 'separate' : 'hex'))}
					variant="outlined"
				>
					Switch inputs
				</Button>
				<Button>Submit answer</Button>
			</form>
		</div>
	);
};
