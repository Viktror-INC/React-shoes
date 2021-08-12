import React from 'react';
import AppContext from "../context";

const Info = ({image, title, description, btn_text}) => {
    const {setCartOpened} = React.useContext(AppContext);
    return (
        <div className="cart_empty">
            <img className="empty_img" src={image} alt=""/>
            <span>{title}</span>
            <p>{description}</p>
            <button className="orders_button" onClick={() => setCartOpened()}>
                <img className="arrow" alt="arrow" src="/img/order-arrow.svg"/>
                <span>{btn_text}</span>
            </button>
        </div>
    );
};

export default Info;