import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { Store } from "../utils/Store";


export default function Layout({title, children}:{children:any, title:any}) {
    
    const {state, dispatch} = useContext(Store) as any;
    const {cart} = state;
    return (
        <>

            <Head>
                <title>{title ? title + ' - Tienda' : "Tienda"}</title>
                <meta name="description" content="Ecommerce Website" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body className="flex min-h-screen flex-col justify-between">
                <header>
                    <nav className="flex h-12 items-center justify-between shadow-md bg-gray-300">
                        <Link legacyBehavior href="/">
                        <a className="text-lg font-bold">Tienda</a>
                        </Link>
                        <div>
                        <Link legacyBehavior href="/cart">
                            <a className="p-2">
                                Cart {cart.cartItems.length>0 && (
                                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                    {cart.cartItems.reduce((a:any,c:any) =>a + c.quantity,5)}
                                </span>)}
                            </a>
                        </Link>
                        <Link href="/login"><a className="p-2"></a>Login</Link>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">
                    {children}
                </main>
                <footer className="flex h10 justify-center items-center shadow-inner">
                    <p>Copyright © 2022 Tiendita</p>
                </footer>
            </body>
        
        </>
    )
}