import React from 'react';
import './AddItem.scss'
import AppContext from "../../context";
import axios from "axios";

const AddItem = () => {
    const {items, setItems} = React.useContext(AppContext);
    const [additems, setAdditems] = React.useState({name:"", price:"", image:"", count: "1", parent_id: `${Date.now()}`});

    const [file, setFile] = React.useState("");
    const [preview, setPreview] = React.useState("");

    const OnAddItem = async (e) => {
        e.preventDefault();

        const newItem = [...items, additems];
        setItems(newItem);
        console.log([...items]);
         await axios.post('https://61092eb1d71b6700176397de.mockapi.io/items', additems);

        setAdditems({name:"", price:"", image:""});
        setFile("");
    }


    const handleChange = (e) => {
        const selectFile = e.target.files[0];
        setFile(selectFile);
        const filePrev = URL.createObjectURL(selectFile);
        console.log(filePrev);
        setPreview(filePrev);
        setAdditems({...additems, image:filePrev})
    }
    return (
        <div className="add_item_wrap">
            <h2>Добавить товар на сайт</h2>
            <form className="item_wrap">
                <div className="image_item">
                    <input
                        onChange={(e) => handleChange(e)}
                        id="img_input"
                        className="image_item_input"
                        type="file"
                        accept="image/*"
                    />
                    {file && <img src={preview} alt={file.name}/>}
                    <label className="add_file" htmlFor="img_input">
                        <img width="30" height="30" src="/img/upload.png" alt=""/>
                        <span>Добавить изображение</span>
                    </label>
                </div>
                <div className="name_item">
                    <span>Имя товара</span>
                    <input type="text" value={additems.name} onChange={(e) => setAdditems({...additems, name:e.target.value})}/>
                </div>
                <div className="price_item">
                    <span>Цена товара</span>
                    <input type="text" value={additems.price} onChange={(e) => setAdditems({...additems, price:e.target.value})}/>
                </div>
                <div className="button_wrap">
                    <button onClick={(e) => OnAddItem(e)}>Добавить товар</button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;