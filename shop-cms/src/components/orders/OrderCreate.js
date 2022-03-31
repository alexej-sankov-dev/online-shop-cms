import React from 'react';
import {connect} from "react-redux";
import { useNavigate } from "react-router-dom";

import {createOrder} from "../../actions";
import OrderForm from './OrderForm';

class OrderCreateC extends React.Component{

    onSubmit = (formValues) => {
        this.props.createOrder({...formValues, ownerid: this.props.userId});
        this.props.history('/');
    };

    render() {
        if(this.props.userId) {
            return (
                <div>
                    <h3>Create an Order</h3>
                    <OrderForm onSubmit={this.onSubmit} />
                </div>
    
            );
        } else {
            return (<div>Login first please</div>);
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        userId : state.auth.userId
    }
}

let OrderCreate = connect(mapStateToProps, {createOrder})(OrderCreateC);
export default (props) => (
    <OrderCreate history={useNavigate()} />
);