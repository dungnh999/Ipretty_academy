import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, makeStyles } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useAuth } from 'ipretty/context/AppProvider';
const useStyles = makeStyles(theme => ({
    textField: {
        flex: 1,
        marginBottom: theme.spacing(1.5),
        "& .MuiInput-root": {
            borderRadius: 17,
            background: theme.palette.background.paper,
            border: '7px solid ' + theme.palette.primary.main,
            padding: '0.625rem 0 0.625rem 23px',
            width: 'auto',
            maxWidth: 682,
            minWidth: 170,
            fontSize: 14
        }
    },
}))

interface SearchAutocompleteProps {
    onGetResult: (properties: any) => void;
    keywords: string;
    properties: any
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = (props) => {
    const classes = useStyles();
    const { getTranslation } = useAuth();
    const { onGetResult, keywords, properties } = props;

    const searchAutoComplete = (event) => {
        let _properties = properties;
        _properties = _properties.filter(_property => {
            if (!_property[keywords]) _property[keywords] = "";
            return _property[keywords].toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        })
        onGetResult(_properties);
    }

    return (
        <TextField
            placeholder={getTranslation("Recherche")}
            autoFocus
            onChange={searchAutoComplete}
            InputLabelProps={{
                shrink: true,
            }}
            InputProps={{
                disableUnderline: true,
                endAdornment: <InputAdornment position="start"><Search color={'secondary'} /></InputAdornment>,
            }}
            className={classes.textField}
        />
    )
}
export default SearchAutocomplete;
