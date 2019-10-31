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
import { InventoryPage } from './containers/InventoryPage/InventoryPage';


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
            <div>

                {alert.message &&
                    <div style={alertStyle} className={`alert ${alert.type}`}>{alert.message}</div>
                }

                <Router history={history}>
                    <Layout>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path='/counter' component={Counter} />
                        <PrivateRoute path='/inventory' component={InventoryPage} />
                        <PrivateRoute path='/profile' component={ProfilePage} />
                        <PrivateRoute path='/fetch-data/:startDateIndex?' component={FetchData} />
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