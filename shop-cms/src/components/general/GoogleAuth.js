import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signIn, signOut } from  '../../actions';

class GoogleAuthC extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '284367183567-on8o315hgl0ce948c78l6f6dr82sc8o6.apps.googleusercontent.com',
                scope: 'email'
            }).then(() =>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
        this.props.history('/');
    };

    renderAuthButton() {
        if(this.props.currentUserId) {
            return (
                <button onClick={this.onSignOutClick} className="ui primary google button">
                    <i className="google icon"/>
                    Logout
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Login
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {currentUserId: state.auth.userId};
};

let GoogleAuth = connect(mapStateToProps, {signIn, signOut})(GoogleAuthC);
export default (props) => (
    <GoogleAuth history={useNavigate()} />
);