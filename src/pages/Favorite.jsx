import React from 'react';
import Card from "../components/Card";
import styles from "../components/Card/Cart.module.scss";

function Favorite({favoritesItems, onAddToFavorite}) {
    return (
        <div className="main-content-wrap">
            <div className="main-head">
                <h1>Мои закладки</h1>
            </div>
            <ul className="main-content clear">
                {favoritesItems.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                isFavorite={true}
                                onAddToFavorite={onAddToFavorite}
                                {...item} // add name={item.name} image={item.image} price={item.price} id={item.id}
                            />
                        )
                    }
                )}
            </ul>
        </div>
    );
}

export default Favorite;