
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Tab } from '@material-ui/core';

const AntTab = withStyles(theme => ({
    root: {
        textTransform: 'uppercase',
        minWidth: 70,
        fontWeight: 600,
        color: '#707070',
        paddingRight: theme.spacing(4),
        // backgroundColor: '#fff',
        '&:hover': {
            color: theme.palette.primary.colorText,
            opacity: 1,
        },
        '&$selected': {
            color: theme.palette.primary.colorText,
            fontWeight: 600,
        },
        '&:focus': {
            color: theme.palette.primary.colorText,
        },
    },
    selected: {},
}))(props => <Tab disableRipple {...props} />);

export default AntTab
