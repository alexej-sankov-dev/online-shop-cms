import _ from 'lodash';

import { FETCH_ORDER, FETCH_ORDERS, DELETE_ORDER, EDIT_ORDER, CREATE_ORDER, FETCH_ORDERS_BYUSERID} from "../actions/types";

const INITIAL_STATE = {
    orders: null,
    ordersowner: null
}

const reducer = (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_ORDERS:
            return {...state, orders: _.mapKeys(action.payload, 'orderid')};
        case FETCH_ORDER:
            return {...state, orders: {...state.orders, [action.payload.orderid]: action.payload}};
        case CREATE_ORDER:
            return {...state, orders: {...state.orders, [action.payload.orderid]: action.payload}};
        case EDIT_ORDER:
            if('success' in action.payload) {
                return state;
            } else {
                return {...state, orders: {...state.orders, [action.payload.orderid]: action.payload}};
            }
        case DELETE_ORDER:
            if(action.payload.success === true) {
                return {...state, orders: _.omit(state.orders, action.payload.idmod)};
            } else {
                return state;
            }
        case FETCH_ORDERS_BYUSERID:
            return {...state, ordersowner: _.mapKeys(action.payload, 'orderid')};
        default:
            return state;
    }
}

export default reducer;