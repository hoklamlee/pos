import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link ,Redirect} from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Inventory';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';


class AddInventoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getInventoriesByCategory("All");
        this.submitForm = this.submitForm.bind(this);
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

        var newItem = {
            name: event.target[0].value,
            category: event.target[1].value,
            description: event.target[2].value,
            price: event.target[3].value,
            quatity: event.target[4].value,
            unit: event.target[5].value
        }

        console.log(newItem);
        this.props.history.push("/inventory");
    }

    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
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









