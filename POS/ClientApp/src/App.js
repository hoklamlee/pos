import React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';
import config from 'react-global-configuration';
import configuration from './config/config';
import { history } from './helpers/history';
import { actionCreators } from './store/Alert';
import { PrivateRoute } from './components/PrivateRoute';

import Layout from './components/Layout';
import Home from './containers/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import { LoginPage } from './containers/LoginPage';
import { ProfilePage } from './containers/ProfilePage/ProfilePage';

import { OrderPage } from './containers/OrderPage/OrderPage';
import { AddOrderPage } from './containers/OrderPage/AddOrderPage';
import { EditOrderPage } from './containers/OrderPage/EditOrderPage';

import { OrderItemPage } from './containers/OrderItemPage/OrderItemPage';
import { AddOrderItemPage } from './containers/OrderItemPage/AddOrderItemPage';
import { EditOrderItemPage } from './containers/OrderItemPage/EditOrderItemPage';

import { InventoryPage } from './containers/InventoryPage/InventoryPage';
import { AddInventoryPage } from './containers/InventoryPage/AddInventoryPage';
import { EditInventoryPage } from './containers/InventoryPage/EditInventoryPage';

import { PurchaserPage } from './containers/PurchaserPage/PurchaserPage';
import { AddPurchaserPage } from './containers/PurchaserPage/AddPurchaserPage';
import { EditPurchaserPage } from './containers/PurchaserPage/EditPurchaserPage';

import { StatusPage } from './containers/StatusPage/StatusPage';
import { AddStatusPage } from './containers/StatusPage/AddStatusPage';
import { EditStatusPage } from './containers/StatusPage/EditStatusPage';


import { SiteSittingPage } from './containers/SiteSettingPage/SiteSittingPage';


import 'antd/dist/antd.css';


const alertStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
}

class App extends React.Component {
    constructor(props) {
        super(props);


        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(actionCreators.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div style={{height: '100vh'}}>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                />
                {alert.message &&
                    <div style={alertStyle} className={`alert ${alert.type}`}>{alert.message}</div>
                }

                <Router history={history}>
                    <Layout>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path='/counter' component={Counter} />

                        <PrivateRoute path='/order' component={OrderPage} />
                        <PrivateRoute path='/createorder' component={AddOrderPage} />
                        <PrivateRoute path='/editorder/:id' component={EditOrderPage} />

                        <PrivateRoute path='/orderitem' component={OrderItemPage} />
                        <PrivateRoute path='/createorderitem/:id' component={AddOrderItemPage} />
                        <PrivateRoute path='/editorderitem/:id' component={EditOrderItemPage} />

                        <PrivateRoute path='/inventory' component={InventoryPage} />
                        <PrivateRoute path='/createinventory' component={AddInventoryPage} />
                        <PrivateRoute path='/editinventory/:id' component={EditInventoryPage} />

                        <PrivateRoute path='/purchaser' component={PurchaserPage} />
                        <PrivateRoute path='/createpurchaser' component={AddPurchaserPage} />
                        <PrivateRoute path='/editpurchaser/:id' component={EditPurchaserPage} />

                        <PrivateRoute path='/profile' component={ProfilePage} />
                        <PrivateRoute path='/fetch-data/:startDateIndex?' component={FetchData} />

                        <PrivateRoute path='/sitesetting' component={SiteSittingPage} />

                        <PrivateRoute path='/status' component={StatusPage} />
                        <PrivateRoute path='/createstatus' component={AddStatusPage} />
                        <PrivateRoute path='/editstatus/:id' component={EditStatusPage} />

                        
                    </Layout>
                </Router >


            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 