import { z } from 'zod';

export const HEX_REGEX = /^[\da-f]*$/iu;

export const colorValueSchema = z
	.number({
		invalid_type_error: 'Value is required',
		required_error: 'Value is required',
	})
	.int('Value must be an integer')
	.min(0, "Value can't be below 0")
	.max(255, "Value can't be above 255");

export const gameAnswerSchema = z.union([
	z.object({
		hex: z.union([
			z
				.string({
					invalid_type_error: 'Value is required',
					required_error: 'Value is required',
				})
				.length(3, 'Value must be a valid hex color')
				.regex(HEX_REGEX, 'Value must be a valid hex color'),
			z
				.string({
					invalid_type_error: 'Value is required',
					required_error: 'Value is required',
				})
				.length(6, 'Value must be a valid hex color')
				.regex(HEX_REGEX, 'Value must be a valid hex color'),
		]),
	}),
	z.object({
		r: colorValueSchema,
		g: colorValueSchema,
		b: colorValueSchema,
	}),
]);
