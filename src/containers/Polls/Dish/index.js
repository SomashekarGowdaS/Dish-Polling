import React, { useState } from 'react'

const Dish = (props) => {
    const { dishId, dishTitle, dishDescription } = props;

    return (
        <div style={{ border: '1px solid black' }} >
            <h1> {dishTitle} </h1>
            <p> {dishDescription} </p>
        </div>
    )
}

export default Dish