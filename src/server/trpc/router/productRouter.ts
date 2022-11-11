import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const productRouter = router({
    addProduct: publicProcedure.input(z.object({name: z.string(), email: z.string(), password: z.string(), isAdmin: z.boolean()})).mutation(async({ctx, input}) => {
        const {name,email,password,isAdmin} = input
        const product= await ctx.prisma.userSchema.create({
            data:{
                name,
                email,
                password,
                isAdmin,
            }
       })

       return product
    }),


    getAllProducts:  publicProcedure.query(async({ctx}) => {
        const product = await ctx.prisma.userSchema.findMany()
        return product
    }),

    

})
