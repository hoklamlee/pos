import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { actionCreators } from '../store/User';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)




