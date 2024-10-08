import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
// import { IoIosArrowForward } from "react-icons/io";
import { categories } from "../utils/data";
import logo from "../assets/logo.png";

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'

const Sidebar = ({ user, clossToggle }) => {

    const handleSidebarClose = () => {
        if (clossToggle) clossToggle(false);
    }

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
            <div className="flex flex-col">
                <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center" onClick={handleSidebarClose}>
                    <img src={logo} alt="Logo" className="w-full" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink to="/" className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle} onClick={handleSidebarClose}>
                        <RiHomeFill />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover Categories</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            key={category.name}
                            to={`/category/${category.name}`}
                            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleSidebarClose}>
                            <img src={category.image} alt="category-image" className="w-8 h-8 rounded-full shadow-sm" />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className="flex my-5 mb-3 bg-white gap-2 rounded-lg items-center mx-3"
                    onClick={handleSidebarClose}>
                    <img src={user.image} alt="User Profile" className="w-10 h-10 rounded-full" />
                    <p>{user.userName}</p>
                </Link>
            )}
        </div>
    );
}

export default Sidebar;