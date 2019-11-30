import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { Router, Route, Link, Redirect } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators } from '../../store/Order';
import config from 'react-global-configuration';

import EditableTable from '../../components/AntTable';
import ReactStrapFrom from '../../components/ReactStrapForm';
import PageHeader from '../../components/PageHeader';
import { Divider, Grid } from '@material-ui/core';
import RightBottomButton from '../../components/RightBottomButton';
import MaterialUIDialog from '../../components/MaterialUIDialog';

import MaterialUIButton from '../../components/MaterialUIButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faPlus, faTrash, faPen, faTools, faArrowLeft, faPrint, faHeart, faCross, faCopy } from '@fortawesome/free-solid-svg-icons'

import { OrderItemPage } from '../OrderItemPage/OrderItemPage';
import moment from 'moment';
import './ReceiptPage.css';

class MonthlyReceipt extends React.Component {
    constructor(props) {
        super(props);


        //const orderId = this.props.match.params.id;
        //const orderId = this.props.orderId;

        //const userId = JSON.parse(localStorage.getItem('user')).userId;

        //this.state = {
        //    orderId: orderId,
        //    formUpdated: false,
        //    userId: userId
        //};

        //this.props.getOrderById(orderId);

    }

    showEmptyRows(rows) {
        var components = [];

        var i = rows.length;

        while (i < 10) {
            components.push(
                <tr>
                    <td style={{ height: "3vh", paddingLeft: "2vh" }}></td>
                    <td style={{ height: "3vh", paddingLeft: "2vh" }}></td>
                    <td style={{ height: "3vh", paddingLeft: "2vh" }}></td>
                </tr>
            );
            i++;
        }

        return (
            <React.Fragment>
                {components}
            </React.Fragment>
        );
    }


    calSum(items, prop) {
        return items.reduce(function (a, b) {
            return a + b[prop];
        }, 0);
    }

    getMomentDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(currentDate)
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    showItemsInDataRange(items, startDate, endDate) {
        var components =[];
        console.log(startDate, endDate);
        var targetDates = this.getMomentDates(startDate, endDate);

        console.log(targetDates);
        targetDates.map(d => {
            components.push(
                <tr>
                    <td style={{ height: "3vh", paddingLeft: "2vh" }}>{d.format("DD/MM/YYYY")}</td>
                    <td style={{ height: "3vh", paddingLeft: "2vh" }}>{this.calSum(items.filter(o => (d.format("DD-MM-YYYY") == o.targetDate.format("DD-MM-YYYY"))), "totalPrice")}</td>
                </tr>
            );
            startDate = moment(startDate).add(1, 'days');
        })

        console.log(components);
        return (
            <React.Fragment>
                {components}
            </React.Fragment>
        );
    }


    render() {

        return (
            <div className="body">
                <div className="face face-back">
                    <div>&nbsp;</div>
                    <div>
                        <div style={{ textAlign: "center", fontSize: "3vh" }}>
                            <div style={{ display: "inline", float: "left", marginLeft: "5vh" }}>冰 鮮 家 禽</div>
                            <div style={{ display: "inline", fontSize: "5vh" }}>明 富 雞 鴨</div>
                            <div style={{ display: "inline", float: "right", marginRight: "5vh" }}> 零 沽 批 發</div>
                        </div>
                        <div style={{ textAlign: "center", fontSize: "3vh" }}>
                            <div>
                                九龍深水埗北河街街市 1/F P15
                        </div>
                            <div>
                                陳生：9485 7494&nbsp;&nbsp;晚上：6203 8582&nbsp;&nbsp;陳太：9335 1723
                            </div>
                            <div>
                                ***********************************************************************************************************
                        </div>
                            </div>
   
                        {this.props.items ?
                            <div>
                                <div style={{ textAlign: "center", fontSize: "3vh" }}>
                                    <div style={{ display: "inline", float: "left", marginLeft: "2vh" }}>月結單</div>
                                    <div style={{ display: "inline", float: "right", marginRight: "2vh" }}>{this.props.defaultValue.year()}年{this.props.defaultValue.month() + 1}月發貨單紀錄</div>
                                </div>
                                <div style={{ lineHeight: "0px" }}>&nbsp;</div>
                                <div style={{ height: 230, width: "100%", paddingLeft: "20px", paddingRight: "20px", fontSize: "3vh" }}>

                                    <Grid container>
                                        <Grid item lg={4} md={4} sm={4}  xs={4}>
                                            <table border="1" style={{ width: "100%", border: "1px solid #ddd", marginTop: "3vh" }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "25%", paddingLeft: "2vh" }}>日期</th>
                                                        <th style={{ width: "50%", paddingLeft: "2vh" }}>金額($)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.showItemsInDataRange(this.props.items, new Date(this.props.defaultValue.year(), this.props.defaultValue.month(), 1), new Date(this.props.defaultValue.year(), this.props.defaultValue.month(), 10))}
                                                </tbody>
                                            </table>
                                        </Grid>
                                    <Grid item lg={4} md={4} sm={4}  xs={4}>
                                            <table border="1" style={{ width: "100%", border: "1px solid #ddd", marginTop: "3vh" }}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "25%", paddingLeft: "2vh" }}>日期</th>
                                                        <th style={{ width: "50%", paddingLeft: "2vh" }}>金額($)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.showItemsInDataRange(this.props.items, new Date(this.props.defaultValue.year(), this.props.defaultValue.month(), 11), new Date(this.props.defaultValue.year(), this.props.defaultValue.month(), 20))}
                                                </tbody>
                                            </table>
                                        </Grid>
                                <Grid item lg={4} md={4} sm={4} xs={4}>
                                            <table border="1" style={{ width: "100%", border: "1px solid #ddd", marginTop: "3vh"}}>
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: "25%", paddingLeft: "2vh" }}>日期</th>
                                                        <th style={{ width: "50%", paddingLeft: "2vh" }}>金額($)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.showItemsInDataRange(this.props.items, new Date(this.props.defaultValue.year(), this.props.defaultValue.month(), 21), new Date(this.props.defaultValue.endOf('month').format("YYYY/MM/DD")))}

                                                </tbody>
                                            </table>
                                        </Grid>
                                    </Grid>

                                </div>
                            </div>
                            :
                            ""}

                    </div>

                </div>
                {/* <div className="face face-front">

                </div>*/}
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

const connectedMonthlyReceipt = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(MonthlyReceipt);
export { connectedMonthlyReceipt as MonthlyReceipt };









