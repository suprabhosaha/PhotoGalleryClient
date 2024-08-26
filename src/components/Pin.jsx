import { client, urlFor } from "../client";
import { v4 as uuidv4 } from "uuid";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { fetchUser } from "../utils/fetchUser";
import { useState } from "react";


const Pin = ({ pin: { destination, postedBy, image, _id, save } }) => {

    console.log(destination);

    const navigate = useNavigate();

    const userInfo = fetchUser();
    const [postHovered, setPostHovered] = useState(false);

    const alreadySaved = !!(save?.filter((item) => item.postedBy._id === userInfo?.sub))?.length;

    const savePin = (_id) => {
        if (!alreadySaved) {

            client.patch(_id).setIfMissing({ save: [] }).insert("after", "save[-1]", [{
                _key: uuidv4(),
                userId: userInfo?.sub,
                postedBy: {
                    _type: 'postedBy',
                    _ref: userInfo?.sub
                }
            }]).commit().then(() => {
                window.location.reload();
            })
        }
    }

    const deletePin = (_id) => {
        client.delete(_id)
            .then(() => {
                window.location.reload();
            })

    }

    return (
        <div className="m-2">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out">

                <img src={urlFor(image).width(250).url()} alt="user-post" className="rounded-lg w-full" />
                {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-2 z-50" style={{ height: '100%' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white h-9 w-9 rounded-full flex items-center justify-center text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none" >
                                    <MdDownloadForOffline />
                                </a>
                            </div>
                            {alreadySaved ? (
                                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}>
                                    Save
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                            {destination && (
                                <a href={destination}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white flex items-center gap-2 text-black font-bold px-2 py-1 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 20 ? destination.slice(8, 20).concat("...") : destination.slice(8)}
                                </a>
                            )}
                            {postedBy._id === userInfo?.sub && (
                                <button
                                    type="button"
                                    className="bg-white p-2 opacity-70 hover:opacity-100 font-bold text-base rounded-3xl hover:shadow-md outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }}>
                                    <AiTwotoneDelete />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link
                to={`user-profile/${postedBy._id}`}
                className="flex gap-2 mt-2 px-2 items-center">
                <img src={ postedBy?.image } alt="User Profile" className="w-8 h-8 rounded-full object-cover" />
                <p className="font-semibold capitalize">{ postedBy?.userName }</p>
            </Link>
        </div>
    );
}

export default Pin;