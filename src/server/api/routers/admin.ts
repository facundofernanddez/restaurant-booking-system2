// import { createTRPCRouter, publicProcedure } from "../trpc";
// import {z} from "zod"

// export const adminRouter = createTRPCRouter({
//   login: publicProcedure.input(z.object({ email: z.string().email(), password: z.string() })).
//   mutation(async ({ctx, input}) =>{
//     const {res} = ctx
//     const { email, password } = input
//     if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//       // user is authenticated
//       const token = await new SignJWT({})
//         .setProtectedHeader({ alg: 'HS256' })
//         .setJti(nanoid())
//         .setIssuedAt()
//         .setExpirationTime('1h')
//         .sign(new TextEncoder().encode(getJwtSecretKey()))

//         res.setHeader
//   })
// });
