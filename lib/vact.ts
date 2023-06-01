import { type z } from 'zod';

const BRAND = Symbol('BRAND');

type Brand<TInput, TBrand extends string> = TInput & { [BRAND]: TBrand };

type Result<TSuccessResult, TInvalidResult, TErrorResult> =
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
	  };

type SuccessResult<TResult> = Extract<Result<TResult, never, never>, { status: 'success' }>;

type InvalidResult<TResult> = Extract<Result<never, TResult, never>, { status: 'invalid' }>;

type ErrorResult<TResult> = Extract<Result<never, never, TResult>, { status: 'error' }>;

type ActionImplementation<TInput, TOutput> = (input: TInput) => Promise<TOutput>;

type ActionResult<TOutput> = TOutput extends Result<any, any, any> ? TOutput : SuccessResult<TOutput>;

type Action<TInput, TOutput> = (
	input: TInput,
) => Promise<ActionResult<TOutput>> | Promise<InvalidResult<z.typeToFlattenedError<TInput>>>;

const ok = <const TResult>(result: TResult): Brand<SuccessResult<TResult>, 'VACT-RESULT'> => ({
	status: 'success',
	data: result,
	[BRAND]: 'VACT-RESULT',
});

const invalid = <const TResult>(result: TResult): Brand<InvalidResult<TResult>, 'VACT-RESULT'> => ({
	status: 'invalid',
	data: result,
	[BRAND]: 'VACT-RESULT',
});

const error = <const TResult>(result: TResult): Brand<ErrorResult<TResult>, 'VACT-RESULT'> => ({
	status: 'error',
	data: result,
	[BRAND]: 'VACT-RESULT',
});

const unbrandResult = <TResult extends Result<any, any, any>>(result: Brand<TResult, 'VACT-RESULT'>): TResult => {
	const { [BRAND]: brand, ...unbrandedResult } = result;

	return unbrandedResult as unknown as TResult;
};

const isResult = (input: unknown): input is Brand<Result<any, any, any>, 'VACT-RESULT'> =>
	typeof input === 'object' && input !== null && BRAND in input && input[BRAND] === 'VACT-RESULT';

export const vact =
	<const TInput>(validator: z.ZodType<TInput>) =>
	<const TOutput>(actionImplementation: ActionImplementation<TInput, TOutput>) =>
		(async (input: TInput) => {
			const inputValidationResult = validator.safeParse(input);

			if (!inputValidationResult.success) return { status: 'invalid', data: inputValidationResult.error.flatten() };

			const actionResult = await actionImplementation(inputValidationResult.data);

			return isResult(actionResult) ? unbrandResult(actionResult) : { status: 'success', data: actionResult };
		}) as Action<TInput, TOutput>;

vact.ok = ok;
vact.error = error;
vact.invalid = invalid;
