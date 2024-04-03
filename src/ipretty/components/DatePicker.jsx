import React, { useContext, useMemo } from 'react'
import PropTypes from 'prop-types'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import MomentUtils from '@date-io/moment';
import {
    Typography,
    createMuiTheme,
    makeStyles,
} from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles"
import moment from 'moment'
import viLocale from "date-fns/locale/vi"
import { useAuth } from 'ipretty/context/AppProvider'

const localeMap = {
    vi: viLocale,
};

const useStyles = makeStyles((theme => ({
    flexContainer: {
        display: 'flex',
        alignItems: 'center',
        flex: 2,
        flexShrink: 2,
        flexGrow: 2
    }
})));

function DatePickerComponent({ value, onChange, disablePast, label, disableFuture, clearable, isEdit, datePickerYear, helperText, format, stypeHelperText, error }) {
    const classes = useStyles();
    const { theme } = useAuth();
    const defaultMaterialTheme = useMemo(() => (
        createMuiTheme({
            overrides: {
                MuiPickersToolbar: {
                    toolbar: {
                        backgroundColor: theme.palette.primary.main,
                    },
                },
                MuiPickersDay: {
                    daySelected: {
                        backgroundColor: theme.palette.primary.main,
                        '&:hover': {
                            backgroundColor: theme.palette.primary.main
                        }
                    },
                    current: {
                        color: theme.palette.secondary.main
                    }
                },
                MuiButton: {
                    label: {
                        color: theme.palette.secondary.main
                    }
                },
                MuiInput: {
                    // root: {
                    //   width: 144,
                    //   margin: '0px 8px'
                    // },
                    underline: {
                        color: theme.palette.text.secondary,
                        '&:before': {
                            borderBottom: `1px solid ${theme.palette.primary.light}`,
                            borderBottomStyle: 'solid'
                        },
                        '&:after': {
                            borderBottom: `1px solid ${theme.palette.primary.light}`
                        },
                        '&:hover:before': {
                            borderBottom: `2px solid ${theme.palette.primary.header} !important`
                        },
                        '&:focus:before': {
                            borderBottom: `1px solid ${theme.palette.primary.main} !important`
                        },
                        '&:focus:after': {
                            borderBottom: `1px solid ${theme.palette.primary.main} !important`
                        },
                        fontSize: theme.spacing(1.875),
                        "&$disabled": {
                            "&:before": {
                                borderBottomStyle: 'solid'
                            }
                        }
                    },
                },
                MuiInputBase: {
                    input: {
                        color: theme.palette.text.secondary,
                        '&:focus': {
                            color: theme.palette.secondary.main,
                        },
                        '&:focus:after': {
                            borderBottom: `1px solid ${theme.palette.primary.main}`
                        }
                    },
                },
                MuiIconButton: {
                    root: {
                        color: `${theme.palette.text.secondary}`,
                        "&$disabled": {
                            color: theme.palette.text.secondary,
                        }
                    }
                },
                disabled: {},
            }
        })
    ), []);

    const renderLabel = () => {
        if (value) {
            return moment(value).format(format);
        } else {
            return '';
        }
    }

    return (
        <div className={classes.flexContainer}>
            {label && (
                <Typography color={'textSecondary'}>
                    {label}
                </Typography>
            )}
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap['vi']} >
                <ThemeProvider theme={defaultMaterialTheme}>
                    {datePickerYear ? (
                        <DatePicker
                            disableFuture={disableFuture}
                            disablePast={disablePast}
                            openTo="year"
                            format={format}
                            views={["year", "month", "date"]}
                            value={value}
                            error={error}
                            helperText={helperText}
                            onChange={value => onChange(moment(value))}
                            clearLabel={"Xóa"}
                            cancelLabel={"Huỷ"}
                            okLabel={"Chọn"}
                            className={stypeHelperText}
                            fullWidth
                            labelFunc={renderLabel}
                        />
                    ) : (
                        <KeyboardDateTimePicker
                            disableFuture={disableFuture}
                            clearable={clearable}
                            value={value}
                            format={format || "dd/MM/yyyy HH:mm:ss"}
                            // orientation="landscape"
                            disablePast={isEdit ? false : true}
                            error={error}
                            helperText={helperText}
                            onChange={value => onChange(moment(value))}
                            clearLabel={"Xóa"}
                            cancelLabel={"Huỷ"}
                            okLabel={"Chọn"}
                            fullWidth
                            disabled={isEdit ? true : false}
                            labelFunc={renderLabel}
                        />
                    )}
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </div>
    )
}

DatePickerComponent.defaultProps = {
    disableFuture: false,
    clearable: true
};

DatePickerComponent.propTypes = {
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    disableFuture: PropTypes.bool,
    clearable: PropTypes.bool,
};

export default DatePickerComponent
