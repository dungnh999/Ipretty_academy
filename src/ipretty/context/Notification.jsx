import React, {createContext, useContext, useEffect, useState} from 'react';
import { Checkbox, Collapse, makeStyles, Typography } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';

const useStyles = makeStyles(
    theme => ({
        outlined: {
            background: '#AAAAAA',
            alignItems: 'center',
            padding: '0.35rem 0.292vw',
            [theme.breakpoints.up("sm")]: {
                marginLeft: 255,
            },
            [theme.breakpoints.up("lg")]: {
            marginLeft: 305,

            },
            [theme.breakpoints.up("xl")]: {
            marginLeft: '18.125vw',
            },
            [theme.breakpoints.down("sm")]: {
                marginLeft: 0,
            },
        },
        root: {
            background: '#588CD1',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: '0.813rem',
            paddingLeft: '1.5vw',
            paddingRight: '0.5vw',
        },
        content: {
            [theme.breakpoints.up('lg')]: {
                fontSize: '1.125rem',
            },
            [theme.breakpoints.up('xl')]: {
                fontSize: '1.25rem',
            },
            color: 'white',

            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        },
        checkboxSection: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 'auto',
            '& .MuiCheckbox-root' : {
                color: 'white',
            }
        },
        closeButton: {
            color: 'white',
            marginLeft: '1.042vw',
            cursor: 'pointer',
        }
    })
)

// export interface MessageContextProps {
//     makeLongMessage: (_message: string) => void,
//     checkboxChange: Function,
//     closeMessage: () => void,
// }

// export interface MessageProvider {
//     context?: any,
// }

const MessageContext = createContext(null);
export const MessageConsumer = MessageContext.Consumer;
export const MessageProvider = ({children}) => {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const makeLongMessage = (_message) => {
        setOpen(true);
        setMessage(_message);
    }

    const closeMessage = () => {
        setOpen(false);
    }

    const checkboxChange = () => {
        console.log('interacted');
    }

    return (
        <MessageContext.Provider
            value={{
                makeLongMessage,
                closeMessage,
                checkboxChange,
            }}
        >   
            <React.Fragment>
                <Collapse in={open}>
                    <div className={classes.outlined}>
                        <div className={classes.root}>
                            <div className={classes.content}>
                                <Typography variant="body1" className={classes.content}>
                                    {message}
                                </Typography>
                            </div>
                            <div className={classes.checkboxSection}>
                                <Checkbox onChange={checkboxChange}/>
                                <Typography className={classes.content}>J'ai compris</Typography>
                                <Cancel className={classes.closeButton} onClick={closeMessage}/>
                            </div>
                        </div>
                    </div>
                </Collapse>
                {children}
            </React.Fragment>
        </MessageContext.Provider>
    )
}

export const useNotification = () => useContext(MessageContext);