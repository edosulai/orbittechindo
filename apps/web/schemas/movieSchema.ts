import { z } from 'zod';

export const movieSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    typeFilter: z.string().optional(),
    yearRange: z.tuple([z.number().min(1900).max(2023), z.number().min(1900).max(2023)]),
});

export type MovieFormData = z.infer<typeof movieSchema>;
