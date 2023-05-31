import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '~/utils/classnames';

export const Button = ({
	className,
	variant = 'primary',
	...props
}: ComponentPropsWithoutRef<'button'> & { variant?: 'primary' | 'outlined' | undefined }) => (
	<button
		className={cn(
			'max-w-full rounded-md border-2 border-teal-700 px-6 py-3 text-center text-xl font-light outline-2 outline-offset-2 outline-fuchsia-500 focus-visible:outline',
			{
				'bg-teal-700 text-stone-50 hover:border-teal-600 hover:bg-teal-600': variant === 'primary',
				'bg-stone-50 hover:bg-stone-100 dark:bg-stone-900 hover:dark:bg-stone-950': variant === 'outlined',
			},
			className,
		)}
		{...props}
	/>
);
