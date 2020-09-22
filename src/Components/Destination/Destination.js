import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';





const Destination = (props) => {
    const { place_name, country_name, image, price, id } = props.place;

    const boxStyle = {
        boxShadow: '5px 5px 15px moccasin',
        border: '1px solid lime',
        borderRadius: '10px',
        padding: '10px',
        width: '300px',
        margin: '85px',
        height: '440px',
        backgroundColor: '#f0f8ff',
        
        
        webkitBoxShadow: '0px 12px 18px -6px rgba(0,0,0,0.3)',
        
    }
    return (
        <div className="container" style={boxStyle}>
            
            <h2>{place_name}</h2>
            <img src={image} alt="" width="280px" height="120px" />
            <p>Country: {country_name}</p>
            <h3>Package price: $ {price}</h3>
            <br/>
            <Button variant="contained" color="primary">
                    <Link to={`/destinationDetail/${id}`}>Click for Detail</Link>
                </Button><hr/>
                <Button variant="contained" color="secondary">
                        <Link to="/book">Book Now</Link> <HiArrowRight />
                    </Button>
            


        </div>
    );
};

export default Destination;