import React, { useState, useEffect } from 'react';
import { getAllDesserts } from '../../APIFunctions/Desserts';
import style from './Desserts.module.css';

export default function DessertPage() {
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
        <div className={style['container']}>
            <header>
                <h1>Desserts</h1>
            </header>

            {desserts && desserts.length > 0 ? (desserts.map((dessert) => (
                <div className={style['index-card']} key={dessert._id}>
                    <h2>{dessert.title}</h2>
                    <p>{dessert.description}</p>
                    <p>{dessert.rating}</p>
                </div>
            ))
            ) : (
                <p className={style['custom-text']}>No desserts yet!</p>
            )}
        </div>
    );
}