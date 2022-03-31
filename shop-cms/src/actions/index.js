import history from '../history'

import {SIGN_IN, SIGN_OUT} from './types'

export {createOrder, fetchOrder, fetchOrders, editOrder, deleteOrder, fetchOrdersByUserId} from './actionsOrder'

export const signIn = (userId) => (dispatch) => {
    dispatch({ type: SIGN_IN, payload: userId});
    history.push('/');
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

