import { z } from 'zod';

export const UserSchema = z.object({
	name: z.string().trim().min(2, { message: 'Name must be 2 or more characters long' }),
	email: z.string().email().trim().toLowerCase(),
});

export type User = z.infer<typeof UserSchema>;
