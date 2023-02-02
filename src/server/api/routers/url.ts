import { z } from "zod";
import { nanoid } from "nanoid";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const urlRouter = createTRPCRouter({
  shortenUrl: publicProcedure
    .input(z.object({ longUrl: z.string().trim().url() }))
    .mutation(async ({ ctx: { prisma }, input: { longUrl } }) => {
      const shortUrl = nanoid(5);
      const urlData = await prisma.url.create({
        data: {
          longUrl,
          shortUrl,
        },
      });
      return {
        shortUrl: urlData.shortUrl,
      };
    }),
  fetchLongUrl: publicProcedure
    .input(z.object({ shortUrl: z.string().length(5) }))
    .query(async ({ ctx: { prisma }, input: { shortUrl } }) => {
      const data = await prisma.url.findUnique({
        where: {
          shortUrl,
        },
      });
      return data?.longUrl;
    }),

  getAllUrl: publicProcedure.query(async ({ ctx: { prisma } }) => {
    const data = await prisma.url.findMany({});
    return data;
  }),
});
