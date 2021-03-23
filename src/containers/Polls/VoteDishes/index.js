import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Dish from '../Dish';

const VoteDishes = (props) => {
    const dishesState = useSelector((state) => {
        return state.dishes;
    });
    const loggedUser = useSelector((state) => {
        return state.users.loggedUser;
    });

    const getDishesToVote = () => {
        const dishesToVote = dishesState.filter(dish => {
            return dish.createdBy != loggedUser.userId
        });
        return dishesToVote;
    }

    return (
        <div>
            { getDishesToVote().map(dish => {
                return <Dish key={dish.dishId} {...dish} enableVoting={true} />
            })}
        </div>
    )
}

export default VoteDishes