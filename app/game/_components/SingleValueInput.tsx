'use client';

import {
	NumberInput,
	NumberInputControl,
	NumberInputDecrementTrigger,
	NumberInputField,
	NumberInputIncrementTrigger,
	NumberInputLabel,
} from '@ark-ui/react';
import { type ReactNode, type ComponentProps, useId } from 'react';
import { cn } from '~/lib/classnames';
import LucideChevronDown from '~icons/lucide/chevron-down.jsx';
import LucideChevronUp from '~icons/lucide/chevron-up.jsx';

const DIGIT_REGEX = /\d/u;

export const SingleValueInput = ({
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
			defaultValue={props.value}
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
				<NumberInputControl>
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
