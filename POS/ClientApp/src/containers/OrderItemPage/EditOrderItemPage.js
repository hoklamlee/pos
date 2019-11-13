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

        this.props.getAllUsers();
        this.props.getAllPurchasers();
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

        var orderItemDate = event.target["orderItemDate"].value;
        var remark = event.target["remark"].value;
        var deliverBy = event.target["deliverBy"].value;
        var deliverDate = event.target["deliverDate"].value;
        var shop = event.target["purchaser"].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;
        const orderItemId = this.props.match.params.id;

        this.props.updateOrderItem(orderItemId, orderItemDate, remark, deliverBy, deliverDate, shop, userId).then(success => {
            if (success) {
                this.props.history.push("/orderItem");
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

                {this.props.users.length > 0 && this.props.purchasers.length > 0 && this.props.item?
                    <ReactStrapFrom
                        onSubmit={this.submitForm}
                        fields={
                            [{
                                label: "OrderItem Date",
                                type: "datetime",
                                id: "orderItemDate",
                                placeHolder: "",
                                defaultValue: this.props.item.orderItemDate
                            }, {
                                label: "Remark",
                                type: "text",
                                id: "remark",
                                placeHolder: "",
                                defaultValue: this.props.item.remark
                            }
                                , {
                                label: "Deliver By",
                                type: "select",
                                id: "deliverBy",
                                options: this.props.users,
                                    placeHolder: "",
                                    defaultValue: this.props.item.deliverById ? String(this.props.item.deliverById) : ""
                            }, {
                                label: "Deliver Date",
                                type: "datetime",
                                id: "deliverDate",
                                placeHolder: "",
                                defaultValue: this.props.item.deliverDate

                            }, {
                                label: "Shop",
                                type: "select",
                                options: this.props.purchasers,
                                id: "purchaser",
                                placeHolder: "",
                                    defaultValue: this.props.item.purchaserId ? String(this.props.item.purchaserId) : ""

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









