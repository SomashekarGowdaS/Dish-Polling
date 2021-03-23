import { startClearDish } from "./dishesActions";

export const startCreatePoll = (id) => {
    return (dispatch) => {
        localStorage.setItem('poll', JSON.stringify({
            pollCreated: true,
            createdBy: id
        }));
        dispatch(createPoll(id));
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
            localStorage.setItem('poll', JSON.stringify({
                pollCreated: false,
                createdBy: null
            }));
            dispatch(endPoll());
            dispatch(startClearDish());
            alert('Poll Ended');
        }
    }
}

export const endPoll = () => {
    return {
        type: 'END_POLL'
    }
}