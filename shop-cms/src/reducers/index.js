import { combineReducers } from 'redux';
import { reducer as forms} from 'redux-form'

import orderReducer from './orderReducer'
import authReducer from './authReducer'

export default combineReducers({
    order: orderReducer, 
    auth: authReducer,
    form: forms,
});