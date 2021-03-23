
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