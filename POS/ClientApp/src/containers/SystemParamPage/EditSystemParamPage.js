import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/SystemParam';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';
import PageHeader from '../../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class EditSystemParamPage extends React.Component {
    constructor(props) {
        super(props);

        const systemParamId = this.props.match.params.id;
        console.log(systemParamId);

        this.props.getSystemParamById(systemParamId);

        this.submitForm = this.submitForm.bind(this);
        this.goBack = this.goBack.bind(this);

        //this.submitInfo = this.submitInfo.bind(this);

    }




    //submitInfo(event) {
    //    event.preventDefault();

    //    var userId = this.props.user.userId;
    //    var username = event.target[0].value;
    //    var email = event.target[1].value;
    //    var lastName = event.target[2].value;
    //    var firstName = event.target[3].value;
    //    console.log(userId, firstName, lastName, email, username);
    //    this.props.updateUserInfo(userId, firstName, lastName, email, username);
    //}

    submitForm(event) {
        event.preventDefault();

        var name = event.target[0].value;
        var description = event.target[1].value;
        var type = event.target[2].value;
        var value = event.target[3].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;
        const systemParamId = this.props.match.params.id;

        this.props.updateSystemParam(systemParamId, name, description,type,value, userId).then(success => {
            if (success) {
                this.props.history.goBack();
            }
        })
    }

    goBack() {
        this.props.history.goBack();
    }

    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <PageHeader
                    left={<div style={{ display: 'inline', float: 'left' }}><a style={{ marginBottom: 10 }} onClick={this.goBack}><FontAwesomeIcon icon={faArrowLeft} /> Back</a></div>}
                    right={<div style={{ display: 'inline', float: 'right' }}>Edit SystemParam</div>}
                />

                {
                    this.props.item ?
                        <ReactStrapFrom
                            onSubmit={this.submitForm}
                            fields={
                                [{
                                    label: "Name",
                                    type: "text",
                                    id: "name",
                                    placeHolder: "",
                                    defaultValue: this.props.item.name
                                }, {
                                    label: "Description",
                                    type: "text",
                                    id: "description",
                                    placeHolder: "",
                                    defaultValue: this.props.item.description
                                }
                                    , {
                                    label: "Type",
                                    type: "text",
                                    id: "type",
                                    placeHolder: "",
                                    defaultValue: this.props.item.type
                                }, {
                                    label: "Value",
                                    type: "text",
                                    id: "value",
                                    placeHolder: "",
                                    defaultValue: this.props.item.value
                                }]
                            }
                        />
                        :
                        <div></div>
                }

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, item } = state.systemParam;
    return {
        loading, error, item
    };
}

const connectedEditSystemParamPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EditSystemParamPage);
export { connectedEditSystemParamPage as EditSystemParamPage };









