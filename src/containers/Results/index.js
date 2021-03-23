import React from 'react'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import Dish from '../Polls/Dish/index'

const Results = (props) => {
    const dishesState = useSelector((state) => {
        return state.dishes;
    });

    const getSortedDishes = () => {
        const sortedDishes = _.orderBy(dishesState, ['totalPoints'], ['desc']);
        return sortedDishes;
    }

    return (
        <div>
            { dishesState.length === 0 ? (
                <h1> No Dishes Added </h1>
            ) : (
                <>
                    { getSortedDishes().map(dish => {
                        return <Dish key={dish.dishId} {...dish} />
                    })}
                </>
            )}
        </div>
    )
}

export default Results