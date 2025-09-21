import z from "zod";

export const addToCartZodSchema = z.object({
  name: z.string(),
  plant: z.string(),
  sku: z.string(),
  img: z.string(),
  quantity: z.number(),
  price: z.number(),
  stock: z.number(),
});
