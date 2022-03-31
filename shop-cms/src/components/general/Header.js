import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import GoogleAuth from './GoogleAuth';

class Header extends React.Component {


    renderMyOdersBtn() {
        if(this.props.currentUserId) {
            return (
            <Link to="/my-orders" className="item">
                My orders
            </Link>
            );
        }
    }
    
    renderCreateBtn() {
        if(this.props.currentUserId) {
            return (
            <Link to="/create-order" className="item">
                Create Order
            </Link>
            );
        }
    }

    render() {
        return (
            <div className="ui menu">
                <Link to="/" className="header item">
                    CMS SHOP
                </Link>
                <Link to="/" className="item">
                        All orders
                </Link>
                <div className="right menu">
                    {this.renderMyOdersBtn()}
                    {this.renderCreateBtn()}
                    <GoogleAuth />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentUserId: state.auth.userId
    };
};

export default connect(mapStateToProps)(Header);