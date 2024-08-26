import { useEffect, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const randomImage = 'https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&fm=jpg&fit=crop&w=1600&q=80&fit=max';

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const [pins, setPins] = useState(null);
    const [text, setText] = useState('Created');
    const [activeBtn, setActiveBtn] = useState('created');

    const navigate = useNavigate();
    const { userId } = useParams();

    const activeBtnStyles = "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
    const notActiveBtnStyles = "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

    const handleLogout = () => {
        googleLogout();

        localStorage.clear();
        navigate('/login');
    };

    useEffect(() => {
        const query = userQuery(userId);

        client.fetch(query)
            .then((data) => {
                setUser(data[0]);
            })
    }, [userId]);

    useEffect(() => {
        if (text === 'Created') {
            const createdPinsQuery = userCreatedPinsQuery(userId);

            client.fetch(createdPinsQuery)
                .then((data) => {
                    setPins(data);
                })
        }
        else {
            const savedPinsQuery = userSavedPinsQuery(userId);

            client.fetch(savedPinsQuery)
                .then((data) => {
                    setPins(data);
                })
        }
    }, [text, userId])


    if (!user) {
        <Spinner message="Loading Profile..." />
    }

    return (
        <div className="flex relative pb-2 h-full justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img
                            src={randomImage}
                            alt="Banner-picture"
                            className="w-full h-370 xl:h-510 shadow-lg object-cover"
                        />
                        <img
                            src={user?.image}
                            alt="user-photo"
                            className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
                        />
                        <h1 className="font-bold text-3xl text-center mt-3">
                            {user?.userName}
                        </h1>
                        <div className="fixed top-5 z-1 right-6 p-2 bg-red-500 rounded-full hover:bg-red-600 cursor-pointer">
                            {userId === user?._id && (
                                <MdOutlineLogout className="text-3xl m-1" onClick={handleLogout} />
                            )}
                        </div>
                    </div>
                    <div className="text-center mb-7">
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent);
                                setActiveBtn('created');
                            }}
                            className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Created
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                setText(e.target.textContent);
                                setActiveBtn('saved');
                            }}
                            className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
                        >
                            Saved
                        </button>
                    </div>
                    {pins?.length ? (
                        <div className="px-2">
                            <MasonryLayout pins={pins} />
                        </div>
                    ) : (
                        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                            No Pins Found!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;