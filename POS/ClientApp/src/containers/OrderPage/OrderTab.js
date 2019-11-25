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
import MaterialUITab from '../../components/MaterialUITab';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPlus, faTrash, faPen, faTools, faHeart } from '@fortawesome/free-solid-svg-icons'
import { OrderPage } from './OrderPage';
import { FavouriteOrderPage } from './FavouriteOrderPage';

class OrderTab extends React.Component {
    constructor(props) {
        super(props);

        this.props.getAllOrders();

        //this.submitInfo = this.submitInfo.bind(this);
        this.delete = this.delete.bind(this);
        this.handeCreate = this.handeCreate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }


    handeCreate() {
        //this.props.history.push("/createorder");
        this.props.history.push("/createorder");
    }

    handleUpdate(key) {
        this.props.history.push("/editorder/" + key);
    }

    delete(rowData) {
        if (window.confirm(`Are you sure delete ` + rowData.name)) {
            this.props.deleteOrder(rowData.orderId);
        }        //console.log(key);
    }

    render() {



        const tabs = [
            {
                label: 'All Orders',
                component: <OrderPage />
            },
            {
                label: 'Favourite Orders',
                component: <FavouriteOrderPage />
            }
        ]

        return (
            <div style={{ marginTop: '2vh', width: '100%' }}>

                <MaterialUITab
                    tabs={tabs}
                />

                <RightBottomButton label="Create" handleClick={this.handeCreate}><FontAwesomeIcon icon={faPlus} /></RightBottomButton>

            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loading, error, items } = state.order;
    return {
        loading, error, items
    };
}

const connectedOrderTab = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(OrderTab);
export { connectedOrderTab as OrderTab };









