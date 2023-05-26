import { clsx, type ClassValue } from 'clsx';

export const tw = String.raw;

export const cn = (...inputs: Array<ClassValue>) => clsx(inputs);
