import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/OrderItem';
import config from 'react-global-configuration';

import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import RightBottomButton from '../../components/RightBottomButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools } from '@fortawesome/free-solid-svg-icons'

class OrderItemPage extends React.Component {
    constructor(props) {
        super(props);

        this.props.GetOrderItemsByOrderId(props.orderId);

        //this.submitInfo = this.submitInfo.bind(this);
        this.delete = this.delete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }



    handleUpdate(key) {
        this.props.history.push("/editorderItem/" + key);
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
                title: 'Remark',
                field: 'price'
            },
            {
                title: 'Deliver By',
                field: 'quatity'

            },
            {
                title: 'Deliver Date',
                field: 'remark'
            }
        ]

        return (
            <div style={{ marginTop: '2vh', width: '100%' }}>
                <MaterialTable
                    title="OrderItem"
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
    const { loading, error, items } = state.orderItem;
    return {
        loading, error, items
    };
}

const connectedOrderItemPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(OrderItemPage);
export { connectedOrderItemPage as OrderItemPage };









