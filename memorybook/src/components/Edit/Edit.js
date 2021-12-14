import { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore'

const Edit = () => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    if (user === null) {
        navigate("/Login");
    }

    const { memoryId } = useParams();

    const [memory, setMemory] = useState({});


    const [invalidTitle, setInvalidTitle] = useState(false);
    const [invalidDescription, setInvalidDescription] = useState(false);

    useEffect(() => {
        const getMemory = async () => {
            const docRef = doc(db, "Memories", memoryId);
            const docSnap = await getDoc(docRef);

            if (docSnap.data() === undefined) {
                navigate("/Error404");
                return;
            }
            else {
                setMemory(docSnap.data());
            }


            if (user.uid === memory.OwnerId) {
                navigate("/Memories")
            }
        }
        getMemory();
    }, [memoryId]);

    const onEditHandler = async (e) => {
        e.preventDefault();

        setInvalidTitle(false);
        setInvalidDescription(false);

        let formData = new FormData(e.currentTarget);
        let { title, description } = Object.fromEntries(formData)


        if (title.length === 0 || title.length > 32) {
            setInvalidTitle(true);
            return;
        }
        if (description.length > 150) {
            setInvalidDescription(true);
            return;
        }

        const memoryRef = doc(db, "Memories", memoryId);

        await updateDoc(memoryRef, {
            Title: title,
            Description: description
        });

        navigate('/Memories')
    };

    return (
        <section className="Edit">
            <h1> Edit Memory </h1>
            <form id="Edit-Form" onSubmit={onEditHandler}>
                <div className="container">
                    {invalidTitle ? <p className="InvalidField"> Title must be 1-32 characters long </p> : <></>}
                    {invalidDescription ? <p className="InvalidField"> Description must be maximum of 150 characters long </p> : <></>}
                    
                    <label htmlFor="leg-title"> Title </label><br />
                    <input id="Edit-Form-Title" type="text" name="title" placeholder="Enter memory title..." defaultValue={memory.Title} /><br />

                    <label htmlFor="category"> Description </label><br />
                    <textarea id="Edit-Form-Description" type="text" name="description" placeholder="Enter memory description..." defaultValue={memory.Description} /><br />

                    <input className="btn submit" type="submit" value="Save" />
                </div>
                <div id="MemoryPreviewImage-parent">
                    <img id="MemoryPreviewImage" src={memory.ImageURL} alt="" />
                </div>
            </form>
        </section>
    );


};

export default Edit;
