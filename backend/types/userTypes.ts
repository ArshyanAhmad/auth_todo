import { z } from 'zod';

export const userSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6)
})