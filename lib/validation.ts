import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  service: z.string().min(2),
  date: z.string().min(8),
  time: z.string().min(4),
});
