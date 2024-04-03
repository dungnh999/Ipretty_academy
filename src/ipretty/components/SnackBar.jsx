import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CheckCircle, Close, Info, Error, Warning } from '@material-ui/icons';
import { green, amber } from '@material-ui/core/colors';
import { LinearProgress, IconButton, Snackbar, SnackbarContent, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: Error,
    info: Info,
};

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    loading: {
        paddingLeft: '20px'
    }
});

function MySnackbarContent(props) {
    const { loading, classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <div className={`${loading ? classes.message : ''}`}>
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classNames(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                    {loading === true && (
                        <div className={classes.loading}>
                            <CircularProgress color={"secondary"} />
                        </div>
                    )}
                </div>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <Close className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

/**
 *
 * @type {{classes: *, className: shim, message: shim, onClose: shim, variant: shim, loading: shim}}
 */
MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
    loading: PropTypes.bool
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

class SnackBar extends React.PureComponent {

    render() {
        const { close, variant, message, loading, download } = this.props;
        let snackbarContent;
        switch (variant) {
            case "success":
                snackbarContent = <MySnackbarContentWrapper loading={loading} onClose={close} variant="success" message={message ? message : "Success"} />;
                break;
            case "error":
                snackbarContent = <MySnackbarContentWrapper loading={loading} onClose={close} variant="error" message={message ? message : "Error"} />;
                break;
            case "warning":
                snackbarContent = <MySnackbarContentWrapper loading={loading} onClose={close} variant="warning" message={message ? message : "Warning"} />;
                break;
            default:
                snackbarContent = <MySnackbarContentWrapper loading={loading} onClose={close} variant="info" message={message ? message : "Ok"} />;
                break;
        }

        return (
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={true}
                autoHideDuration={download ? null : 6000} onClose={close}>
                {snackbarContent}
            </Snackbar>
        );
    }
}

/**
 *
 * @type {{close: shim, variant: shim, message: shim, loading: shim}}
 */
SnackBar.propTypes = {
    close: PropTypes.func,
    variant: PropTypes.string,
    message: PropTypes.string,
    loading: PropTypes.bool
};

export default SnackBar;
