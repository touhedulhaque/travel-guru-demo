import React, { useState, useEffect } from 'react';
import hotelData from '../../data/data.json';
import Blog from '../Blog/Blog';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';



const News = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        setHotels(hotelData);
    }, [])
    return (
        <div>
            {
                hotels.map(hotel => <Blog hotel={hotel}></Blog>)
            }
            <Button variant="contained">
                <Link to="/home">Back to Home</Link>
            </Button>
           
            
        </div>
    );
};



export default News;