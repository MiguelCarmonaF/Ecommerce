import React, { useContext } from "react"
import Layout from "../../comp/layout"
import { useRouter } from "next/router";
import data from "../../utils/data";
import Link from "next/link";
import Image from "next/image";
import { Store } from "../../utils/Store";
import { router } from "../../server/trpc/trpc";


export default function productScreen() {
    const { state, dispatch } = useContext(Store) as any;
    const router = useRouter();
 
    const {query} = useRouter();
    const {slug} = query;
    const product = data.products.find(x => x.slug === slug)

    
    if(!product){
        return <div>
                    <p>Product Not Found</p>
                    <br></br>
                    <Link legacyBehavior href="/">
                        <button className="bg-red-500">
                        Back to products
                        </button>
                    </Link>
                </div>
    }

    const addToCartHandler=() => {
        const existItem = state.cart.cartItems.find((x: any) => x.slug === product.slug);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        if (product.countInStock < quantity){
            alert("Sorry, out of stock");
           return;
        }
        dispatch ({type: "CART_ADD_ITEM", payload: {...product, quantity}})
        router.push("/cart");
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

