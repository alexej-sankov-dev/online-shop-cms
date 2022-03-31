import React from 'react';
import {connect} from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import {fetchOrdersByUserId, editOrder} from "../../actions";
import Select from 'react-select'
import './OrderList.css';


class MyOrderListC extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }

    componentDidMount() {
        if(this.props.currentUserId) {
            this.props.fetchOrdersByUserId(this.props.currentUserId).then(() => this.setState({loading: false}));
        } else {
            
        }
    }

    changeHandler = (e, orderid) => {
        console.log(orderid)
        this.props.editOrder(orderid, {status: e.value, userid: this.props.currentUserId})
        this.props.history('/');

    };

    renderList() {
        if (this.props.currentUserId) {
            if (this.state.loading) {
                return (<div></div>);
            } else {
    
                const options = [
                    { value: 'processing', label: 'Processing' },
                    { value: 'assembly', label: 'Assembly' },
                    { value: 'delivery', label: 'Delivery' },
                    { value: 'canceled', label: 'Canceled' },
                    { value: 'completed', label: 'Completed' }
                ];
                
                
                return this.props.ordersowner.map( order => 
    
                    <div className="item" key={order.orderid}>
                        <div className="content">
                            <Link to={`/`} className="header order-top">Order {order.orderid}</Link>
                            <div className="description order-info">
                                <div>Client Name: {order.clientname}</div>
                                <div>Address: {order.address}</div>
                                <div>Contact: {order.contact}</div>
                                <div>OrderId: {order.orderid}</div>
                                <div>Sum: {order.sum} $</div>
                                <div>Status: {order.status}</div>
                            </div>
                            <div>
                                <div class="order-select-t">
                                    Change order status to:
                                </div>
                                <Select
                                    className="order-select" 
                                    value={options.find(item => item.value === order.status)}
                                    onChange={(e) => this.changeHandler(e, order.orderid)}
                                    options={options}
                                />
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            return (<div>Login first please</div>);
        }
    }

    render() {
        return (
            <div>
                <h2>My Orders</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let values = undefined
    if (state.order.ordersowner) {
        values = Object.values(state.order.ordersowner)
    }
    return {
        ordersowner: values,
        currentUserId: state.auth.userId,
    };
};

let MyOrderList = connect(mapStateToProps, {fetchOrdersByUserId, editOrder})(MyOrderListC);
export default (props) => (
    <MyOrderList history={useNavigate()} />
);