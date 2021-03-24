import React from 'react'

const Dish = (props) => {
    const { dishImage, dishTitle, dishDescription, isResult, totalPoints } = props;

    return (
        <div style={{ border: '1px solid black' }} >
            <img src={dishImage} width="75" height="75" alt={dishTitle} />
            <h1> {dishTitle} </h1>
            <p> {dishDescription} </p>
            {isResult && (
                <p>Total Points - {totalPoints}</p>
            )}
        </div>
    )
}

export default Dish