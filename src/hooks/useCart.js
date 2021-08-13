import React from "react";
import AppContext from "../context";

export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const totalPrice = cartItems.reduce((prevValue, currentValue) => Number(currentValue.price) + Number(prevValue) , 0);

    return {cartItems, setCartItems, totalPrice}
}
