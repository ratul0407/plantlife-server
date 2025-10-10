import z from "zod";

export const addToCartZodSchema = z.object({
  plantId: z.string(),
  userId: z.string(),
  name: z.string(),
  sku: z.string(),
  img: z.string(),
  quantity: z.number(),
  price: z.number(),
});
