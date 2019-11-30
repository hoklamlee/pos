import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Router, Route, Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Order';
import config from 'react-global-configuration';

import MaterialTable from 'material-table';
import { Paper, Grid, Typography,Chip } from '@material-ui/core';
import RightBottomButton from '../../components/RightBottomButton';
import MaterialUIButton from '../../components/MaterialUIButton';
import AntCalendar from '../../components/AntCalendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPlus, faTrash, faPen, faTools, faHeart, faPrint } from '@fortawesome/free-solid-svg-icons'
import { history } from '../../helpers/history';
import { MonthlyReceipt } from './MonthlyReceipt'
import ReactToPrint from 'react-to-print';

import moment from 'moment';

class MonthlyOrderPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            calendarDate: moment(),
        };

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

    dateChange(value) {
        this.setState({ calendarDate: value });
    }

    render() {

        return (
            <div style={{ marginTop: '2vh', width: '100%' }}>
                {this.props.items ?
                    <div>
                        <Grid container direction="row">
                            <Grid item lg={10} md={10} sm={12} xs={12}>
                                    <ReactToPrint
                                        trigger={() => <MaterialUIButton variant="text" icon={<FontAwesomeIcon icon={faPrint} />} label="" onClick={() => this.print()} />}
                                        content={() => this.componentRef}
                                    />
                                    <div style={{ display: "none" }}>
                                        <MonthlyReceipt defaultValue={this.state.calendarDate} ref={el => (this.componentRef = el)} />
                                    </div>
               
                            </Grid>
                        </Grid>
                        <AntCalendar data={this.props.items} onChange={(e)=>this.dateChange(e)} defaultValue={this.state.calendarDate} /> :
                        {/*<MonthlyReceipt defaultValue={this.state.calendarDate} />*/}
                    </div> :
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









