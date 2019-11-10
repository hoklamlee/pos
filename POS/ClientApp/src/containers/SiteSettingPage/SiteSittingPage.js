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
import { faCoffee, faPlus, faTrash, faPen, faTools, faInfo, faKey, faSignOutAlt, faList, faUser } from '@fortawesome/free-solid-svg-icons'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MenuButton from '../../components/MenuButton';

class SiteSittingPage extends React.Component {
    constructor(props) {
        super(props);

        this.submitInfo = this.submitInfo.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.redirectToStatusPage = this.redirectToStatusPage.bind(this);
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

    redirectToStatusPage() {
        this.props.history.push("/status");

    }

    logout() {
        this.props.history.push("/login");
    }

    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <h5 style={{ marginBottom: 20 }}>Site Setting</h5>

                <Grid container spacing={5}>

                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <MenuButton name="Status" icon={<FontAwesomeIcon icon={faList} />} handleClick={this.redirectToStatusPage}/>
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <MenuButton name="Permission" icon={<FontAwesomeIcon icon={faList}  />} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <MenuButton name="Site Member" icon={<FontAwesomeIcon icon={faList} />} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <MenuButton name="Menu Setting" icon={<FontAwesomeIcon icon={faList} />} />
                    </Grid>
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                        <MenuButton name="Inventory" icon={<FontAwesomeIcon icon={faList} />} />
                    </Grid>
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

const connectedSiteSittingPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SiteSittingPage);
export { connectedSiteSittingPage as SiteSittingPage };









