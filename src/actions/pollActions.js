import { startClearDish } from "./dishesActions";

export const startCreatePoll = (id) => {
    return (dispatch) => {
        dispatch(createPoll(id));
        localStorage.setItem('poll', JSON.stringify({
            pollCreated: true,
            createdBy: id
        }));
        alert('Poll Created');
    }
}

export const createPoll = (id) => {
    return {
        type: 'CREATE_POLL',
        payload: id
    }
}

export const startEndPoll = () => {
    return (dispatch) => {
        if (window.confirm('Are you sure?')) {
            dispatch(endPoll());
            dispatch(startClearDish());
            localStorage.setItem('poll', JSON.stringify({
                pollCreated: false,
                createdBy: null
            }));
            alert('Poll Ended');
        }
    }
}

export const endPoll = () => {
    return {
        type: 'END_POLL'
    }
}