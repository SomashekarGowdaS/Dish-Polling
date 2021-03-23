import React, { useEffect, useState } from 'react'
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
            return dish.createdBy !== loggedUser.userId
        });
        return dishesToVote;
    }

    const [options, setOptions] = useState([
        { label: 'Rank One(30 points)', value: 30 },
        { label: 'Rank Two(20 points)', value: 20 },
        { label: 'Rank Three(10 points)', value: 10 }
    ]);
    const [dishes, setDishes] = useState(getDishesToVote())

    const onSubmit = (data) => {
        console.log(data);
    }

    const handleChange = (value, dishId) => {
        const optionsClone = options.filter(item => item.value !== Number(value));
        setOptions(optionsClone);
        const dishesCLone = dishes.map(item => {
            if (item.dishId === dishId) {
                item.points = value;
            }
            return item;
        });
        setDishes(dishesCLone)
    }

    return (
        <div>
            {dishes.map(dish => {
                return <div key={dish.dishId}>
                    <Dish key={dish.dishId} {...dish} />
                    {dish.points ? <p> {dish.points} </p> :
                        options.length > 0 && (
                            <select name="rank" onChange={(e) => {
                                handleChange(e.target.value, dish.dishId);
                            }}>
                                <option value="" hidden >Select</option>
                                {options.map(option => {
                                    return <option key={option.value} value={option.value} > {option.label} </option>
                                })}
                            </select>)}
                </div>
            })}
            <button >Submit</button>
        </div>
    )
}

export default VoteDishes