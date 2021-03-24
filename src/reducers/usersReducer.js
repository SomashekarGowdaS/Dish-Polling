const initialState = {
    usersList: [
        { userId: 1, userName: 'srinivas', password: 'srinivas123' },
        { userId: 2, userName: 'rakesh', password: 'rakesh123' },
        { userId: 3, userName: 'ramesh', password: 'ramesh123' },
        { userId: 4, userName: 'sindhu', password: 'sindhu123' },
        { userId: 5, userName: 'anju', password: 'anju123' },
        { userId: 6, userName: 'gagan', password: 'gagan123' },
        { userId: 7, userName: 'naveen', password: 'naveen123' },
        { userId: 8, userName: 'chaitra', password: 'chaitra123' },
        { userId: 9, userName: 'kiran', password: 'kiran123' },
        { userId: 10, userName: 'nikhil', password: 'nikhil123' },
    ],
    loggedUser: JSON.parse(localStorage.getItem('loggedUser')) ? JSON.parse(localStorage.getItem('loggedUser')) : {}
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_USER': {
            return { ...state, loggedUser: action.payload };
        }
        case 'REMOVE_LOGGED_USER': {
            return { ...initialState };
        }
        default: {
            return state;
        }
    }
}

export default usersReducer