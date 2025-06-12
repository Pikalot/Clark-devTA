import { useEffect, useState } from 'react';
import { getAllDesserts, createDessert } from '../../APIFunctions/Desserts';
import style from './Desserts.module.css';

export default function DessertAdminPage(props) {
    const [desserts, setDesserts] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");

    async function getDessertsFromDB() {
        const response = await getAllDesserts();
        if (!response.error) {
            setDesserts(response.responseData);
        }
    }

    useEffect(() => {
        getDessertsFromDB();
    }, []);

    return (
        <div>
            <header>
                <h1>Dessert Admin Page</h1>
            </header>
            <body>
                <div>
                    {/* <form onSubmit={(e) => createDessert({
                    title,
                    description,
                    rating,
                }, props.user.token)}> */}
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        placeholder="Title"
                        onChange={e => setTitle(e.target.value)} />
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        placeholder="Desc."
                        onChange={e => setDescription(e.target.value)} />
                    <input
                        type="text"
                        id="rating"
                        name="rating"
                        value={rating}
                        placeholder='Rating'
                        onChange={e => setRating(e.target.value)} />
                    <button
                        type="submit"
                        onClick={() => createDessert({
                            title,
                            description,
                            rating,
                        }, props.user.token)}>
                        Submit
                    </button>
                    {/* </form> */}
                </div>
                <main>
                    {desserts && desserts.length > 0 ? (desserts.map((dessert) => (
                        <div className={style['index-container']} key={dessert._id}>
                            <div className={style['index-admin']}>
                                <div>
                                    <h2>{dessert.title}</h2>
                                    <p>{dessert.description}</p>
                                    <p>{dessert.rating}</p>
                                </div>
                                <div className={style['button']}>
                                    <button className={style['delete-button']}>Delete</button>
                                    <button className={style['edit-button']}>Edit</button>
                                </div>
                            </div>
                        </div>
                    ))
                    ) : (
                        <h3>No desserts yet!</h3>
                    )}
                </main>
            </body>
        </div >
    );
}