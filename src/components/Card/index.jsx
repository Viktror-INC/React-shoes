import React from 'react';
import styles from './Cart.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({
                  name,
                  image,
                  price,
                  count,
                  onPlus,
                  id,
                  parent_id,
                  isFavorite,
                  isLoading
              }) {
    const {isItemAdded, onAddToFavorite,prices} = React.useContext(AppContext);
    const [favorite, setFavorite] = React.useState(isFavorite);
    /*Add to cart on click plus*/
    const onClickPlus = () => {
        console.log(parent_id);
        onPlus({parent_id,id, name, image, price, count,prices})
    }

    /*Add to Favorite*/
    const onClickFavorite = () => {
        onAddToFavorite({name, image, price, id});
        setFavorite(!favorite);
    }
    return (
        <li>
            {isLoading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={200}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="22" ry="22" width="150" height="91"/>
                    <rect x="0" y="102" rx="5" ry="5" width="150" height="15"/>
                    <rect x="-1" y="125" rx="3" ry="3" width="93" height="15"/>
                    <rect x="0" y="156" rx="10" ry="10" width="80" height="24"/>
                    <rect x="112" y="147" rx="8" ry="8" width="32" height="32"/>
                </ContentLoader>
                :
                <>
                    <img onClick={onClickFavorite} className={styles.add_item}
                         src={favorite ? "/img/liked.png" : "/img/unliked.svg"} alt=""/>
                    <img className={styles.product_img} src={image} alt=""/>
                    <span>{name}</span>
                    <div className={styles.add_cart_wrap}>
                        <div className={styles.price}>
                            <span className={styles.price_name}>Цена:</span>
                            <span className={styles.price_number}>{price} руб.</span>
                        </div>
                        <button onClick={() => onClickPlus()} className={styles.cart_btn}>
                            <img src={isItemAdded(parent_id) ? '/img/btn-check.svg' : '/img/add-cart.svg'} alt=""/>
                        </button>
                    </div>
                </>
            }
        </li>
    );
};

export default Card;