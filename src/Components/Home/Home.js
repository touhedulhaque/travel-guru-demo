import React, { useState, useEffect } from 'react';
import data from '../../data/data.json';
import Destination from '../Destination/Destination';



const Home = () => {
    const [places, setPlaces] = useState([]);
    // cons [cart, setCart] = useState([]);

    useEffect(() => {
        setPlaces(data);
    }, [])

    // const handleBookBtn = (course) => {
    //     const newCart = [...cart, course];
    // }
    return (
        <>
                {
                    places.map(place => <Destination place={place}></Destination>)
                }
            
        </>
    );
};

export default Home;