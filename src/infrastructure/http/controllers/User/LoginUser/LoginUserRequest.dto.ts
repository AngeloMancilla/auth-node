import z from "zod";

export const LoginUserRequesSchema = z.object({
  email: z.email("Email is not valid"),
  password: z.string().min(8, "Password need to have 8 characters as minimum"),
});

export type LoginUserRequestDTO = z.infer<typeof LoginUserRequesSchema>;
