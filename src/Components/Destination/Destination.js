import React from 'react';





const Destination = (props) => {
    const { place_name, country_name, image, price, id } = props.place;

    const boxStyle = {
        boxShadow: '5px 5px 15px moccasin',
        border: '1px solid lime',
        borderRadius: '10px',
        padding: '45px',
        width: '300px',
        margin: '100px',
    }
    return (
        <div className="container col-md-4" style={boxStyle}>
            <h1>Destination</h1>
            <p>Place of Tour: {place_name}</p>
            <img src={image} alt="" width="200px" height="100px" />
            <p>Country: {country_name}</p>
            <h3>Package price: $ {price}</h3>
            


        </div>
    );
};

export default Destination;