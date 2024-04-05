import z from 'zod';
const signupInput = z.object({
  email: z.string().email(),
  pasword:z.string().min(6),
  name:z.string().optional()
})

export default signupInput;