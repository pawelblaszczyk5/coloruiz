import 'react';

declare module 'react' {
	function unstable_postpone(): never;
	function unstable_postpone(reason?: string | undefined): never;
}
