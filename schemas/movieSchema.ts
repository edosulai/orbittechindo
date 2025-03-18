import { z } from 'zod';

export const movieSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
});

export type MovieFormData = z.infer<typeof movieSchema>;
