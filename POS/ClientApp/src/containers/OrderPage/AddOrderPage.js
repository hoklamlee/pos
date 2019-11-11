import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Order';
import config from 'react-global-configuration';

import ReactStrapFrom from '../../components/ReactStrapForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PageHeader from '../../components/PageHeader';

class AddOrderPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getAllUsers();
        this.props.getAllPurchasers();

        this.submitForm = this.submitForm.bind(this);
        this.goBack = this.goBack.bind(this);
    }


    submitForm(event) {
        event.preventDefault();

        var orderDate = event.target["orderDate"].value;
        var remark = event.target["remark"].value;
        var deliverBy = event.target["deliverBy"].value;
        var deliverDate = event.target["deliverDate"].value;
        var shop = event.target["purchaser"].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;

        this.props.addOrder(orderDate, remark, deliverBy, deliverDate, shop, userId).then(success => {
            if (success) {
                this.props.history.push("/order");
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
                    right={<div style={{ display: 'inline', float: 'right' }}>New Order</div>}
                />

                {this.props.users.length > 0 && this.props.purchasers.length > 0 ?
                    <ReactStrapFrom
                        onSubmit={this.submitForm}
                        fields={
                            [{
                                label: "Order Date",
                                type: "datetime",
                                id: "orderDate",
                                placeHolder: ""
                            }, {
                                label: "Remark",
                                type: "text",
                                id: "remark",
                                placeHolder: ""
                            }
                                , {
                                label: "Deliver By",
                                type: "select",
                                id: "deliverBy",
                                options: this.props.users,
                                placeHolder: ""
                            }, {
                                label: "Deliver Date",
                                type: "datetime",
                                id: "deliverDate",
                                placeHolder: ""
                            }, {
                                label: "Shop",
                                type: "select",
                                options: this.props.purchasers,
                                id: "purchaser",
                                placeHolder: ""
                            }]
                        } />

                    :

                    <div></div>}


            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items, users, purchasers } = state.order;
    return {
        loading, error, items, users, purchasers
    };
}

const connectedAddOrderPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddOrderPage);
export { connectedAddOrderPage as AddOrderPage };









