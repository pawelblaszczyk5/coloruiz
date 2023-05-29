import NextLink from 'next/link';
import { type ComponentPropsWithoutRef } from 'react';
import { cn, tw } from '~/utils/classnames';

const sharedClasses = tw`max-w-full rounded-md border-2 border-yellow-500 px-6 py-2 text-center text-2xl font-medium outline-2 outline-offset-2 outline-fuchsia-500 focus-visible:outline`;

export const Button = ({ className, ...props }: ComponentPropsWithoutRef<'button'>) => (
	<button className={cn(sharedClasses, '', className)} {...props} />
);

export const Link = ({ className, ...props }: ComponentPropsWithoutRef<typeof NextLink>) => (
	<NextLink className={cn(sharedClasses, '', className)} {...props} />
);
