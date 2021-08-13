import React from 'react';
import AppContext from "../context";
import Info from "./Info";
import axios from "axios";

function DrawerCart({onClickCart, onRemove}) {
    const {addItemInCart, removeItemInCart, cartItems, setCartItems} = React.useContext(AppContext);
    const [isComplited, setIsComplited] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const totalPrice = cartItems.reduce((prevValue, currentValue) => Number(currentValue.price) + Number(prevValue) , 0);

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms));

    const onClickOrder = async() => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://61092eb1d71b6700176397de.mockapi.io/orders',{items : cartItems});
            setOrderId(data.id);
            setCartItems([]);
            for (let i=0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://61092eb1d71b6700176397de.mockapi.io/cart/` + item.id);
                await delay(1000);
            }
            setIsComplited(true);
        } catch (error) {
            alert('Order was not created')
        }
        console.log(isLoading);
        setIsLoading(false);
    }

    return (
        <div className="drawer-overlay">
            <div className="drawer">
                <h1>Корзина <button onClick={onClickCart} className="cart-btn"><img src="/img/remove-cart.svg" alt=""/>
                </button></h1>
                {cartItems.length > 0 ? (
                    <>
                        <ul>
                            {cartItems.map((obj, index) => {
                                return (
                                    <li key={index}>
                                        <img src={obj.image} alt=""/>
                                        <div className="drawer-item-wrap">
                                            <span className="drawer-name">{obj.name}</span>
                                            <div className="count-wrap">
                                                <img onClick={() => removeItemInCart(obj)}
                                                     className={"btn-cart btn-cart_minus"}
                                                     src="/img/minus.png" alt=""/>
                                                <span className="drawer-count">{obj.count} шт</span>
                                                <img onClick={() => addItemInCart(obj)} width={30} height={30}
                                                     className="btn-cart btn-cart_plus" src="/img/add-cart.svg" alt=""/>
                                            </div>
                                            <span className="drawer-price">Цена: {obj.price} руб</span>
                                        </div>
                                        <button onClick={() => onRemove(obj.id)} className="cart-btn"><img
                                            src="/img/remove-cart.svg" alt=""/></button>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="order-price-wrap">
                            <div className="total-price-wrap">
                                <span className="total-title-price">Итого:</span>
                                <span className="total-line"></span>
                                <span className="total-price">{totalPrice} руб.</span>
                            </div>
                            <div className="other-price-wrap">
                                <span className="total-title-price">Налог 5%:</span>
                                <span className="total-line"></span>
                                <span className="total-price">{Math.round(totalPrice / 100 * 5)} руб.</span>
                            </div>
                            <button onClick={onClickOrder}>
                                <span>Оформить заказ</span>
                                <img alt='order' src='/img/order-arrow.svg'/>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        { isComplited ?
                            (<Info btn_text="К товарам" title="Заказ сделан" description={`Ваш заказ №${orderId} обрабатывается`} image="/img/cart/ordered_cart.jpg"/>)
                            :
                            (<Info btn_text="К товарам" title="Корзина пустая" description="Нет товаров в корзине" image="/img/cart/empty_cart.png"/>)
                        }
                    </>
                )}
            </div>
        </div>
    );
}

export default DrawerCart;