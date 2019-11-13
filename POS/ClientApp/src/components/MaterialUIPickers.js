import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(props.defaultValue ? moment(props.defaultValue, 'DD/MM/YYYY') : moment());

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                {/* <KeyboardDatePicker
                    style={{width:"100%"}}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                /> */}
                <KeyboardDatePicker
                    style={{ width: "100%" }}
                    margin="normal"
                    id={props.id}
                    label={props.label}
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                {/* <KeyboardTimePicker
                    style={{ width: "100%" }}
                    margin="normal"
                    id={props.id}
                    label={props.label}
                    defaultValue={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }} 
                />*/}
            </Grid>
        </MuiPickersUtilsProvider>
    );
}
