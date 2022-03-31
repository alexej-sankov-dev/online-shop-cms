import history from '../history'

import {CREATE_ORDER, FETCH_ORDER, FETCH_ORDERS, EDIT_ORDER, DELETE_ORDER, FETCH_ORDERS_BYUSERID} from './types'
import orders from '../apis/Orders'

// resp - created object  
export const createOrder = (formValues) => async (dispatch, getState) => {
    const response = await orders.post('/order', formValues);
    dispatch({type: CREATE_ORDER, payload: response.data});
    history.push('/my-orders');
};

// resp - list of json objects
export const fetchOrders = () => async dispatch => {
    const response = await orders.get('/orders');
    dispatch({type: FETCH_ORDERS, payload: response.data});
};

// resp - object with specified id
export const fetchOrder = (id) => async dispatch => {
    const response = await orders.get(`/order/${id}`);
    dispatch({type: FETCH_ORDER, payload: response.data});
};

// resp - edited object or {"success": false}
export const editOrder = (id, formValues) => async dispatch => {
    const response = await orders.patch(`/order/${id}`, formValues);
    dispatch({type: EDIT_ORDER, payload: response.data});
    history.push('/my-orders');
};

// resp - {"success": true} or {"success": false}
export const deleteOrder = (id, values) => async dispatch => {
    const response = await orders.delete(`/order/${id}`, values);
    dispatch({type: DELETE_ORDER, payload: {...response.data, idmod: id}});
    history.push('/my-orders');
};

// resp - list of json objects
export const fetchOrdersByUserId = (userid) => async dispatch => {
    const response = await orders.get(`/orders/${userid}`);
    dispatch({type: FETCH_ORDERS_BYUSERID, payload: response.data});
};