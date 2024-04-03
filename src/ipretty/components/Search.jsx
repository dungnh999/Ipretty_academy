import React, { useState, useEffect, useRef } from 'react'
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(
    theme => ({
        broot: {
            "& li": {
                listStyle: 'none',
            }
        },
        textField: {
            flex: 1,
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                // paddingBottom: '20px' fix button mã giảm gía bị lệch
            },
            "& .MuiInput-root": {
                borderRadius: 5,
                background: '#e7e7e7',
                color: '#000',
                width: 'auto',
                maxWidth: theme.spacing(46),
                fontSize: 14,
                [theme.breakpoints.up('md')]: {
                    minWidth: theme.spacing(25),
                    padding: theme.spacing(0.625, 2),
                    background: '#d1d1d1',//bug 61 fix lỗi viền trắng seach 
                },
                [theme.breakpoints.down('sm')]: {
                    minWidth: theme.spacing(13.75),
                    padding: theme.spacing(0.5, 1),
                    background: '#d1d1d1',//bug 61 fix lỗi viền trắng seach
                },
                [theme.breakpoints.down('xs')]: {
                    minWidth: theme.spacing(13),
                    padding: theme.spacing(0.5, 1),
                    background: '#d1d1d1',//bug 61 fix lỗi viền trắng seach
                    '& .MuiInputAdornment-positionStart': {
                        marginRight: '0px'
                    }
                },
            }
        },
        textFieldMyCourse: {
            flex: 1,
            "& .MuiInput-root": {
                borderRadius: 5,
                background: 'white',
                color: '#000',
                padding: theme.spacing(0.625, 2),
                width: 'auto',
                maxWidth: theme.spacing(46),
                minWidth: theme.spacing(25),
                fontSize: 14
            }
        },
    })
)

const Search = (props) => {
    const classes = useStyles();
    const { placeholder, onSearch, fieldName, wait, autoFocus, resetValue, isMyCourse, valueSearch, fullWidth, ...rest } = props;
    const [textSearch, setTextSearch] = useState('')
    const typingTimeout = useRef(null)

    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);//Reload hiển thị header trang

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (valueSearch) {
                    setTextSearch(valueSearch);
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [valueSearch]);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (resetValue) {
                    setTextSearch('')
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [resetValue]);

    const handleDebounce = (func) => {
        if (typingTimeout.current) {
            clearTimeout(typingTimeout.current)
        }
        typingTimeout.current = setTimeout(() => func(), wait);
    }

    const handleSearchDataChange = (e) => {
        const value = e.target.value
        setTextSearch(value)
        if (!textSearch && !onSearch) return;

        handleDebounce(() => {
            onSearch(value, fieldName, e)
        })
    }

    // resetValue && setTextSearch('')

    return (
        <TextField
            {...rest}
            placeholder={placeholder}
            autoFocus={!autoFocus}
            fullWidth={fullWidth}
            value={textSearch}
            onChange={handleSearchDataChange}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                disableUnderline: true,
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon color={'secondary'} />
                    </InputAdornment>
                ),
            }}
            className={isMyCourse ? classes.textFieldMyCourse : classes.textField}
        />
    )
}

export default Search;

Search.defaultProps = {
    wait: 500,
}