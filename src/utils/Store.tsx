import {createContext, useReducer } from "react";


export const Store= createContext<any>([]);

const initialState={
    cart: {cartItems:[]},
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
        return {...state, cart: {...state.cart,cartItems}}
                
        }

        case "CART_REMOVE_ITEM":{
            const cartItems = state.cart.cartItems.filter(
                (item: any) => item.slug !== action.payload.slug
            )
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