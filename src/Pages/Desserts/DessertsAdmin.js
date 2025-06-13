import { useEffect, useState } from 'react';
import { getAllDesserts, createDessert, deleteDessert, editDessert } from '../../APIFunctions/Desserts';
import style from './Desserts.module.css';

export default function DessertAdminPage(props) {
    const [desserts, setDesserts] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [rating, setRating] = useState("");
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editRating, setEditRating] = useState("");

    async function getDessertsFromDB() {
        const response = await getAllDesserts();
        if (!response.error) {
            setDesserts(response.responseData);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!isNaN(rating) && rating >= 0 && rating <= 5 && title) {
            await createDessert({
                title,
                description,
                rating,
            }, props.user.token);
            window.location.reload();
        }
        else alert('Invalid input');
    }

    async function handleDelete(e, dessert) {
        e.preventDefault();
        await deleteDessert({
            _id: dessert._id
        },
            props.user.token);
        window.location.reload(); // To reload the page
    }

    async function handleSave(e, id, prevDessert) {
        e.preventDefault();
        if (isNaN(editRating) || editRating < 0 || editRating > 5) alert('Invalid input');
        else {
            await editDessert({
                title: editTitle !== "" ? editTitle : prevDessert.title,
                description: editDescription !== "" ? editDescription : prevDessert.description,
                rating: editRating !== "" ? editRating : prevDessert.rating,
                _id: id,
            }, props.user.token);
            window.location.reload();
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
                        className={style['form-button']}
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
                <main>
                    {desserts && desserts.length > 0 ? (desserts.map((dessert) => (
                        <div className={style['index-container']} key={dessert._id}>

                            {editId === dessert._id &&
                                <div className={style['edit-container']}>
                                    <div className={style['edit-form']}>
                                        <input
                                            type="text"
                                            name="title"
                                            placeholder={dessert.title}
                                            onChange={e => setEditTitle(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="description"
                                            placeholder={dessert.description}
                                            onChange={e => setEditDescription(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            name="rating"
                                            placeholder={dessert.rating}
                                            onChange={e => setEditRating(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className={style['save-button']}
                                            onClick={(e) => handleSave(e, editId, dessert)}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            }
                            <div className={style['index-admin']}>
                                <div>
                                    <h2>{dessert.title}</h2>
                                    <p>{dessert.description}</p>
                                    <p>{dessert.rating}</p>
                                </div>
                                <div className={style['button']}>
                                    <button
                                        className={style['delete-button']}
                                        onClick={(e) => handleDelete(e, dessert)}>
                                        Delete
                                    </button>
                                    <button
                                        className={style['edit-button']}
                                        onClick={() => setEditId(prev => prev === dessert._id ? null : dessert._id)}>
                                        {editId !== dessert._id ? 'Edit' : 'Cancel'}
                                    </button>
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