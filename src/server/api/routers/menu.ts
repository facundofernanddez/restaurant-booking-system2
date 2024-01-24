import { s3 } from "@/lib/s3";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const menuRouter = createTRPCRouter({
  getMenuItems: publicProcedure.query(async ({ ctx }) => {
    const menuItems = await ctx.db.menuItem.findMany();

    const withUrls = await Promise.all(
      menuItems.map(async (menuItem) => {
        return {
          ...menuItem,
          url: await s3.getSignedUrlPromise("getObject", {
            Bucket: "restaurant-booking-system2",
            Key: menuItem.imageKey,
          }),
        };
      }),
    );

    return withUrls;
  }),

  checkMenuStatus: publicProcedure.mutation(async () => {
    await sleep(1000);

    return { success: true };
  }),
});
