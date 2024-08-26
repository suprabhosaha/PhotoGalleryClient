import { useParams } from "react-router-dom";
import { client } from "../client";

import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { useState } from "react";
import { useEffect } from "react";
import { feedQuery, searchQuery } from "../utils/data";

const Feeds = () => {

    const [ loading, setLoading ] = useState(false);
    const [ pinsData, setPinsData ] = useState(null);
    const { categoryId } = useParams();

    useEffect (() => {
        setLoading(true);
        if (categoryId) {
            const query = searchQuery(categoryId);

            client.fetch(query)
                .then((data) => {
                    setPinsData(data);
                    setLoading(false);
                })

        }
        else {
            client.fetch(feedQuery)
                .then((data) => {
                    setPinsData(data);
                    setLoading(false);
                })
        }
    }, [categoryId])


    if (loading) {
        return <Spinner message="We are adding new ideas to your feeds!!" />
    }

    if (!pinsData?.length) {
        return <h2>No Images Available</h2>
    }

    return ( 
        <div>
            {pinsData && <MasonryLayout pins={  pinsData } />}
        </div>
     );
}
 
export default Feeds;