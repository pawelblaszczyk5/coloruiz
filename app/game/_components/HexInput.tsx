'use client';

import { type ReactNode, type ComponentProps, useId } from 'react';
import { cn } from '~/lib/classnames';
import LucideHash from '~icons/lucide/hash.jsx';

export const HexInput = ({
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
