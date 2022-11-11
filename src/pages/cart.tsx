import Link from "next/link";
import React, { useContext } from "react"
import Layout from "../comp/layout";
import { Store } from "../utils/Store"
import Image from "next/image";
import router from "next/router";

export default function cartScreen (){
    const {state, dispatch} = useContext(Store)
    const {
        cart: { cartItems },
    } = state;
    const removeItemHandler = (item: any) => {
        dispatch({ type: "CART_REMOVE_ITEM", payload: item})
    }
    const updateCartHandler = (item:any, qyt:any) => {
        const quantity = Number(qyt);
        dispatch({type: "CART_ADD_ITEM", payload:{...item, quantity}});
    }
    return (
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl">Shopping Cart</h1>
            {
                cartItems.lengt=== 0 ?
                ( <div>
                    Cart is empty. <Link href="/">Go shopping</Link>
                </div>) :
                (
                    <div className="grid md:grid.cols-4 md:gap-5">
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
                                        <tr key={item} className="border-nb">
                                            <td>
                                                <Link href={`/product/${item.slug}`}>
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
                                            <td className="p-5 text-right">
                                                <select value={item.quantity} onChange={(e) => updateCartHandler(item,e.target.value)}>
                                                {
                                                    [...Array(item.countInStock).keys()].map(x=> (
                                                        <option key={x+1} value={x +1 }></option>
                                                    ))
                                                }
                                                </select>
                                            </td>
                                            <td className="p-5 text-right">${item.price}</td>
                                            <td className="p-5 text-right">{item.quantity}</td>
                                            <button onClick={()=>removeItemHandler(item)}>
                                                <img className="h-5 w-5"  
                                                    src="../images/Xricrle.png"
                                                />
                                            </button>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="nline-block bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <ul>
                                <li>
                                    <div className="pb-3 text-xl">
                                        Subtotal ({cartItems.reduce((a:any,c:any)=>a+c.quantity,0)})
                                        {' '}
                                        : $
                                        {cartItems.reduce((a: any, c:any) => a + c.quantity * c.price,0)}
                                    </div>
                                </li>
                                <li>
                                    <button onClick={() => router.push("/shipping")} className="rounded bg-amber-300 w-full py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500" type="button">
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

