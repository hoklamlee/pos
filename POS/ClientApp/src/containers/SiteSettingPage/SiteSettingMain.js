import React from 'react';

import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/User';
import config from 'react-global-configuration';
import MaterialPaper from '../../components/MaterialPaper';
import ReactStrapForm from '../../components/ReactStrapForm';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools, faInfo, faKey, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import VerticalTabs from '../../components/VerticalTabs';
import { StatusPage } from '../StatusPage/StatusPage';

class SiteSettingMain extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const tabs = [
            {
                label: 'Status',
                component:<StatusPage />
            },
            {
                label: 'Permission',
                component: <div></div>
            },
            {
                label: 'Site Member',
                component: <div></div>
            },
            {
                label: 'Menu Setting',
                component: <div></div>
            }
        ]

        return (
            <div style={{ marginTop: '2vh' }}>
                <VerticalTabs tabs={tabs} />
            </div>

        );
    }
}



function mapStateToProps(state) {
    const { loggingIn, user } = state.authentication;
    return {
        loggingIn, user
    };
}

const connectedSiteSettingMain = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(SiteSettingMain);
export { connectedSiteSettingMain as SiteSettingMain };









