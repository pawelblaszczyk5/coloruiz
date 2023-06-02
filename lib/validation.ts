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

