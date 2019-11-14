import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/OrderItem';
import config from 'react-global-configuration';

import ReactStrapFrom from '../../components/ReactStrapForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import PageHeader from '../../components/PageHeader';

class AddOrderItemPage extends React.Component {
    constructor(props) {
        super(props);

        const orderId = this.props.match.params.id;
        this.state = { orderId: orderId };

        this.props.getInventoriesByCategory("All");

        this.submitForm = this.submitForm.bind(this);
        this.goBack = this.goBack.bind(this);


    }


    submitForm(event) {
        event.preventDefault();

        var inventory = event.target["inventory"].value;
        var price = event.target["price"].value;
        var quatity = event.target["quatity"].value;
        var remark = event.target["remark"].value;

        var userId = JSON.parse(localStorage.getItem('user')).userId;

        this.props.addOrderItem(this.state.orderId, inventory, price, quatity, remark, userId).then(success => {
            if (success) {
                this.props.history.push("/editorder/" + this.state.orderId);
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
                    right={<div style={{ display: 'inline', float: 'right' }}>New OrderItem</div>}
                />

                {this.props.inventories.length > 0 ?
                    <ReactStrapFrom
                        onSubmit={this.submitForm}
                        fields={
                            [{
                                label: "Inventory",
                                type: "select",
                                id: "inventory",
                                options: this.props.inventories,
                                placeHolder: ""
                            },
                            {
                                label: "Price",
                                type: "number",
                                id: "price",
                                placeHolder: ""
                            }, {
                                label: "Quatity",
                                type: "number",
                                id: "quatity",
                                placeHolder: ""
                            }
                                , {
                                label: "Remark",
                                type: "text",
                                id: "remark",
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
    const { loading, error, items, users, inventories } = state.orderItem;
    return {
        loading, error, items, users, inventories
    };
}

const connectedAddOrderItemPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddOrderItemPage);
export { connectedAddOrderItemPage as AddOrderItemPage };









