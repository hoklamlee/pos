import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Purchaser';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';
import PageHeader from '../../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class EditPurchaserPage extends React.Component {
    constructor(props) {
        super(props);

        const purchaserId = this.props.match.params.id;
        this.props.getPurchaserById(purchaserId);
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
        var location = event.target[1].value;
        var phoneNo = event.target[2].value;
        var contactPerson = event.target[3].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;
        const purchaserId = this.props.match.params.id;

        this.props.updatePurchaser(purchaserId,name, location, phoneNo, contactPerson, userId).then(success => {
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
                    right={<div style={{ display: 'inline', float: 'right' }}>Edit Purchaser</div>}
                />

                {
                    this.props.item ?
                        <ReactStrapFrom
                            onSubmit={this.submitForm}
                            fields={
                                [{
                                    label: "Name",
                                    type: "text",
                                    id: "Name",
                                    placeHolder: "",
                                    defaultValue: this.props.item.name
                                }, {
                                    label: "Location",
                                    type: "text",
                                    id: "Location",
                                    placeHolder: "",
                                    defaultValue: this.props.item.location

                                }
                                    , {
                                    label: "PhoneNo",
                                    type: "text",
                                    id: "PhoneNo",
                                    placeHolder: "",
                                    defaultValue: this.props.item.phoneNo
                                }, {
                                    label: "ContactPerson",
                                    type: "text",
                                    id: "ContactPerson",
                                    placeHolder: "",
                                    defaultValue: this.props.item.contactPerson

                                }]
                            } />

                        :
                        <div></div>
                }

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, item } = state.purchaser;
    return {
        loading, error, item
    };
}

const connectedEditPurchaserPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EditPurchaserPage);
export { connectedEditPurchaserPage as EditPurchaserPage };









