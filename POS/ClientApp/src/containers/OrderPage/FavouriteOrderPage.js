import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Order';
import config from 'react-global-configuration';

import MaterialTable from 'material-table';
import { Paper, Grid } from '@material-ui/core';
import RightBottomButton from '../../components/RightBottomButton';
import MaterialUIButton from '../../components/MaterialUIButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPlus, faTrash, faPen, faTools , faHeart} from '@fortawesome/free-solid-svg-icons'
import { history } from '../../helpers/history';

class FavouriteOrderPage extends React.Component {
    constructor(props) {
        super(props);

        const userId = JSON.parse(localStorage.getItem('user')).userId;

        this.state = {
            userId: userId
        };

        this.props.getFavouriteOrders(userId);

        //this.submitInfo = this.submitInfo.bind(this);
        this.delete = this.delete.bind(this);
        this.handeCreate = this.handeCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handeCreate() {
        //this.props.history.push("/createorder");
        history.push("/createorder");
    }

    handleUpdate(key) {
        history.push("/editorder/" + key);
    }

    delete(rowData) {
        if (window.confirm(`Are you sure delete ` + rowData.name)) {
            this.props.deleteOrder(rowData.orderId);
        }        //console.log(key);
    }

    render() {

        const columns = [
            {
                title: 'Order Date',
                field: 'orderDate'
            },
            {
                title: 'Remark',
                field: 'remark'
            },
            {
                title: 'Deliver By',
                field: 'deliverBy.displayName'

            },
            {
                title: 'Deliver Date',
                field: 'deliverDate'
            },
            {
                title: 'Status',
                field: 'status.code'
            },
            {
                title: 'Shop',
                field: 'purchaser.name'
            },
            {
                title: 'Total Price',
                field: 'totalPrice'
            }
        ]

        return (
            <div style={{ marginTop: '2vh', width: '100%' }}>
                <MaterialTable
                    title="Favourite Orders"
                    columns={columns}
                    data={this.props.favouriteOrders}
                    options={{
                        exportButton: true
                    }}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => {
                                //alert('You are editing ' + rowData.name);
                                this.handleUpdate(rowData.orderId);
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

                <RightBottomButton label="Create" handleClick={this.handeCreate}><FontAwesomeIcon icon={faPlus} /></RightBottomButton>

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items, favouriteOrders } = state.order;
    return {
        loading, error, items, favouriteOrders
    };
}

const connectedFavouriteOrderPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FavouriteOrderPage);
export { connectedFavouriteOrderPage as FavouriteOrderPage };









