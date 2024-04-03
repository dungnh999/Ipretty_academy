import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
    root: {
        "& li": {
            listStyle: 'none',
        }
    },
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
        flex: 1,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            paddingBottom: '20px'
        },
        "& .MuiInput-root": {
            borderRadius: 20,
            background: '#e7e7e7',
            color: '#000',
            width: 'auto',
            maxWidth: theme.spacing(46),
            fontSize: 14,
            [theme.breakpoints.up('md')]: {
                minWidth: theme.spacing(25),
                padding: theme.spacing(0.625, 2),
            },
            [theme.breakpoints.down('sm')]: {
                minWidth: theme.spacing(13.75),
                padding: theme.spacing(0.5, 1),
            },
            [theme.breakpoints.down('xs')]: {
                minWidth: theme.spacing(13),
                padding: theme.spacing(0.5, 1),
                '& .MuiInputAdornment-positionStart': {
                    marginRight: '0px'
                }
            },
        }
    },
    textFieldMyCourse: {
        flex: 1,
        "& .MuiInput-root": {
            borderRadius: 20,
            background: 'white',
            color: '#000',
            padding: theme.spacing(0.625, 2),
            width: 'auto',
            maxWidth: theme.spacing(46),
            minWidth: theme.spacing(25),
            fontSize: 14
        }
    },
}))