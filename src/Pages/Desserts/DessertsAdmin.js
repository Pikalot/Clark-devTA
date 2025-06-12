import { useEffect, useState } from 'react';
import { getAllDesserts } from '../../APIFunctions/Desserts';
import style from './Desserts.module.css';

export default function DessertAdminPage() {
    const [desserts, setDesserts] = useState([]);
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
                <form>
                    <input type="text" id="title" placeholder="Title" />
                    <input type="text" id="description" placeholder="Desc." />
                    <input type="number" id="rating" placeholder='Rating' />
                    <button onClick={alert("submitted")}>Submit</button>
                </form>
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
        </div>
    );
}