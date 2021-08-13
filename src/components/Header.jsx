import React from 'react';
import {Link} from "react-router-dom";
import {useCart} from "../hooks/useCart";


function Header(props) {
    const {totalPrice} = useCart();
    return (
        <header>
            <div className="align-center d-flex">
                <div className="header-left-side d-flex w100p">
                    <Link to="/">
                        <img src="/img/logo.svg" alt=""/>
                        <div>
                            <h3>REACT SNEAKERS</h3>
                            <p>Магазин лучших кроссовок</p>
                        </div>
                    </Link>
                </div>
                <div className="header-right-side">
                    <img src="/img/header-right-items/cart.svg" alt=""/>
                    <span onClick={props.onClickCart}>{totalPrice} руб</span>
                    <Link to="/favorites">
                        <img src="/img/header-right-items/heart.svg" alt=""/>
                    </Link>
                    <img src="/img/header-right-items/avatar.svg" alt=""/>
                </div>
            </div>
        </header>
    );
}

export default Header;