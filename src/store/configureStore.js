import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from "redux-thunk";
import dishesReducer from "../reducers/dishesReducer";
import pollReducer from "../reducers/pollReducer";
import usersReducer from "../reducers/usersReducer"

const configureStore = () => {
    const store = createStore(combineReducers({
        users: usersReducer,
        dishes: dishesReducer,
        poll: pollReducer
    }), applyMiddleware(thunk));
    return store;
}

export default configureStore