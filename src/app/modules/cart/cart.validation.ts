import z from "zod";

export const addToCartZodSchema = z.object({
  plantId: z.string(),
  sku: z.string(),
  quantity: z.number(),
});
