import React from 'react';
import { Router, Route } from 'react-router';
import { connect } from 'react-redux';

import { history } from './helpers/history';
import { actionCreators } from './store/Alert';
import { PrivateRoute } from './components/PrivateRoute';

import Layout from './components/Layout';
import Home from './containers/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import { LoginPage} from './containers/LoginPage';


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
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={Home} />
                                <Route path="/login" component={LoginPage} />
                                <Route path='/counter' component={Counter} />
                                <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                            </div>
                        </Router>
                    </div>
                </div>
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