import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { getAuth } from "firebase/auth";
import { updateDoc, doc, getDoc } from 'firebase/firestore'

const Edit = () => {
    const navigate = useNavigate();
  
    const auth = getAuth();
  
    const [user, setUser] = useState();
  
    useEffect(() => {
        auth.onAuthStateChanged(setUser);
    });
  
    if(user === null)
    {
      navigate("/Login");
    }

    const { memoryId } = useParams();

    const [memory, setMemory] = useState({});

    useEffect(() => {
        const getMemory = async () => {
            const docRef = doc(db, "Memories", memoryId);
            const docSnap = await getDoc(docRef);
            setMemory(docSnap.data());
            console.log(docSnap.data());
        }

        getMemory();
    }, [memoryId]);

    const onEditHandler = async (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let { title, description } = Object.fromEntries(formData)

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
