import { type z } from 'zod';

const BRAND = Symbol('BRAND');

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
) => Promise<ActionResult<TOutput>> | Promise<InvalidResult<z.typeToFlattenedError<TInput>>>;

const ok = <const TResult>(result: TResult) =>
	({
		status: 'success',
		data: result,
		[BRAND]: 'VACT-RESULT',
	} as SuccessResult<TResult>);

const invalid = <const TResult>(result: TResult) =>
	({
		status: 'invalid',
		data: result,
		[BRAND]: 'VACT-RESULT',
	} as InvalidResult<TResult>);

const error = <const TResult>(result: TResult) =>
	({
		status: 'error',
		data: result,
		[BRAND]: 'VACT-RESULT',
	} as ErrorResult<TResult>);

const isResult = (input: unknown): input is Result<any, any, any> =>
	typeof input === 'object' && input !== null && BRAND in input && input[BRAND] === 'VACT-RESULT';

export const vact =
	<const TInput>(validator: z.ZodType<TInput>) =>
	<const TOutput>(actionImplementation: ActionImplementation<TInput, TOutput>) =>
		(async (input: TInput) => {
			const inputValidationResult = validator.safeParse(input);

			if (!inputValidationResult.success) return invalid(inputValidationResult.error.flatten());

			const actionResult = await actionImplementation(inputValidationResult.data);

			if (isResult(actionResult)) return actionResult;

			return ok(actionResult);
		}) as Action<TInput, TOutput>;

vact.ok = ok;
vact.error = error;
