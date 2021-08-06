import React from 'react';
import Card from "../components/Card";

function Home({items, searchText, setSearchText, onChangeSearchInput, onAddToCart, onAddToFavorite}) {
    return (
        <div className="main-content-wrap">
            <div className="main-head">
                <h1>{searchText ? `Вы ищете: ${searchText}` : 'Все кроссовки'}</h1>
                <div className="search-block">
                    <img src="/img/search.png" alt="search"/>
                    {searchText && <img onClick={() => setSearchText("")} className="remove-cart"
                                        src="/img/remove-cart.svg" alt="clear"/>}
                    <input onChange={onChangeSearchInput} value={searchText} placeholder="Поиск..."
                           type="text"/>
                </div>
            </div>
            <ul className="main-content clear">
                {items.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase())).map((item, index) => {
                        return (
                            <Card
                                key={index}
                                onPlus={(obj) => onAddToCart(obj)}
                                onAddToFavorite={(obj) => onAddToFavorite(obj)}
                                isFavorite={false}
                                {...item}
                            />
                        )
                    }
                )}
            </ul>
        </div>
    );
}

export default Home;