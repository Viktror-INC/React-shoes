import React from 'react';
import styles from './Cart.module.scss'
import axios from "axios";

function Card({name,image,price, onPlus,id, onAddToFavorite, isFavorite }) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [favorite, setFavorite] = React.useState(isFavorite);


    /*Add to cart on click plus*/
    const onClickPlus = () => {
        onPlus({name, image, price})
        setIsAdded(!isAdded);
        setTimeout(() => { setIsAdded(false); }, 500);
    }

    /*Add to Favorite*/
    const onClickFavorite = () => {
        onAddToFavorite({name, image, price, id});
        setFavorite(!favorite);
    }

    return (
        <li>
            <img onClick={onClickFavorite} className={styles.add_item} src={favorite ? "/img/liked.png" : "/img/unliked.svg"} alt=""/>
            <img className={styles.product_img} src={image} alt=""/>
            <span>{name}</span>
            <div className={styles.add_cart_wrap}>
                <div className={styles.price}>
                    <span className={styles.price_name}>Цена:</span>
                    <span className={styles.price_number}>{price} руб.</span>
                </div>
                <button onClick={() => onClickPlus()} className={styles.cart_btn}>
                    <img src={isAdded ? '/img/btn-check.svg' : '/img/add-cart.svg'} alt=""/>
                </button>
            </div>
        </li>
    );
};

export default Card;