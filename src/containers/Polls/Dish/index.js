import React, { useState } from 'react'

const Dish = (props) => {
    const { dishId, dishTitle, dishDescription, enableVoting } = props;

    return (
        <div style={{ border: '1px solid black' }} >
            <h1> {dishTitle} </h1>
            <p> {dishDescription} </p>
            { enableVoting && <select name="vote" >
                <option value="" >Vote</option>
                <option value="30" >30 points</option>
                <option value="20" >20 points</option>
                <option value="10" >10 points</option>
            </select>}
        </div>
    )
}

export default Dish