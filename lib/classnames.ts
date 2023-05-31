import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: Array<ClassValue>) => clsx(inputs);
