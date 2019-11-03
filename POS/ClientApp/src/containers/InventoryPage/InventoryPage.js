import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Inventory';
import config from 'react-global-configuration';


import AddInventoryPage from './AddInventoryPage';
import EditableTable  from '../../components/AntTable';



class InventoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.getInventoriesByCategory("All");

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



    render() {

        return (
            <div style={{ marginTop: '2vh' }}>
                <EditableTable
                    addItemURL="/createinventory"
                    dataSource={this.props.items}
                    columns={
                        [
                            {
                                title: 'name',
                                dataIndex: 'name',
                                width: '30%',
                                //editable: true,
                                //fixed: 'left',
                            },
                            {
                                title: 'category',
                                dataIndex: 'category',
                                width: '100',
                        },
                        {
                            title: 'description',
                            dataIndex: 'description',
                            width: '100',

                        },
                        {
                            title: 'price',
                            dataIndex: 'price',
                            width: '100',

                        },
                        {
                            title: 'quatity',
                            dataIndex: 'quatity',
                            width: '100',

                        },
                        {
                            title: 'unit',
                            dataIndex: 'unit',
                            width: '100',

                            }
                    ]
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

const connectedInventoryPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(InventoryPage);
export { connectedInventoryPage as InventoryPage };









