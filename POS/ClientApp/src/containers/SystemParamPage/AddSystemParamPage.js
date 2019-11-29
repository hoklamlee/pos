import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/SystemParam';
import config from 'react-global-configuration';

import ReactStrapFrom from '../../components/ReactStrapForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PageHeader from '../../components/PageHeader';

class AddSystemParamPage extends React.Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
        this.goBack = this.goBack.bind(this);
    }


    submitForm(event) {
        event.preventDefault();

        var name = event.target[0].value;
        var description = event.target[1].value;
        var type = event.target[2].value;
        var value = event.target[3].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;

        this.props.addSystemParam(name, description, type, value, userId).then(success => {
            if (success) {
                this.props.history.goBack();
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
                    right={<div style={{ display: 'inline', float: 'right' }}>New SystemParam</div>}
                />


                <ReactStrapFrom
                    onSubmit={this.submitForm}
                    fields={
                        [{
                            label: "Name",
                            type: "text",
                            id: "name",
                            placeHolder: ""
                        }, {
                            label: "Description",
                            type: "text",
                            id: "description",
                            placeHolder: ""
                        }
                            , {
                            label: "Type",
                            type: "text",
                            id: "type",
                            placeHolder: ""
                        }, {
                            label: "Value",
                            type: "text",
                            id: "value",
                            placeHolder: ""
                        }]
                    } />
            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items } = state.systemParam;
    return {
        loading, error, items
    };
}

const connectedAddSystemParamPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddSystemParamPage);
export { connectedAddSystemParamPage as AddSystemParamPage };









