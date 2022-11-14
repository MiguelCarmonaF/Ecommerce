import React, { useContext, useState } from "react"
import Layout from "../../comp/layout"
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/Store";
import { trpc } from "../../utils/trpc";
import { product } from "@prisma/client";




export default function productScreen() {
    const { state, dispatch } = useContext(Store) as any;
    
    const [items, setItems] = useState<product[]>([])
      
    
    const product = trpc.product.findItem.useQuery({
        (product: { slug: string; }){
          setItems((prev) => prev.filter((item) => item.slug ==product.slug))
        }
      })

    const addToCartHandler=() => {
        const existItem = state.cart.cartItems.find((x: any) => x.slug === product.slug);
        const quantity: any = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity){
            alert("Sorry, out of stock");
           return;
        }
        dispatch ({type: "CART_ADD_ITEM", payload: {...product, quantity}})
        
    }

    return (
        
        <Layout title={product.name}>
            <div className="py-2">
                <Link href="/">
                    <button className="bg-red-500">
                        Back to products
                    </button>
                </Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">
                <div className="md:col-span-2">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={640}
                        height={640}
                        layout="responsive"
                    ></Image>
                </div>
                <div>
                    <h1 className="text-lg font-bold">{product.name}</h1>
                    <li>Category: {product.category}</li>
                    <li>Brand: {product.brand}</li>
                    <li>{product.rating} of {product.numReviews} reviews</li>
                    <li>Description: {product.description}</li>
                </div>
                <div>
                    <div className="nline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        <div className="mb-2 flex justify-between">
                            <div>Price: ${product.price}</div>
                        </div>
                        <div className="mb-2 flex justify-between">
                            <div>{product.countInStock > 0 ? `In stock ${product.countInStock}` : "Unvailable"}</div>
                        </div>
                        <button className="rounded bg-amber-300 w-full py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500" type="button" onClick={addToCartHandler}>Add to cart</button>
                    </div>
                    
                </div>
            </div>
        </Layout>
    )
}

