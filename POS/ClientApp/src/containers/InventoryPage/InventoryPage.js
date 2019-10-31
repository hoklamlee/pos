import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/User';
import config from 'react-global-configuration';

import EditableTable  from '../../components/AntTable';

class InventoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.submitInfo = this.submitInfo.bind(this);

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



    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <EditableTable />

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

const connectedInventoryPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(InventoryPage);
export { connectedInventoryPage as InventoryPage };









