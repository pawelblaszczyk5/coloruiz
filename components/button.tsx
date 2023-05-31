import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '~/utils/classnames';

export const Button = ({ className, ...props }: ComponentPropsWithoutRef<'button'>) => (
	<button
		className={cn(
			'max-w-full rounded-md bg-teal-700 px-6 py-3 text-center text-xl font-light text-stone-50 outline-2 outline-offset-2 outline-fuchsia-500 hover:bg-teal-600 focus-visible:outline',
			className,
		)}
		{...props}
	/>
);
