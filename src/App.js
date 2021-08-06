import Header from "./components/Header";
import DrawerCart from "./components/DrawerCart";
import React from 'react';
import axios from "axios";
import {Route} from "react-router";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";


function App() {
    const [items, setItems] = React.useState([]); /* All items on main page */
    const [cartOpened, setCartOpened] = React.useState(false); /* change open or close cart */
    const [cartItems, setCartItems] = React.useState([]); /* get and post items which in cart */
    const [favoritesItems, setFavoritesItems] = React.useState([]); /* get and post items which in cart */
    const [searchText, setSearchText] = React.useState(''); /* input search */

    const onClickCart = () => {
        setCartOpened(!cartOpened);
    }

    /*Return items from database*/

    React.useEffect(() => {
        axios.get('https://61092eb1d71b6700176397de.mockapi.io/items').then(response => {
            setItems(response.data);
        });

        axios.get('https://61092eb1d71b6700176397de.mockapi.io/cart').then(response => {
            setCartItems(response.data);
        });

        axios.get('https://61092eb1d71b6700176397de.mockapi.io/favorite').then(response => {
            setFavoritesItems(response.data);
        });
    }, []);

    /*Add item to cart*/
    const onAddToCart = async (obj) => {
        try {
            const {data} = await axios.post('https://61092eb1d71b6700176397de.mockapi.io/cart', obj);
            setCartItems(cartItems => [...cartItems, data]);
        } catch (error) {
            alert("Error add to cart")
        }
    }

    /*Remove items from cart*/

    const onRemoveFromCart = (id) => {
        axios.delete(`https://61092eb1d71b6700176397de.mockapi.io/cart/${id}`);
        setCartItems(cartItems => cartItems.filter(item => item.id !== id));
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
        <div className="App">
            {cartOpened ? <DrawerCart onRemove={onRemoveFromCart} items={cartItems} onClickCart={onClickCart}/> : null}
            <div className='wrapper'>
                <Header onClickCart={onClickCart}/>
                <div className="container w100p m-auto">
                    <div className="slider-wrap"></div>
                    <Route exact path="/">
                        <Home
                            items={items}
                            searchText={searchText}
                            setSearchText={setSearchText}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddToCart={onAddToCart}
                            onAddToFavorite={onAddToFavorite}
                        />
                    </Route>
                    <Route exact path="/favorites">
                        <Favorite favoritesItems={favoritesItems} onAddToFavorite={onAddToFavorite}/>
                    </Route>
                </div>
            </div>
        </div>
    );
}

export default App;
