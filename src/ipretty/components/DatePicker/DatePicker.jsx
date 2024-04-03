
import React from 'react';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { DatePicker, TimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Datepicker from '../../../public/icons_ipretty/Datepicker.png'
import IconImage from "ipretty/components/IconImage"

function DatePickers(props) {

    switch (props.type) {
        case 'date-picker':
            return (
                <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            disableFuture={props.disableFuture}
                            openTo="year"
                            format="dd/MM/yyyy"
                            label={props.label || ''}
                            views={["year", "month", "date"]}
                            value={props.value}
                            onChange={props.handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </React.Fragment>
            )
        case 'date-picker-filter':
            return (
                <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            placeholder={props.placeholder}
                            value={props.value}
                            onChange={props.handleDateChange}
                            format="dd/MM/yyyy"
                        />
                    </MuiPickersUtilsProvider>
                </React.Fragment>
            )
        case 'time-picker':
            return (
                <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            clearable={props.clearable}
                            ampm={props.ampm || false}
                            label={props.label || ''}
                            value={props.value}
                            onChange={props.handleDateChange}
                        />
                    </MuiPickersUtilsProvider>
                </React.Fragment>
            )
        case 'datetime-picker':
            return (
                <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            variant="inline"
                            ampm={props.ampm || false}
                            label={props.label || ''}
                            value={props.value}
                            placeholder={props.placeholder}
                            onChange={props.handleDateChange}
                            disablePast={props.disablePast}
                            format={props.format ? props.format : "yyyy-MM-dd HH:mm:ss"}
                            helperText={props.helperText || ''}
                            keyboardIcon={<IconImage srcIcon={Datepicker} className="icon__datatime" />}
                        />
                    </MuiPickersUtilsProvider>
                </React.Fragment>
            )
        default:
            break;
    }
}

export default DatePickers