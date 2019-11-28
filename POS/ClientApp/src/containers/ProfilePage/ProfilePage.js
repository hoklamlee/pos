import React from 'react';

import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/User';
import config from 'react-global-configuration';
import MaterialPaper from '../../components/MaterialPaper';
import ReactStrapForm from '../../components/ReactStrapForm';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools, faInfo, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { history } from '../../helpers/history';


class ProfilePage extends React.Component {
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
        history.push("/login");
    }

    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <div style={{ marginLeft: '2vh', marginRight: '2vh'}}>

                <MaterialPaper header={<div><FontAwesomeIcon icon={faInfo} /> Basic Information</div>}>
                    <ReactStrapForm
                        onSubmit={this.submitInfo}
                        fields={
                            [{
                                label: "User Name",
                                type: "text",
                                id: "userName",
                                placeHolder: "",
                                defaultValue: this.props.user.username
                            }, {
                                label: "Email",
                                type: "email",
                                id: "email",
                                placeHolder: "",
                                defaultValue: this.props.user.email
                            }, {
                                label: "Last Name",
                                type: "text",
                                id: "lastName",
                                placeHolder: "",
                                defaultValue: this.props.user.lastName

                            }, {
                                label: "First Name",
                                type: "text",
                                id: "firstName",
                                placeHolder: "",
                                defaultValue: this.props.user.firstName
                            }]
                        } />
                </MaterialPaper>
                    </div>
                <div style={{ marginBottom: 20 }}></div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Button color="primary" style={{ width: '50%' }} onClick={() => this.logout()}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Button>
                 </Grid>

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

const connectedProfilePage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ProfilePage);
export { connectedProfilePage as ProfilePage };









