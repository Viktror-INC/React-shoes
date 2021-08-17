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
        try {
            if(additems.name !=="" & additems.price !=="" & additems.image !=="") {
                const newItem = [...items, additems];
                setItems(newItem);
                await axios.post('https://61092eb1d71b6700176397de.mockapi.io/items', additems);
                const {data} = await axios.get('https://61092eb1d71b6700176397de.mockapi.io/items');
                setItems(data);

                setAdditems({name:"", price:"", image:""});
                setFile("");
            }

            if (additems.image ==="") {
                alert('Image not added')
            }
        } catch (erro) {
            alert("Error when add item on site")
        }
    }


    const handleChange = (e) => {
        e.preventDefault();
        const selectFile = e.target.files[0];
        setFile(selectFile);
        const filePrev = URL.createObjectURL(selectFile);
        setPreview(filePrev);
        setAdditems({...additems, image:filePrev})
    }
    return (
        <div className="add_item_wrap">
            <h2>Добавить товар на сайт</h2>
            <form className="item_wrap">
                <div className="image_item">
                    <input
                        required
                        onChange={(e) => handleChange(e)}
                        id="img_input"
                        className="image_item_input"
                        type="file"
                        accept="images/*"
                    />
                    {file && <img src={preview} alt={file.name}/>}
                    <label className="add_file" htmlFor="img_input">
                        <img width="30" height="30" src="/img/upload.png" alt=""/>
                        <span>Добавить изображение</span>
                    </label>
                </div>
                <div className="name_item">
                    <span>Имя товара</span>
                    <input required type="text" maxLength="100" value={additems.name} onChange={(e) => setAdditems({...additems, name:e.target.value})}/>
                </div>
                <div className="price_item">
                    <span>Цена товара</span>
                    <input required type="number" maxLength="100" value={additems.price} onChange={(e) => setAdditems({...additems, price:e.target.value})}/>
                </div>
                <div className="button_wrap">
                    <button onClick={(e) => OnAddItem(e)}>Добавить товар</button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;