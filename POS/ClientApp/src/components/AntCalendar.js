import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Calendar, Badge, Alert } from 'antd';
import moment from 'moment';




export default class AntCanlendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.defaultValue,
            selectedValue: this.props.defaultValue,
        };
    }

    getListData = (value) => {
        var listData = [];

        var targetItems = this.props.data.filter(o => o.targetDate.format("YYYY-MM-DD") == value.format("YYYY-MM-DD"));

        if (targetItems) {
            targetItems.map(o => {
                listData.push({ type: 'success', content: o.content  })
            })
        }

        return listData || [];
    }

    dateCellRender = (value) => {
        const listData = this.getListData(value);
        return (
            <ul className="events" style={{listStyle:"none"}}>
                {listData.map(item => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    }


    getMonthData = (value) => {
        var totalPrice = 0;

        var targetItems = this.props.data.filter(o => o.targetDate.format("YYYY-MM") == value.format("YYYY-MM"));

        if (targetItems) {
            targetItems.map(o => {
                totalPrice += o.totalPrice;
            })
        }

        return totalPrice;

    }

    monthCellRender = (value) => {
        const num = this.getMonthData(value);
        return num ? (
            <div className="notes-month">
                $ {num}
                
            </div>
        ) : null;
    }

    onSelect = value => {
        this.setState({
            value,
            selectedValue: value,
        });

        this.props.onChange(value);
    };

    onPanelChange = value => {
        this.setState({ value });
    };

    render() {
        const { value, selectedValue } = this.state;

        return (
            <div>

                <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
            </div>
        )
    }
}

