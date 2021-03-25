const initialState = JSON.parse(localStorage.getItem('dishes')) ? JSON.parse(localStorage.getItem('dishes')) : [];

const dishesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_DISH': {
            return [...state, action.payload];
        }
        case 'CLEAR_DISHES': {
            return [...initialState];
        }
        case 'UPDATE_DISHES': {
            return action.payload;
        }
        default: {
            return [...state];
        }
    }
}

export default dishesReducer