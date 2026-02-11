import { z } from "zod";

export const RegisterUserRequestSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.email("Email is not valid"),
  password: z.string().min(8, "Password need to have 8 characters as minimum"),
});

export type RegisterUserRequestDTO = z.infer<typeof RegisterUserRequestSchema>;
