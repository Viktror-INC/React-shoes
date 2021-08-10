import React from 'react';
import AppContext from "../context";

function DrawerCart({onClickCart, onRemove}) {
    const {addItemInCart,removeItemInCart, cartItems} = React.useContext(AppContext);
    return (
        <div className="drawer-overlay">
            <div className="drawer">
                <h1>Корзина <button onClick={onClickCart} className="cart-btn"><img src="/img/remove-cart.svg" alt=""/>
                </button></h1>
                <ul>
                    {cartItems.length > 0 ? cartItems.map((obj, index) => {
                        return (
                            <li key={index}>
                                <img src={obj.image} alt=""/>
                                <div className="drawer-item-wrap">
                                    <span className="drawer-name">{obj.name}</span>
                                    <div className="count-wrap">
                                        <img onClick={() => addItemInCart(obj)} width={30} height={30} className="btn-cart btn-cart_plus" src="/img/add-cart.svg" alt=""/>
                                        <span className="drawer-count">{obj.count} шт</span>
                                        <img onClick={() => removeItemInCart(obj)} className={"btn-cart btn-cart_minus"} src="/img/minus.png" alt=""/>
                                    </div>
                                    <span className="drawer-price">Цена: {obj.price} руб</span>
                                </div>
                                <button onClick={() => onRemove(obj.id)} className="cart-btn"><img src="/img/remove-cart.svg" alt=""/></button>
                            </li>
                        )
                    })
                        : <div className="cart_empty"><span>Корзина пустая</span></div>
                    }
                </ul>
                <div className="order-price-wrap">
                    <div className="total-price-wrap">
                        <span className="total-title-price">Итого:</span>
                        <span className="total-line"></span>
                        <span className="total-price">21 498 руб.</span>
                    </div>
                    <div className="other-price-wrap">
                        <span className="total-title-price">Налог 5%:</span>
                        <span className="total-line"></span>
                        <span className="total-price">1074 руб.</span>
                    </div>
                    <button>
                        <span>Оформить заказ</span>
                        <img alt='order' src='/img/order-arrow.svg'/>
                    </button>
                </div>

            </div>
        </div>
    );
}

export default DrawerCart;