import React from 'react';
import Card from "../components/Card";

function Home({items, cartItems, searchText, setSearchText, onChangeSearchInput, onAddToCart, onAddToFavorite, isLoading}) {
    const renderItems = () => {
        const filterItems = items.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()));
        return (isLoading ? [...Array(10)] :filterItems)
            .map((item, index) => {
                return (
                    <Card
                        key={index}
                        onPlus={(obj) => onAddToCart(obj)}
                        onAddToFavorite={(obj) => onAddToFavorite(obj)}
                        isFavorite={false}
                        isLoading={isLoading}
                        {...item}
                    />
                )
            }
        )}
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
                {renderItems()}
            </ul>
        </div>
    );
}

export default Home;