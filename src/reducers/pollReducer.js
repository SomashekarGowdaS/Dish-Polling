const initialState = JSON.parse(localStorage.getItem('poll')) ? JSON.parse(localStorage.getItem('poll')) : {
    pollCreated: false,
    createdBy: null
};

const pollReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_POLL': {
            return {
                pollCreated: true,
                createdBy: action.payload
            };
        }
        case 'END_POLL': {
            return {
                pollCreated: false,
                createdBy: null
            };
        }
        default: {
            return state;
        }
    }
}

export default pollReducer