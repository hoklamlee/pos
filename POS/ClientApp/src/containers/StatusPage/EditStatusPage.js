import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Status';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';
import PageHeader from '../../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class EditStatusPage extends React.Component {
    constructor(props) {
        super(props);

        const statusId = this.props.match.params.id;
        console.log(statusId);

        this.props.getStatusById(statusId);

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

        var category = event.target[0].value;
        var code = event.target[1].value;
        var description = event.target[2].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;
        const statusId = this.props.match.params.id;

        this.props.updateStatus(statusId, category, code, description, userId).then(success => {
            if (success) {
                this.props.history.push("/status");
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
                    right={<div style={{ display: 'inline', float: 'right' }}>Edit Status</div>}
                />

                {
                    this.props.item ?
                        <ReactStrapFrom
                            onSubmit={this.submitForm}
                            fields={
                                [{
                                    label: "Category",
                                    type: "text",
                                    id: "category",
                                    placeHolder: "",
                                    defaultValue: this.props.item.category
                                }, {
                                    label: "Code",
                                    type: "text",
                                    id: "code",
                                    placeHolder: "",
                                    defaultValue: this.props.item.code
                                }
                                    , {
                                    label: "Description",
                                    type: "textarea",
                                    id: "description",
                                    placeHolder: "",
                                    defaultValue: this.props.item.description
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
    const { loading, error, item } = state.status;
    return {
        loading, error, item
    };
}

const connectedEditStatusPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EditStatusPage);
export { connectedEditStatusPage as EditStatusPage };









