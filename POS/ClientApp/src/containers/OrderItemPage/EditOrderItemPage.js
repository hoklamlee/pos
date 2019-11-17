import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/OrderItem';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';
import PageHeader from '../../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class EditOrderItemPage extends React.Component {
    constructor(props) {
        super(props);

        const orderItemId = this.props.match.params.id;

        this.props.getInventoriesByCategory("All");

        this.props.getOrderItemById(orderItemId);


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

        var inventoryId = event.target["inventoryId"].value;
        var quatity = event.target["quatity"].value;
        var remark = event.target["remark"].value;


        var userId = JSON.parse(localStorage.getItem('user')).userId;
        const orderItemId = this.props.match.params.id;

        this.props.updateOrderItem(orderItemId, inventoryId, quatity, remark, userId).then(success => {
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
                    right={<div style={{ display: 'inline', float: 'right' }}>Edit OrderItem</div>}
                />

                {this.props.item?
                    <ReactStrapFrom
                        onSubmit={this.submitForm}
                        fields={
                            [{
                                label: "Inventory",
                                type: "select",
                                id: "inventoryId",
                                options: this.props.inventories,
                                placeHolder: "",
                                defaultValue: this.props.item.inventoryId
                            }, {
                                    label: "Quatity",
                                    type: "number",
                                    id: "quatity",
                                    placeHolder: "",
                                    defaultValue: this.props.item.quatity

                                }
                                , {
                                    label: "Remark",
                                    type: "text",
                                    id: "remark",
                                    placeHolder: "",
                                    defaultValue: this.props.item.remark
                                }]
                        } />

                    :

                    <div></div>}

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, item, users, purchasers, inventories } = state.orderItem;
    return {
        loading, error, item, users, purchasers, inventories
    };
}

const connectedEditOrderItemPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EditOrderItemPage);
export { connectedEditOrderItemPage as EditOrderItemPage };









