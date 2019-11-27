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
import MaterialPaper from '../../components/MaterialPaper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPlus, faTrash, faPen, faTools, faHeart } from '@fortawesome/free-solid-svg-icons'
import { OrderPage } from './OrderPage';
import { FavouriteOrderPage } from './FavouriteOrderPage';
import { MonthlyOrderPage } from './MonthlyOrderPage';

class OrderTab extends React.Component {
    constructor(props) {
        super(props);

        this.props.getAllOrders();
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
            },
            {
                label: 'Monthly Orders',
                component: <MonthlyOrderPage />
            }
        ]

        return (
            <div>
                    <MaterialUITab
                        tabs={tabs}
                    />
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









