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

class ReceiptPage extends React.Component {
    constructor(props) {
        super(props);


        const orderId = this.props.match.params.id;
        const userId = JSON.parse(localStorage.getItem('user')).userId;

        this.state = {
            orderId: orderId,
            formUpdated: false,
            userId: userId
        };

        this.props.getOrderById(orderId);

    }


    render() {

        return (
            <div className="body">
                <div className="face face-back">

                    <Grid container spacing={1} style={{ paddingTop: 10 }}>
                        <Grid container item xs={12} spacing={3}>
                            <Grid item>冰 鮮 家 禽</Grid>
                            <Grid item>明 富 雞 鴨</Grid>
                            <Grid item> 零 沽 批 發</Grid>
                        </Grid>
                        <Grid container xs={12} spacing={3} style={{ textAlign: "center", fontSize: 6 }}>
                            九龍深水埗北河街街市 1/F P15
                        </Grid>
                        <Grid cotainer xs={12} spacing={3} style={{ textAlign: "center", fontSize: 6 }}>
                            陳生：9485 7494&nbsp;&nbsp;晚上：6203 8582&nbsp;&nbsp;陳太：9335 1723
                            </Grid>
                        <Grid container item xs={12} spacing={3}>
                            ************************************************************************************
                        </Grid>
                        {this.props.item ?
                            <div>
                                <Grid container item xs={12} spacing={3}>
                                    {console.log(this.props.item)}

                                    <Grid item>{this.props.item.purchaser.name}&nbsp;蒙光顧</Grid>
                                    <Grid item>{this.props.item.orderDate}發貨單</Grid>
                                </Grid>
                                <Grid container style={{ height: 230 }}>
                                    <div style={{ width: "100%", paddingLeft: "20px", paddingRight: "20px", marginTop: "10px" }}>
                                        <table border="1" style={{ width: "100%", border: "1px solid #ddd" }}>
                                            <tr>
                                                <th style={{ width: "25%", paddingLeft: "2vh" }}>名稱</th>
                                                <th style={{ width: "50%", paddingLeft: "2vh" }}>數量</th>
                                                <th style={{ width: "25%", paddingLeft: "2vh" }}>總數</th>
                                            </tr>
                                            {this.props.item.orderItems.map(o =>
                                                <tr>
                                                    {console.log(o)}
                                                    <td style={{ height: "3vh", paddingLeft: "2vh" }}>{o.inventory.name}</td>
                                                    <td style={{ height: "3vh", paddingLeft: "2vh" }}>{o.quatity}</td>
                                                    <td style={{ height: "3vh", paddingLeft: "2vh" }}>${o.price}</td>
                                                </tr>)
                                            }

                                            <tr>
                                                <td colspan={2} style={{ visibility: "hidden" }}></td>
                                                <td style={{ paddingLeft: "2vh" }}>${this.props.totalPrice}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </Grid>
                                </div>
                            :
                            ""}
    
                    </Grid>

                </div>
                <div className="face face-front">

                </div>
            </div>
        );
    }
}



function mapStateToProps(state) {
    const { loading, error, item, users, purchasers, inventories, totalPrice, favouriteOrder } = state.order;
    return {
        loading, error, item, users, purchasers, inventories, totalPrice, favouriteOrder
    };
}

const connectedReceiptPage = connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ReceiptPage);
export { connectedReceiptPage as ReceiptPage };









