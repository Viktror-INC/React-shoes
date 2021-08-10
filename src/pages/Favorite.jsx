import React from 'react';
import Card from "../components/Card";
import AppContext from "../context";

function Favorite() {
    const {favoritesItems} = React.useContext(AppContext);
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