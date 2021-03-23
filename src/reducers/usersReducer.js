const initialState = {
    usersList: [
        { userId: 1, userName: 'userOne', password: 'user1' },
        { userId: 2, userName: 'userTwo', password: 'user2' },
        { userId: 3, userName: 'userThree', password: 'user3' }
    ],
    loggedUser: JSON.parse(localStorage.getItem('loggedUser')) ? JSON.parse(localStorage.getItem('loggedUser')) : {}
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_USER': {
            return { ...state, loggedUser: action.payload };
        }
        case 'REMOVE_LOGGED_USER': {
            return { ...state, loggedUser: initialState.loggedUser };
        }
        default: {
            return state;
        }
    }
}

export default usersReducer