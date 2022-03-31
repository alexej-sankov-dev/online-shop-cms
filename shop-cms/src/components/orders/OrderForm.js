import React from 'react';
import {Field, reduxForm} from 'redux-form';

class OrderForm extends React.Component{

    renderError({error, touched}) {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="clientname" component={this.renderInput} label="Enter Name of Client" />
                <Field name="address" component={this.renderInput} label="Enter Address" />
                <Field name="contact" component={this.renderInput} label="Enter Contact" />
                <Field name="sum" component={this.renderInput} label="Enter Sum" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.clientname) {
        errors.clientname = 'You must enter a name'
    }

    if(!formValues.address) {
        errors.address = 'You must enter a address'
    }

    if(!formValues.contact) {
        errors.contact = 'You must enter contact info'
    }

    if(!formValues.sum) {
        errors.sum = 'You must enter a sum'
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(OrderForm);