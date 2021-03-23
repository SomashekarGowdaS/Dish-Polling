
export const startAddDishes = (dishOne, dishTwo) => {
    return (dispatch, getState) => {
        const dishes = getState().dishes;
        localStorage.setItem('dishes', JSON.stringify([...dishes, dishOne, dishTwo]));
        dispatch(addDishes([dishOne, dishTwo]));
    }
}

export const addDishes = (dishes) => {
    return {
        type: 'ADD_DISHES',
        payload: dishes
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