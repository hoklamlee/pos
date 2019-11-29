import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/OrderItem';
import config from 'react-global-configuration';

import MaterialTable from 'material-table';
import { Paper, Box, Typography, Chip, Divider } from '@material-ui/core';


import RightBottomButton from '../../components/RightBottomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools } from '@fortawesome/free-solid-svg-icons'
import { history } from '../../helpers/history';

class OrderItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.GetOrderItemsByOrderId(props.orderId);

        //this.submitInfo = this.submitInfo.bind(this);
        this.delete = this.delete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }



    handleUpdate(key) {
        history.push("/editorderitem/" + key);
    }

    delete(rowData) {
        if (window.confirm(`Are you sure delete ` + rowData.name)) {
            this.props.deleteOrderItem(rowData.orderItemId);
        }        //console.log(key);
    }

    render() {



        const columns = [
            {
                title: 'Inventory',
                field: 'inventory.name'
            },
            {
                title: 'Price',
                field: 'price'
            },
            {
                title: 'Quatity',
                field: 'quatity'

            },
            {
                title: 'Remark',
                field: 'remark'
            }
        ]

        return (
            <div style={{ width: '100%' }}>

                <MaterialTable
                    title="Order Item"
                    columns={columns}
                    data={this.props.items}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => {
                                //alert('You are editing ' + rowData.name);
                                this.handleUpdate(rowData.orderItemId);
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete User',
                            onClick: (event, rowData) => { this.delete(rowData) }
                        }
                    ]}
                    components={{
                        Container: props => <Paper {...props} elevation={0} />
                    }}
                />


            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items, totalPrice } = state.orderItem;
    return {
        loading, error, items, totalPrice
    };
}

const connectedOrderItemPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(OrderItemPage);
export { connectedOrderItemPage as OrderItemPage };









