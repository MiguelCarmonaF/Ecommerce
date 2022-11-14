import Link from "next/link";
import React, { useContext } from "react"
import Layout from "../comp/layout";
import { Store } from "../utils/Store"
import Image from "next/image";
import router from "next/router";
import { QueryTypeFilter } from "@tanstack/query-core/build/lib/utils";

export default function cartScreen (){
    const {state, dispatch} = useContext(Store)

    const {
        cart: { cartItems },
    } = state;

    const removeItemHandler = (item: any) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item})
    };

    const updateCartHandler = (item:any, qyt:any) => {
        const quantity = Number(qyt);
        dispatch({type: "CART_ADD_ITEM", payload:{...item, quantity}});
    };

    return (
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {
                cartItems.length=== 0 ?
                ( <div>
                    Cart is empty.<br></br><br></br> 
                    <Link legacyBehavior href="/">
                        <a className="rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500">Go shopping</a>
                    </Link>
                </div>) :
                (
                    <div className="grid md:grid-cols-4 md:gap-5">
                        <div className="overflow-x-auto md:col-span-3">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <th className="px-5 text-left">Item</th>
                                    <th className="p-5 text-left">Quantity</th>
                                    <th className="p-5 text-left">Price</th>
                                    <th className="p-5 text-left">Action</th>
                                </thead>
                                <tbody>
                                    {cartItems.map((item: any)=>(
                                        <tr key={item} className="border-b">
                                            <td>
                                                <Link legacyBehavior  href={`/product/${item.slug}`}>
                                                    <a className="flex items-center">
                                                       <Image  
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={50}
                                                            height={50}
                                                        ></Image>
                                                        &nbsp;
                                                        {item.name}
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className="p-5 text-left">
                                                <select 
                                                    value={item.quantity} 
                                                    onChange={(e) => updateCartHandler(item, e.target.value)}
                                                >
                                                {
                                                    [...Array(item.countInStock).keys()].map((x)=> (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                                </select>
                                            </td>
                                            
                                            <td className="p-5 text-left">${item.price}</td>
                                            <td className="p-5 text-left">
                                                <button onClick={()=>removeItemHandler(item)}>
                                                    <img className="h-10 w-10"  
                                                        src="../../images/Xcicrle.png"
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card p-5">
                            <ul>
                                <li>
                                    <div className="pb-3 text-2xl nline-block bg-gray-200 px-1 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                        Subtotal ({cartItems.reduce((a:any,c:any)=>a+c.quantity,0)})
                                        {' '}
                                        : $
                                        {cartItems.reduce((a: any, c:any) => a + c.quantity * c.price,0)}
                                    </div>
                                </li>
                                <li>
                                    <button onClick={() => router.push("login?redirect=/shipping")} className="rounded bg-amber-300 w-full py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500" type="button">
                                        Check Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </Layout>
    )
}

