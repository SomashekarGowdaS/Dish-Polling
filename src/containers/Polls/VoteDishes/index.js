import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdateDishes } from '../../../actions/dishesActions';
import Dish from '../Dish';

const VoteDishes = (props) => {
    const dispatch = useDispatch()
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

    const checkIfAlreadyVoted = () => {
        let isFound = false
        dishesState.forEach(dish => {
            if (dish.votedBy.length) {
                isFound = dish.votedBy.find(item => item.userId === loggedUser.userId)
            }
        });
        return isFound ? true : false;
    }

    const [options, setOptions] = useState([
        { label: 'Rank One(30 points)', value: 30 },
        { label: 'Rank Two(20 points)', value: 20 },
        { label: 'Rank Three(10 points)', value: 10 }
    ]);
    const [dishes, setDishes] = useState(getDishesToVote());
    const [isCurrentUserVoted, setUserIdVoted] = useState(checkIfAlreadyVoted());

    const onSubmit = () => {
        const userId = loggedUser.userId;
        const points = dishes.map(item => {
            return { dishId: item.dishId, assignedPoint: item.assignedPoint }
        });

        const dishesClone = [...dishesState];
        points.forEach(item => {
            const index = dishesState.findIndex(item1 => item1.dishId === item.dishId);
            const votedByClone = [...dishesClone[index].votedBy];
            const filteredVotedBy = votedByClone.filter(item => item.userId !== userId); // To remove the previous voted values of the current user
            let obj = {
                userId,
                assignedPoint: item.assignedPoint
            };
            filteredVotedBy.push(obj);
            dishesClone[index] = {
                ...dishesClone[index],
                votedBy: filteredVotedBy
            };
            delete dishesClone[index].assignedPoint
        });

        dispatch(startUpdateDishes(dishesClone))
    }

    const handleChange = (value, dishId) => {
        const optionsClone = options.filter(item => item.value !== Number(value));
        setOptions(optionsClone);
        const dishesCLone = dishes.map(item => {
            if (item.dishId === dishId) {
                item.assignedPoint = value;
            }
            return item;
        });
        setDishes(dishesCLone)
    }

    const checkIfVoted = (dish) => {
        const currentIndex = dishes.findIndex(item => item.dishId === dish.dishId);
        if (currentIndex !== -1) {
            const isFound = dishes[currentIndex].votedBy.find(item => item.userId === loggedUser.userId);
            if (isFound) {
                return isFound.assignedPoint
            }
        }
        return false
    }

    const toggleEdit = () => {
        // Removing current user's voting
        const dishesClone = dishes.map(item => {
            const votedByClone = item.votedBy.filter(item => item.userId !== loggedUser.userId);
            item.votedBy = votedByClone;
            return item;
        });
        setDishes(dishesClone)
        setUserIdVoted(!isCurrentUserVoted)
    }

    return (
        <div>
            { dishes.length === 0 ? (
                <p> No Dishes Available </p>
            ) : (
                <div>
                    {dishes.map(dish => {
                        return <div key={dish.dishId}>
                            <Dish key={dish.dishId} {...dish} />
                            {dish.assignedPoint || checkIfVoted(dish) ? <p> {checkIfVoted(dish) || dish.assignedPoint} </p> :
                                options.length > 0 && !isCurrentUserVoted && (
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
                    <button onClick={() => onSubmit()}>Submit</button>
                    <button onClick={() => toggleEdit()}>Edit</button>
                </div>
            )}
        </div>
    )
}

export default VoteDishes