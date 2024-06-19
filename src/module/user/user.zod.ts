import { z } from "zod";

export const UserZod = z.object({
    name: z.string(),
    email: z.string().email("email is requird"),
    phone: z.string(),
    password: z.string().length(8, 'password must be within 8 chars.'),
    role: z.enum(['admin', 'user']),
    address: z.string(),
});

export const UserLoginZod = z.object({
    email: z.string().email("email is requird"),
    password: z.string().length(8, 'password must be within 8 chars.'),
});