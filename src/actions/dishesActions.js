
export const startAddDishes = (dishOne, dishTwo) => {
    return (dispatch, getState) => {
        const dishes = getState().dishes;
        dispatch(addDishes([dishOne, dishTwo]));
        localStorage.setItem('dishes', JSON.stringify([...dishes, dishOne, dishTwo]));
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
        dispatch(clearDishes());
        localStorage.removeItem('dishes');
    }
}

export const clearDishes = () => {
    return {
        type: 'CLEAR_DISHES'
    }
}