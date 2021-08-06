import React from 'react';
import styles from './Cart.module.scss'

function Card(props) {
    const OnClickButton = (event) => {
        console.log(event)
    }
    return (
        <li>
            <img onClick={props.onClickFavorite} className={styles.add_item} src="/img/heart-unliked.svg" alt=""/>
            <img className={styles.product_img} src={props.image} alt=""/>
            <span>{props.name}</span>
            <div className={styles.add_cart_wrap}>
                <div className={styles.price}>
                    <span className={styles.price_name}>Цена:</span>
                    <span className={styles.price_number}>{props.price} руб.</span>
                </div>
                <button onClick={props.onClickPlus} className={styles.cart_btn}><img src="/img/add-cart.svg" alt=""/></button>
            </div>
        </li>

    );
};

export default Card;