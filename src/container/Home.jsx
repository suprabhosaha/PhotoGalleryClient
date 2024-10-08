import { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Logo from "../assets/logo.png";
import { userQuery } from "../utils/data";
import { client } from "../client";
import UserProfile from "../components/UserProfile";
import Pins from "./Pins";
import { fetchUser } from "../utils/fetchUser";

const Home = () => {

    const [toggleSideBar, setToggleSideBar] = useState(false);
    const [user, setUser] = useState(null);
    const scrollRef = useRef(null);

    const userInfo = fetchUser();

    useEffect(() => {
        const query = userQuery(userInfo?.sub);

        client.fetch(query).then((data) => {
            // console.log(data[0]);
            setUser(data[0]);
        })
    }, [ userInfo?.sub ]);

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0);
    })

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar user={user && user} clossToggle={setToggleSideBar} />
            </div>

            <div className="flex md:hidden flex-row">
                <div className="p-2 w-4 flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSideBar(true)} />
                    <Link to={'/'}>
                        <img src={Logo} alt="Logo" className="w-28" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="Logo" className="w-28" />
                    </Link>
                </div>
                {toggleSideBar && (
                    <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSideBar(false)} />
                        </div>
                        <Sidebar user={user && user} clossToggle={setToggleSideBar} />
                    </div>
                )}
            </div>



            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:userId" element={ <UserProfile /> }></Route>
                    <Route path="/*" element={ <Pins user={user && user} /> }></Route>
                </Routes>
            </div>

        </div>
    );
}

export default Home;