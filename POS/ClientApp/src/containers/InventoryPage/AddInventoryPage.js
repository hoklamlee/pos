import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Inventory';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';


class AddInventoryPage extends React.Component {
    constructor(props) {
        super(props);

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

        this.props.addInventory(name, description, Number(quatity), unit, Number(price), category, userId).then(success => {
            if (success) {
                this.props.history.push("/inventory");
            }
        });
    }

    goBack() {
        this.props.history.goBack();
    }


    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <Button onClick={this.goBack}>Go Back</Button>

                <ReactStrapFrom
                    onSubmit={this.submitForm}
                    fields={
                        [{
                            label: "Name",
                            type: "text",
                            id: "name",
                            placeHolder: ""
                        }, {
                            label: "Category",
                            type: "text",
                            id: "category",
                            placeHolder: ""
                        }
                            , {
                            label: "Description",
                            type: "textarea",
                            id: "description",
                            placeHolder: ""
                        }, {
                            label: "Price",
                            type: "number",
                            id: "price",
                            placeHolder: ""
                        },
                        {
                            label: "Quatity",
                            type: "number",
                            id: "quatity",
                            placeHolder: ""
                        },
                        {
                            label: "Unit",
                            type: "text",
                            id: "unit",
                            placeHolder: ""
                        }]
                    } />
            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items } = state.inventory;
    return {
        loading, error, items
    };
}

const connectedAddInventoryPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddInventoryPage);
export { connectedAddInventoryPage as AddInventoryPage };









