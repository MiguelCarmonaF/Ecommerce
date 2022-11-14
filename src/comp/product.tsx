import React, { useState } from "react";
import Link from "next/link";


/* eslint-disable @next/next/no-img-element */

export default function ProductItem({product}:{product:any}) {
    return (
        <>
            
            <div className="mb-5 block rounded-lg border border-gray-200 shadow-md">
                <Link legacyBehavior href={`/product/${product.slug}`}>
                    <a>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="rounded shadow"
                        />
                    </a>
                </Link>
                <div className="flex flex-col item-center text-center justify-center p-5">
                    <Link legacyBehavior href={`/product/${product.slug}`}>
                        <a>
                            <h2 className="text-xl font-bold">
                                {product.name}
                            </h2>
                        </a>
                    </Link>
                    <p className="mb-2 text-red-500">{product.brand}</p>
                    <p>${product.price}</p>
                    <Link legacyBehavior href={`/product/${product.slug}`}>
                        <a className="rounded bg-amber-300 py-2 px-4 shadow outline-none hover:bg-amber-400 active:bg-amber-500">
                            See details
                        </a>
                    </Link>
                    
                </div>
            </div>
            
        
        </>
    )
}