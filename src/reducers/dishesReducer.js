const initialState = JSON.parse(localStorage.getItem('dishes')) ? JSON.parse(localStorage.getItem('dishes')) : [];

const dishesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_DISHES': {
            return [...state, ...action.payload];
        }
        case 'CLEAR_DISHES': {
            return [];
        }
        default: {
            return [...state];
        }
    }
}

export default dishesReducer