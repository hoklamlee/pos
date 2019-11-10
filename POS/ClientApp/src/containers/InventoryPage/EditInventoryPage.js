import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Inventory';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';
import PageHeader from '../../components/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Divider } from '@material-ui/core';
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

class EditInventoryPage extends React.Component {
    constructor(props) {
        super(props);

        const inventoryId = this.props.match.params.id;
        console.log(inventoryId);

        this.props.getInventoryById(inventoryId);

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
        var category = event.target[1].value;
        var description = event.target[2].value;
        var price = event.target[3].value;
        var quatity = event.target[4].value;
        var unit = event.target[5].value
        var userId = JSON.parse(localStorage.getItem('user')).userId;
        const inventoryId = this.props.match.params.id;

        this.props.updateInventory(inventoryId, name, description, Number(quatity), unit, Number(price), category, userId).then(success => {
            if (success) {
                this.props.history.push("/inventory");
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
                    right={<div style={{ display: 'inline', float: 'right' }}>Edit Inventory</div>}
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
                                    label: "Category",
                                    type: "text",
                                    id: "category",
                                    placeHolder: "",
                                    defaultValue: this.props.item.category
                                }, {
                                    label: "Description",
                                    type: "textarea",
                                    id: "description",
                                    placeHolder: "",
                                    defaultValue: this.props.item.description

                                }, {
                                    label: "Price",
                                    type: "number",
                                    id: "price",
                                    placeHolder: "",
                                    defaultValue: this.props.item.price
                                }, {
                                    label: "Quatity",
                                    type: "number",
                                    id: "quatity",
                                    placeHolder: "",
                                    defaultValue: this.props.item.quatity

                                }, {
                                    label: "Unit",
                                    type: "text",
                                    id: "unit",
                                    placeHolder: "",
                                    defaultValue: this.props.item.unit,
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
    const { loading, error, item } = state.inventory;
    return {
        loading, error, item
    };
}

const connectedEditInventoryPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(EditInventoryPage);
export { connectedEditInventoryPage as EditInventoryPage };









