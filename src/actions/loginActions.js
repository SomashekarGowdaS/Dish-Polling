
export const startLogin = (user, navigate) => {
    return (dispatch, getState) => {
        const loggedUser = getState().users.usersList.find(usr => {
            return (usr.userName === user.userName && usr.password === user.password)
        });
        if (loggedUser) {
            alert('Logged In')
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            dispatch(setLoggedUser(loggedUser));
            navigate('/polls');
        } else {
            alert('Error');
        }
    }
}

export const setLoggedUser = (user) => {
    return {
        type: 'SET_LOGGED_USER',
        payload: user
    }
}

export const startLogout = (navigate) => {
    return (dispatch) => {
        if (window.confirm('Are you sure?')) {
            dispatch(removeLoggedUser());
            localStorage.removeItem('loggedUser');
            navigate('/');
        }
    }
}

export const removeLoggedUser = () => {
    return {
        type: 'REMOVE_LOGGED_USER'
    }
}
