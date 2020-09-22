import React, { useState, useEffect } from 'react';
import data from '../../data/data.json';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { HiArrowRight } from 'react-icons/hi';



const DestinationDetail = () => {
    const {id} = useParams();
    const [locationDetail, setLocationDetail] = useState([]);

    useEffect(() => {
    const dataInDetail = data.find(item =>item.id  == id);
    setLocationDetail(dataInDetail);

    }, [id])    
    


    return (
        <div style={{backgroundColor: 'khaki', margin: '50px'}}>
            <img src={locationDetail.image} alt="" height="300px"/>
            <h2> {locationDetail.place_name} </h2>
            <h4> {locationDetail.country_name} </h4>
            <p> {locationDetail.details} </p>
            <h1> Package Value: $ {locationDetail.price} </h1>
            
            <Button variant="contained" color="primary">
                        <Link to="/book">Book Now</Link> <HiArrowRight />
                    </Button>
                    <hr/>
            <Button variant="contained">
                    <Link to="/home">Back to Home</Link>
                </Button>
    
            
        </div>
    );
};

export default DestinationDetail;