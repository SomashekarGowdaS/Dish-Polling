import React from 'react'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles';
import Card from '../../components/Card'

const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    inlineBlock: {
        display: 'inline-block'
    },
    block: {
        display: 'block'
    },
    colorGreen: {
        color: 'green'
    }
});

const Results = (props) => {
    const classes = useStyles();
    const dishesState = useSelector((state) => {
        return state.dishes;
    });

    const loggedUser = useSelector((state) => {
        return state.users.loggedUser;
    });

    const getSortedDishes = () => {
        let dishesStateClone = [...dishesState]
        for (let i = 0; i < dishesState.length; i++) {
            const votedByPoints = dishesState[i].votedBy.map(item => item.assignedPoint);
            let total = 0;
            //Filtering truthy values
            const filteredPoints = votedByPoints.length && votedByPoints.filter(item => item)
            if (filteredPoints.length) {
                total = filteredPoints.length > 1 ? filteredPoints.reduce((total, num) => Number(total) + Number(num)) : filteredPoints[0]
            }
            dishesStateClone[i].totalPoints = total;
        }
        const sortedDishes = _.orderBy(dishesStateClone, ['totalPoints'], ['desc']);
        return sortedDishes;
    }

    const isSelectedByUser = (dish) => {
        let isSelected = false;
        dish.votedBy.forEach(votedDish => {
            if ((votedDish.userId === loggedUser.userId) && votedDish.assignedPoint) {
                isSelected = true;
            }
        })
        return isSelected;
    }

    return (
        <div >
            { dishesState.length === 0 ? (
                <h1> No Dishes Added </h1>
            ) : (
                <div className={classes.block} >
                    { getSortedDishes().map(dish => {
                        return <div key={dish.dishId} className={classes.inlineBlock} >
                            {isSelectedByUser(dish) && <p className={classes.colorGreen} > *your selection </p>}
                            <Card dish={dish} isResult />
                        </div>
                    })}
                </div>
            )}
        </div>
    )
}

export default Results