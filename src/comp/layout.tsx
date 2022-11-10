import React from "react";
import Head from "next/head";
import Link from "next/link";


export default function Layout({children}:{children:any}): JSX.Element {
    return (
        <>

            <Head>
                <title>Tienda</title>
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
                        <Link href="/cart"><a className="p-2"></a>Cart</Link>
                        <Link href="/login"><a className="p-2"></a>Login</Link>
                        </div>
                    </nav>
                </header>
                <main className="container m-auto mt-4 px-4">
                    {children}
                </main>
                <footer className="flex h10 justify-center items-center shadow-inner">
                    <p>Copyright © 2022 Tiendita </p>
                </footer>
            </body>
        
        </>
    )
}