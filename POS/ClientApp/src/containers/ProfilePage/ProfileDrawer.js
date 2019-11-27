import React from 'react';

import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/User';
import config from 'react-global-configuration';
import MaterialPaper from '../../components/MaterialPaper';
import ReactStrapForm from '../../components/ReactStrapForm';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools, faInfo, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import VerticalTabs from '../../components/VerticalTabs';
import { UpdatePassword } from './UpdatePassword';
import { ProfilePage } from './ProfilePage';

class ProfileDrawer extends React.Component {
    constructor(props) {
        super(props);

        this.submitInfo = this.submitInfo.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.logout = this.logout.bind(this);
    }




    submitInfo(event) {
        event.preventDefault();

        var userId = this.props.user.userId;
        var username = event.target[0].value;
        var email = event.target[1].value;
        var lastName = event.target[2].value;
        var firstName = event.target[3].value;
        console.log(userId, firstName, lastName, email, username);
        this.props.updateUserInfo(userId, firstName, lastName, email, username);
    }

    submitPassword(event) {
        event.preventDefault();

        var userId = this.props.user.userId;
        var password = event.target[0].value;
        var passwordConfirm = event.target[1].value;


        this.props.updatePassword(userId, password, passwordConfirm);
    }

    logout() {
        this.props.history.push("/login");
    }

    render() {
        const tabs = [
            {
                label: 'Profile',
                component: <ProfilePage />
            },
            {
                label: 'Update Password',
                component: <UpdatePassword />
            }
        ]

        return (
            <div style={{ marginTop: '2vh' }}>
                <VerticalTabs tabs={tabs}/>

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    return {
        loggingIn, user
    };
}

const connectedProfileDrawer = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ProfileDrawer);
export { connectedProfileDrawer as ProfileDrawer };









