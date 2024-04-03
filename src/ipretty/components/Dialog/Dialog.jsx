import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Button, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import MuiDialog from '@material-ui/core/Dialog'
import { Close, Edit } from '@material-ui/icons'
import Spacer from '../Spacer'
import AddButton from '../AddButton'

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        alignItems: 'flex-start',
        "& .MuiIconButton-root": {
            padding: 0,
            [theme.breakpoints.down("450")]: {
                paddingRight: '8px'
            }
        },
        "& .MuiTypography-subtitle2": {
            fontSize: 24,
            color: '#395B65',
            fontWeight: 'bold',
            lineHeight: '32px',
            textTransform: 'inherit',
            fontFamily: 'San Francisco Text',
            [theme.breakpoints.down("450")]: {
                fontSize: '14px',//fix dồng nhất size tại Tại màn hình Quán lý khoá học:
                paddingTop: '2px'
            }
        },
    },
    closeButton: {
        position: 'absolute',
        right: '15px'
    },
    marginLeft: {
        marginLeft: theme.spacing(1)
    },
    dialogPaper: {
        borderRadius: theme.spacing(2.5),
        [theme.breakpoints.up("400")]: {
            padding: theme.spacing(3),
        },
    },
    dialogActions: {
        [theme.breakpoints.down("xs")]: {
            padding: '0px 24px 24px 0px'
        },
        [theme.breakpoints.up("sm")]: {
            padding: theme.spacing(3)
        },
    },
    dialogTitleFullScreen: {
        padding: theme.spacing(0, 2)
    },
    dialogFooter: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    buttonAction: {
        '& > :not(:first-child)': {
            marginLeft: '8px'
        },
        '& .MuiButton-root': {
            padding: '6px 9px',
            fontSize: 16,
            border: 0,
            fontFamily: 'San Francisco Text',
            // color: '#395B65',
            fontWeight: 600,
            // border: '1px solid rgba(0, 0, 0, 0.23)'
            padding: '4px 10px',
            '& img' : {
                width: 16
            }
        },
    },
    buttonSelectAll: {
        '& button': {
            border: 'none',
            outline: 'none',
            backgroundColor: '#fff',
        },
        '& button:hover': {
            cursor: 'pointer',
            opacity: '.8'
        },
        '& .hadSelectedAll': {
            color: 'red'
        },
        '& .noSelectedAll': {
            color: '#428ff0'
        },
    },
    backgoundDL: {
        backgroundColor: "#E5E5E5"
    },
    filter: {
        padding: '0px 0px 14px 24px;',
        display: 'flex',
    },
    buttonActionStyle: {
        background: '#147B65',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#147B65'
        }
    },
    buttonDownload : {
        fontSize: 16,
        color: '#44AD92',
        fontFamily: 'San Francisco Text',
    }
}))

function Dialog(props) {
    const classes = useStyles()
    const {
        open,
        onClose,
        getTranslation,
        action,
        actionLabel,
        title,
        subTitle,
        fullScreen,
        maxWidth,
        children,
        loadingButton,
        rootDialogContentStyle,
        rootDialogTitleStyle,
        iconButton,
        noIcon,
        deny,
        noButton,
        onDeny,
        changeBG,
        disabled,
        close,
        onDownload,
        isDown,
        hiddenActions,
        actionCancel,
        cancelLabel,
        buttonColorGreen,
        CustomWidth,
        loadingClass,
    } = props;
    
    function renderButtonDeny() {
        return (
            <Button size='large' onClick={onDeny} variant='outlined' color='secondary' >
                {getTranslation('deny')}
            </Button>
        )
    }

    function renderButtonDownload() {
        return (
            <Button size='large'  className={classes.buttonDownload} onClick={onDownload} variant='outlined' color='secondary' >
                *{getTranslation('Downloadtemplate')}
            </Button>
        )
    }

    function renderButtonClose() {
        return (
            <Button size='large' onClick={onClose} variant='outlined' color='secondary' >
                {getTranslation('close')}
            </Button>
        )
    }

    function renderButtonDefaul() {
        return (
            <Button size='large' onClick={onClose} variant='outlined' color='secondary' >
                {getTranslation('Cancel')}
            </Button>
        )
    }

    function renderButtonCacel() {
        return (
            <Button size='large' onClick={actionCancel} variant='outlined' color='secondary' >
                {cancelLabel || getTranslation('cancel')}
            </Button>
        )
    }

    function renderAction() {
        return (
            <AddButton size='large' variant='outlined' buttonClass={classes.marginLeft + ' ' + buttonColorGreen ? classes.buttonActionStyle : null} iconButton={iconButton}
                onClick={action || null} label={actionLabel || 'Action button'} noIcon={noIcon} disabled={disabled} loading={loadingButton} loadingClass={loadingClass}>
                action    {/* {actionLabel || 'Action button'} */}
            </AddButton>
        )
    } 

    return (
        <MuiDialog open={open} onClose={onClose} fullScreen={fullScreen} fullWidth={!!maxWidth} maxWidth={maxWidth}
            classes={{ paper: !fullScreen && changeBG ? classes.dialogPaper + ' ' + classes.backgoundDL : !fullScreen && CustomWidth ? classes.dialogPaper  + ' ' + CustomWidth : null }}>
            <DialogTitle classes={{ root: !fullScreen ? rootDialogTitleStyle : classes.dialogTitleFullScreen }}>
                <div className={classes.header}>
                    <div>
                        {title && (
                            <React.Fragment>
                                <Typography variant='subtitle2' >
                                    {title}
                                </Typography>
                            </React.Fragment>
                        )}
                        {subTitle && (
                            <Typography variant='h6' gutterBottom>
                                {subTitle}
                            </Typography>
                        )}
                    </div>
                    <Spacer />
                    <IconButton onClick={onClose} color={'secondary'}>
                        <Close />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent classes={{ root: rootDialogContentStyle }}>
                {children}
            </DialogContent>
            {!fullScreen &&
                (hiddenActions ? null : (
                    <DialogActions
                        className={props.className}
                        classes={{
                            root: !fullScreen
                                ? classes.dialogActions + ' ' + classes.dialogFooter
                                : null,
                        }}
                    >
                        <div className={classes.buttonAction}>
                            {
                                onDownload ? 
                                    renderButtonDownload()
                                : ''
                            }
                            {deny
                                ? renderButtonDeny()
                                : close
                                    ? renderButtonClose()
                                    : noButton
                                        ? null
                                        : renderButtonDefaul()}
                            {actionCancel && renderButtonCacel()}
                            {action && renderAction()}
                        </div>
                    </DialogActions>
                ))}
        </MuiDialog>
    )
}

Dialog.defaultProps = {
    getTranslation: (value) => { return value }
}

Dialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    getTranslation: PropTypes.func,
    action: PropTypes.func,
    request: PropTypes.func,
    actionLabel: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    fullScreen: PropTypes.bool,
    maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    rootDialogContentStyle: PropTypes.object,
    rootDialogTitleStyle: PropTypes.object,
    actionRequest: PropTypes.string
}

export default Dialog
