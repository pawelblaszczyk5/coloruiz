import { type Color } from '~/lib/game';

export type ColorMode = 'hex' | 'separate';

export const formatColor = (color: Color, mode: ColorMode) => {
	if (mode === 'separate') return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

	return `#${color.reduce((data, value) => data + value.toString(16).padStart(2, '0'), '').toLocaleUpperCase()}`;
};
