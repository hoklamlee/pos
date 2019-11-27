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
import AntCalendar from '../../components/AntCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPlus, faTrash, faPen, faTools , faHeart} from '@fortawesome/free-solid-svg-icons'
import { history } from '../../helpers/history';

class MonthlyOrderPage extends React.Component {
    constructor(props) {
        super(props);

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

        return (
            <div style={{ marginTop: '2vh', width: '100%' }}>
                {this.props.items ?
                    <AntCalendar data={this.props.items} /> :
                    ""

                    }
             
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

const connectedMonthlyOrderPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(MonthlyOrderPage);
export { connectedMonthlyOrderPage as MonthlyOrderPage };









