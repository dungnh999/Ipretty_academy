
import React, { useState } from 'react'
import { TextField, makeStyles, MenuItem, Tooltip } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useAuth } from 'ipretty/context/AppProvider'
import contextHelper from 'ipretty/helpers/contextHelper'

const useStyles = makeStyles(theme => ({
    flexDisplay: {
        marginLeft: theme.spacing(3)
    },
    mRight12: {
        marginRight: theme.spacing(1.5)
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        ...theme.mixins.toolbar
    },
    content: {
        flexGdiv: 1,
    },
    typeOption: {
        display: 'flex',
        alignItems: 'center'
    },
    textField: {
        "& .MuiFormHelperText-root": {
            color: 'red',
            fontWeight: 400
        },
        "& .MuiInputBase-root": {
            "& input": {
                padding: '10px 0'
            },
            "& textarea": {
                padding: '10px 0'
            }
        },
        "& .MuiSelect-root": {
            "& input": {
                padding: '10px 0'
            },
            "& li": {
                paddingLeft: 0
            },
        },
        
    }
}))

function TextInput(props) {
    const { placeholder, value, onChange, fullWidth, error, helperText, select, disabled, noMargin,
        className, InputProps, type, autoFocus, name, rows, id, rowsMax, subItem, onKeyPress
    } = props;
    const classes = useStyles();
    const [options, setOptions] = useState(props.options)
    const { compactText } = contextHelper
    const { getTranslation } = useAuth()

    return (
        <div className={classes.textField}>
            <TextField
                id={id}
                margin={!noMargin ? 'normal' : 'none'}
                placeholder={placeholder}
                value={value}
                InputLabelProps={{ shrink: true }}
                className={className}
                rows={rows}
                rowsMax={rowsMax}
                multiline={rows > 1}
                onChange={onChange}
                onKeyPress={onKeyPress}
                fullWidth={fullWidth}
                error={error}
                helperText={helperText}
                select={select}
                disabled={disabled}
                InputProps={InputProps}
                type={type}
                autoFocus={autoFocus}
                name={name}
            >   
                {select && (
                    options.length ?
                        options.map((option, index) => (
                            option.name.length > 80 ? (
                                <Tooltip title={getTranslation(option.name)} key={index} value={option.id}>
                                    <MenuItem 
                                        disabled={option.id === 0 || option.name === "Không có dữ liệu"}
                                    >
                                        {compactText(getTranslation(option.name), 30)} {subItem && ` ( ${option.email} )`}
                                    </MenuItem>
                                </Tooltip>
                            ) : (
                                <MenuItem key={index} value={option.id}
                                    disabled={option.id === 0 || option.name === "Không có dữ liệu"}
                                >
                                    {getTranslation(option.name)} {subItem && ` ( ${option.email} )`}
                                </MenuItem>
                            )
                            
                        )) : []
                )}
            </TextField>
        </div>
    )
}

TextInput.prototype = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    select: PropTypes.array
}

export default TextInput