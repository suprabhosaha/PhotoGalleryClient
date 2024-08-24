import { useState } from "react";
import Navbar from "../components/Navbar";
import Feeds from "../components/Feeds";
import PinDetail from "../components/PinDetail";
import CreatePin from "../components/CreatePin";
import Search from "../components/Search";
import { Route, Routes } from "react-router-dom";

const Pins = ({ user }) => {

    const [ searchTerm, setSearchTerm ] = useState('');


    return ( 
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={ <Feeds /> } />
                    <Route path="/category/:categoryId" element={ <Feeds /> } />
                    <Route path="/pin-detail/:pinId" element={ <PinDetail user={ user } />} />
                    <Route path="/create-pin" element={ <CreatePin user={ user } />} />
                    <Route path="/search" element={ <Search searchTerm={ searchTerm } setSearchTerm={ setSearchTerm } />} />
                </Routes>
            </div>
        </div>
     );
}
 
export default Pins;