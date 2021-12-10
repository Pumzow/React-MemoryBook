import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase';

import ProfileMemoryItem from '../Profile/ProfileMemoryItem.js';



const Profile = () => {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    if (user === null) {
        navigate("/Login");
    }

    const { profileId } = useParams();
    console.log(profileId);
    const [owner, setOwner] = useState();


    useEffect(() => {
        const getOwner = async () => {
            const docRef = doc(db, "Users", profileId);
            const docSnap = await getDoc(docRef);

            if (docSnap.data() === undefined) {
                navigate("/Error404");
                return;
            }
            else {
                setOwner(docSnap.data());
            }

        }

        if (profileId !== undefined) {
            getOwner();
        }
    }, [profileId]);

    const [memories, setMemories] = useState([]);
    const memoriesRef = collection(db, "Memories");

    useEffect(() => {
        const getMemories = async () => {
            const data = await getDocs(memoriesRef);
            setMemories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getMemories();
    }, []);

    const length = memories.length;

    return (
        <section className="Profile">
            {owner !== undefined
                ? <article className="Profile-Information">
                    <h1>Profile</h1>
                    <img src={owner.PhotoURL} alt="" />
                    <h2> {owner.DisplayName} </h2>
                </article>
                : <p> Searching for user... </p>
            }

            <article className="Profile-Memories">
                <h3> Memories </h3>
                {length > 0
                    ? <article>
                        {memories.map((memory) => {
                            return (
                                {
                                    ...memory.OwnerId === owner.Uid
                                        ? < ProfileMemoryItem key={memory.id} memory={memory} />
                                        : <></>
                                }
                            );
                        })}
                    </article>
                    : <p> Searching for memories... </p>
                }
            </article>
        </section>
    );


};

export default Profile;
