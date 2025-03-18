import {createContext, useReducer} from "react";
import {ContactInfo} from "./Data";

export const Store = createContext();

const initialState = {
    UserInfo: localStorage.getItem("UserInfo")
        ? JSON.parse(localStorage.getItem("UserInfo"))
        : null,

    Admin: localStorage.getItem("Admin")
        ? JSON.parse(localStorage.getItem("Admin"))
        : null,

    ContactInfo: localStorage.getItem("ContactInfo")
        ? JSON.parse(localStorage.getItem("ContactInfo"))
        : ContactInfo,

    Cart: localStorage.getItem("CartItem")
        ? JSON.parse(localStorage.getItem("CartItem"))
        : [],
};

function reducer(state, action) {
    switch (action.type) {
        case "ClearUserInfo":
            return {...state, UserInfo: null};
        case "Admin":
            return {...state, Admin: action.payload};
        case "UserLoggedIn":
            return {...state, UserInfo: action.payload};

        case "add-to-cart": {
            const item = action.payload;
            const existItem = state.Cart.find((x) => x.id === item.id);
            const newCart = existItem
                ? state.Cart.map((x) =>
                    x.id === existItem.id
                        ? {
                            ...x,
                            quantity: x.quantity + 1, // Increase quantity
                            total: parseFloat(x.total) + parseFloat(item.price),
                        }
                        : x
                )
                : [...state.Cart, {...item, quantity: 1, total: item.price}];

            localStorage.setItem("CartItem", JSON.stringify(newCart));
            return {...state, Cart: newCart};
        }

        case "update-cart":
            // Update the cart directly with the new quantity values
            return {...state, Cart: action.payload};

        case "remove-from-cart":
            const updatedCart = state.Cart.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("CartItem", JSON.stringify(updatedCart));
            return {...state, Cart: updatedCart};

        case "clear-cart":
            localStorage.removeItem("CartItem");  // Clear cart from localStorage
            return {...state, Cart: []};

        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}> {props.children} </Store.Provider>;
}
