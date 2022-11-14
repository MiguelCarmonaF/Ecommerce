import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const productRouter = router({
    addMail: publicProcedure.input(z.object({name: z.string(), email: z.string(), password: z.string(), isAdmin: z.boolean()})).mutation(async({ctx, input}) => {
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

    addProduct: publicProcedure.input(z.object({name: z.string(), slug: z.string(), category: z.string(), image: z.string(), price: z.number(),brand: z.string(),
    rating: z.number(), numReviews: z.number(),countInStock: z.number(), description: z.string()})).mutation(async({ctx, input}) => {
        const {name,slug,category,image,price,brand,rating,numReviews,countInStock,description} = input
        const product= await ctx.prisma.product.create({
            data:{
                name,
                slug,
                category,
                image,
                price,
                brand,
                rating,
                numReviews,
                countInStock,
                description,
            }
       })
     
       return product
    }),

    getAllProducts:  publicProcedure.query(async({ctx}) => {
        const products = await ctx.prisma.product.findMany()
        return products
    }),

    deletItem: publicProcedure.input(z.object({slug: z.string()})).mutation(async({ctx, input}) =>{
        const {slug} = input
        const item = await ctx.prisma.product.delete({
            where: {
                slug,
            },
        })
        return item
    
    }),

    editProduct: publicProcedure.input(z.object({name: z.string(), slug: z.string(), category: z.string(), image: z.string(), price: z.number(),brand: z.string(),
        rating: z.number(), numReviews: z.number(),countInStock: z.number(), description: z.string()})).mutation(async({ctx, input}) => {
            const {name,slug,category,image,price,brand,rating,numReviews,countInStock,description} = input
            const product= await ctx.prisma.product.update({
                where: {
                    slug,
                },
                data:{
                    name,
                    slug,
                    category,
                    image,
                    price,
                    brand,
                    rating,
                    numReviews,
                    countInStock,
                    description,
                }
           })
           return product
        }),

        findItem: publicProcedure.input(z.object({slug: z.string()})).query(async({ctx, input}) =>{
            const {slug} = input
            const item = await ctx.prisma.product.findUnique({
                where: {
                    slug,
                },
            })
            return item
        
        }),
})
