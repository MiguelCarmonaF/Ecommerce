import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const productRouter = router({
    addProduct: publicProcedure.input(z.object({name: z.string(), slug: z.string(), inventory: z.number(), price: z.number()})).mutation(async({ctx, input}) => {
        const {name,slug,inventory,price} = input
        const item = await ctx.prisma.product.create({
            data:{
                name,
                slug,
                inventory,
                price,
            }
       })

       return item
    }),

    getAllProducts:  publicProcedure.query(async({ctx}) => {
        const item = await ctx.prisma.product.findMany()
        return item
    }),

    deletItem: publicProcedure.input(z.object({id: z.string()})).mutation(async({ctx, input}) => {
        const {id} = input
        const item = await ctx.prisma.product.delete({
            where: {
                id,
            }
        })

        return item
    }),

    editProduct: publicProcedure.input(z.object({id: z.string(), name: z.string(), slug: z.string(), inventory: z.number(), price: z.number()})).mutation(async({ctx, input}) => {
        const {name,slug,inventory,price,id} = input
        const item = await ctx.prisma.product.update({
            where: {
                id,
            },
            data:{
                name,
                slug,
                inventory,
                price,
            }
       })
       return item
    }),

})
