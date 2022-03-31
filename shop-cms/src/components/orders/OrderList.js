import React from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {fetchOrders} from "../../actions";
import './OrderList.css';


class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true }
    }
    
    componentDidMount() {
        this.props.fetchOrders().then(() => this.setState({loading: false}));
    }

    renderList() {
        if (this.state.loading) {
            return (<div></div>);
        } else {
            return this.props.orders.map( order => 

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
                    </div>
                </div>
            );
        }
        

    }

    render() {
        return (
            <div>
                <h2>Orders</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let values = undefined
    if (state.order.orders) {
        values = Object.values(state.order.orders)
    }
    return {
        orders: values,
        currentUserId: state.auth.userId,
    };
};

export default connect(mapStateToProps, {fetchOrders})(OrderList);