import { type z } from 'zod';

declare const BRAND: unique symbol;

type Brand<TInput, TBrand extends string> = TInput & { [BRAND]: TBrand };

export type Result<TSuccessResult, TInvalidResult, TErrorResult> = Brand<
	| {
			status: 'success';
			data: TSuccessResult;
	  }
	| {
			status: 'invalid';
			data: TInvalidResult;
	  }
	| {
			status: 'error';
			data: TErrorResult;
	  },
	'VACT-RESULT'
>;

export type SuccessResult<TResult> = Extract<Result<TResult, never, never>, { status: 'success' }>;

export type InvalidResult<TResult> = Extract<Result<never, TResult, never>, { status: 'invalid' }>;

export type ErrorResult<TResult> = Extract<Result<never, never, TResult>, { status: 'error' }>;

export type ActionImplementation<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

type ActionResult<TOutput> = TOutput extends Result<any, any, any> ? TOutput : SuccessResult<TOutput>;

export type Action<TInput, TOutput> = (
	input: TInput,
) => Brand<Promise<ActionResult<TOutput>> | Promise<InvalidResult<z.typeToFlattenedError<TInput>>>, 'VACT-ACTION'>;

const ok = <const TResult>(result: TResult) =>
	({
		status: 'success',
		data: result,
	} as SuccessResult<TResult>);

const invalid = <const TResult>(result: TResult) =>
	({
		status: 'invalid',
		data: result,
	} as InvalidResult<TResult>);

const error = <const TResult>(result: TResult) =>
	({
		status: 'error',
		data: result,
	} as ErrorResult<TResult>);

export const vact = <TInput>(validator: z.ZodType<TInput>) => {
	return <const TOutput>(action: ActionImplementation<TInput, TOutput>) => {
		return (async (input: TInput) => {
			const result = validator.safeParse(input);

			if (!result.success) return invalid(result.error.flatten());

			return action(result.data);
		}) as Action<TInput, TOutput>;
	};
};

vact.ok = ok;
vact.error = error;
