import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Purchaser';
import config from 'react-global-configuration';

import ReactStrapFrom from '../../components/ReactStrapForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider,Paper } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PageHeader from '../../components/PageHeader';

class AddPurchaserPage extends React.Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.goBack = this.goBack.bind(this);
    }


    submitForm(event) {
        event.preventDefault();

        var name = event.target[0].value;
        var location = event.target[1].value;
        var phoneNo = event.target[2].value;
        var contactPerson = event.target[3].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;

        this.props.addPurchaser(name, location, phoneNo, contactPerson, userId).then(success => {
            if (success) {
                this.props.history.push("/purchaser");
            }
        });
    }

    goBack() {
        this.props.history.goBack();
    }


    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <PageHeader
                    left={<div style={{ display: 'inline', float: 'left' }}><a style={{ marginBottom: 10 }} onClick={this.goBack}><FontAwesomeIcon icon={faArrowLeft} /> Back</a></div>}
                    right={<div style={{ display: 'inline', float: 'right' }}>New Purchaser</div>}
                />

                <Paper style={{ marginLeft: '2vh', marginRight: '2vh' }}>

                <ReactStrapFrom
                    onSubmit={this.submitForm}
                    fields={
                        [{
                            label: "Name",
                            type: "text",
                            id: "Name",
                            placeHolder: ""
                        }, {
                            label: "Location",
                            type: "text",
                            id: "Location",
                            placeHolder: ""
                        }
                            , {
                            label: "PhoneNo",
                            type: "text",
                            id: "PhoneNo",
                            placeHolder: ""
                        }, {
                            label: "ContactPerson",
                            type: "text",
                            id: "ContactPerson",
                            placeHolder: ""
                        }]
                        } />
                    </Paper>
            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items } = state.purchaser;
    return {
        loading, error, items
    };
}

const connectedAddPurchaserPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddPurchaserPage);
export { connectedAddPurchaserPage as AddPurchaserPage };









