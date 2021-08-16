import React, {useEffect} from 'react';
import Card from "../components/Card";
import AppContext from "../context";
import axios from "axios";

function Orders() {
    const [orderItems, setOrderItems] = React.useState([]);
    const {onAddToCart, onAddToFavorite} = React.useContext(AppContext);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function tookData() {
            try {
                const {data} = await axios.get('https://61092eb1d71b6700176397de.mockapi.io/orders');
                const arrays = (data.reduce((prewObj, currentObj) => [...prewObj, ...currentObj.items],[]));
                console.log(arrays);
                setOrderItems(arrays);
                setIsLoading(false);
            } catch (error) {
                alert('Error took order, reload page')
            }
        }
        tookData();
    },[])
    return (
        <div className="main-content-wrap">
            <div className="main-head">
                <h1>Мои Заказы</h1>
            </div>
            <ul className="main-content clear">
                {orderItems.map((item, index) => {
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
            </ul>
        </div>
    );
}

export default Orders;