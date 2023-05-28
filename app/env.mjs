import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		GAME_STATE_COOKIE_SECRET: z.string().min(32),
	},
	runtimeEnv: {
		GAME_STATE_COOKIE_SECRET: process.env.GAME_STATE_COOKIE_SECRET,
	},
});
