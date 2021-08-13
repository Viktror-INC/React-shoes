import Header from "./components/Header";
import DrawerCart from "./components/DrawerCart";
import React from 'react';
import axios from "axios";
import {Route} from "react-router";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import AppContext from './context'

function App() {
    const [items, setItems] = React.useState([]); /* All items on main page */
    const [cartOpened, setCartOpened] = React.useState(false); /* change open or close cart */
    const [cartItems, setCartItems] = React.useState([]); /* get and post items which in cart */
    const [favoritesItems, setFavoritesItems] = React.useState([]); /* get and post items which in cart */
    const [searchText, setSearchText] = React.useState(''); /* input search */
    const [isLoading, setIsLoading] = React.useState(true); /*when website rendering we know download items or not*/
    const [prices, setPrices] = React.useState();


    const onClickCart = () => {
        setCartOpened(!cartOpened);
    }

    /*Return items from database*/


    React.useEffect(() => {
        async function tookData() {
            setIsLoading(true);
            const cartItemsResponse = await axios.get('https://61092eb1d71b6700176397de.mockapi.io/cart');
            const FavItemsResponse = await axios.get('https://61092eb1d71b6700176397de.mockapi.io/favorite');
            const itemsResponse = await axios.get('https://61092eb1d71b6700176397de.mockapi.io/items');

            setIsLoading(false);

            setCartItems(cartItemsResponse.data);
            setFavoritesItems(FavItemsResponse.data);
            setItems(itemsResponse.data);
        }

        tookData();
    }, []);


    /*Add item to cart*/
    const onAddToCart = async(obj) => {
        if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
            setCartItems(prevItem => prevItem.filter(objIn => Number(objIn.id) !== Number(obj.id)))
            axios.delete(`https://61092eb1d71b6700176397de.mockapi.io/cart/${obj.id}`);
        } else {
            await axios.post('https://61092eb1d71b6700176397de.mockapi.io/cart', obj);
            setCartItems(cartItems => [...cartItems, obj]);
        }
    }
    /*Plus item in cart*/
    const addItemInCart = (obj) => {
        if (cartItems.filter(cartItem => Number(cartItem.id) === Number(obj.id))) {
            obj.count = Number(obj.count) + 1;
            const foundIndex = cartItems.findIndex((item) => item.id === obj.id);
            if (foundIndex !== -1) {
                const temp = [...cartItems];
                temp.splice(foundIndex, 1, obj);
                setCartItems(temp);
            }
            axios.put(`https://61092eb1d71b6700176397de.mockapi.io/cart/${obj.id}`, obj);
        }
    }

    /*Minus item in cart*/
    const removeItemInCart = async (obj) => {

        if (cartItems.filter(cartItem => Number(cartItem.id) === Number(obj.id))) {
            if (obj.count <= 1) {
                axios.delete(`https://61092eb1d71b6700176397de.mockapi.io/cart/${obj.id}`);

                const foundIndex = cartItems.findIndex((item) => item.id === obj.id);
                if (foundIndex !== -1) {
                    const temp = [...cartItems];
                    temp.splice(foundIndex, 1);
                    setCartItems(temp);
                }
            } else {
                obj.count = Number(obj.count) - 1;
                const foundIndex = cartItems.findIndex((item) => item.id === obj.id);
                if (foundIndex !== -1) {
                    const temp = [...cartItems];
                    temp.splice(foundIndex, 1, obj);
                    setCartItems(temp);
                }
                axios.put(`https://61092eb1d71b6700176397de.mockapi.io/cart/${obj.id}`, obj);
            }
        }
    }
    /*Check if added item => return true or false*/
    const isItemAdded = (id) => {
        return cartItems.some(cartItem => Number(cartItem.parent_id) === Number(id))
    }

    /*Remove items from cart*/

    const onRemoveFromCart = (id) => {
        axios.delete(`https://61092eb1d71b6700176397de.mockapi.io/cart/${id}`);
        setCartItems(cartItem => cartItem.filter(item => item.id !== id));
    }

    /*Add item to Favorite*/

    const onAddToFavorite = async (obj) => {
        try {
            if (favoritesItems.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://61092eb1d71b6700176397de.mockapi.io/favorite/${obj.id}`);
                setFavoritesItems(favoritesItems => favoritesItems.filter(item => item.id !== obj.id))
            } else {
                const {data} = await axios.post('https://61092eb1d71b6700176397de.mockapi.io/favorite', obj);
                setFavoritesItems(favoritesItems => [...favoritesItems, data]);
            }
        } catch (error) {
            alert('Erro Add to Favorite')
        }
    }

    /*For input*/

    const onChangeSearchInput = (event) => {
        setSearchText(event.target.value)
        console.log(searchText);
    }
    return (
        <AppContext.Provider
            value={{
                items,
                setCartItems,
                cartItems,
                favoritesItems,
                isItemAdded,
                onAddToFavorite,
                addItemInCart,
                removeItemInCart,
                setCartOpened,
                prices,
                setPrices
            }}>
            <div className="App">
                {cartOpened ? <DrawerCart onAddToCart={onAddToCart} onRemove={onRemoveFromCart} items={cartItems}
                                          onClickCart={onClickCart}/> : null}
                <div className='wrapper'>
                    <Header onClickCart={onClickCart}/>
                    <div className="container w100p m-auto">
                        <div className="slider-wrap"></div>
                        <Route exact path="/">
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchText={searchText}
                                setSearchText={setSearchText}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToCart={onAddToCart}
                                onAddToFavorite={onAddToFavorite}
                                isLoading={isLoading}
                            />
                        </Route>
                        <Route exact path="/favorites">
                            <Favorite/>
                        </Route>
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
