import _stripe from "stripe";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

const stripe = new _stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const checkoutRouter = createTRPCRouter({
  checkoutSession: publicProcedure
    .input(
      z.object({
        products: z.array(
          z.object({
            id: z.string(),
            quantity: z.number().min(1, "Quantity must to be at least 1"),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const productsInCart = (
          await ctx.db.menuItem.findMany({
            where: {
              id: {
                in: input.products.map((product) => product.id),
              },
            },
          })
        ).map((p) => ({
          ...p,
          quantity:
            input.products.find((product) => product.id === p.id)?.quantity ??
            0,
        }));
      } catch (error) {}
    }),
});
