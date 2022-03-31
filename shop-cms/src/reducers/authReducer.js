import {SIGN_IN, SIGN_OUT} from "../actions/types";

const INITIAL_STATE = {
    userId: null
};

const reducer = (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN:
            return {...state, userId: action.payload % 10000};
        case SIGN_OUT:
            return {...state, userId: null};
        default:
            return state;
    }
};

export default reducer;