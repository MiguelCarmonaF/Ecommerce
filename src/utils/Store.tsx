import {createContext, useReducer } from "react";
import { Cookies } from "typescript-cookie";
import { stripVTControlCharacters } from "util";


export const Store= createContext<any>([]);

const initialState={
    cart: Cookies.get('cart') ? JSON.parse(Cookies.get('cart')):
    {cartItems:[]},
};

function reducer(state: any,action: any){
    switch (action.type){
        case "CART_ADD_ITEM":{
            const newItem=action.payLoad;
            const existItem = state.cart.cartItems.find(
                (item: any) => item.slug === newItem.slug
            );
            const cartItems = existItem ? state.cart.cartItems.map((item: any)=>
            item.name===existItem.name ? newItem: item)
            : [...state.cart.cartItems, newItem];
            Cookies.set("cart",JSON.stringify({...state.cart,cartItems}))
            return {...state, cart: {...state.cart,cartItems}}
                
        }

        case "CART_REMOVE_ITEM":{
            const cartItems = state.cart.cartItems.filter(
                (item: any) => item.slug !== action.payload.slug
            )
            Cookies.set("cart",JSON.stringify({...state.cart,cartItems}))
            return  {...state, cart: {...state.cart, cartItems}};
        }
        default: return state;
    }
}

export function StoreProvider({children}:{children:any}){
    const [state, dispatch] = useReducer(reducer as any, initialState);
    const value = {state, dispatch} as any;
    return <Store.Provider value={value}>{children}</Store.Provider>;
}