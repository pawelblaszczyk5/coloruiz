import { z } from 'zod';

export const HEX_REGEX = /^[\da-f]*$/iu;

export const colorValueSchema = z.number().min(0).max(255).int();
