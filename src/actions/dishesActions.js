
export const startAddDish = (dish) => {
    return (dispatch, getState) => {
        const dishes = getState().dishes;
        localStorage.setItem('dishes', JSON.stringify([...dishes, dish]));
        dispatch(addDish(dish));
    }
}

export const addDish = (dish) => {
    return {
        type: 'ADD_DISH',
        payload: dish
    }
}

export const startClearDish = () => {
    return (dispatch) => {
        localStorage.removeItem('dishes');
        dispatch(clearDishes());
    }
}

export const clearDishes = () => {
    return {
        type: 'CLEAR_DISHES'
    }
}

export const startUpdateDishes = (payload) => {
    return (dispatch) => {
        localStorage.setItem('dishes', JSON.stringify([...payload]));
        dispatch(updateDishes(payload));
    }
}

export const updateDishes = (payload) => {
    return {
        type: 'UPDATE_DISHES',
        payload
    }
}