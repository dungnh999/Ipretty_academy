import React, {useContext, useEffect, useState} from 'react';
import {SnackbarKey, useSnackbar} from 'notistack';
import {AppContextProps, useAuth} from './AppProvider';

// export interface NotiStackContextProps {
//     makeShortMessage: Function,
//     closeAllSnackbar: Function,
//     closeSnackbar: (key?: SnackbarKey) => void
// }

// export interface NotiStackProvider {
//     context: AppContextProps,
// }

const NotiStackContext = React.createContext(null);
export const NotiStackConsumer = NotiStackContext.Consumer;
export const NotiStackProvider = ({children}) => {
    
    const {user} = useAuth();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [enqueueKeys, setEnqueueKeys] = useState([]);

    useEffect(() => {
        if (!user) {
            resetEnqueueMessages();
        } else if (enqueueKeys.length === 0) {
            showHighlightedNotistacks();
        }
    }, [user]);

    useEffect(() => {
        return function cleanup() {
            resetEnqueueMessages();
        }
    }, []);

    const showHighlightedNotistacks = () => {
    }

    const resetEnqueueMessages = () => {
        let _enqueue_keys = [...enqueueKeys];
        _enqueue_keys.forEach(key => {
            closeSnackbar(key);
        });
        setEnqueueKeys([]);
    }

    const makeShortMessage = (_message, _variant, _autoHideDuration) => {
        const key = enqueueSnackbar(_message, {
            variant: _variant,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            preventDuplicate: true,
            autoHideDuration: _autoHideDuration ? _autoHideDuration : 3000,
        });
        return key;
    }
    
    const closeAllSnackbar = () => {
        closeSnackbar();
    }

    return (
        <NotiStackContext.Provider
            value={{
                makeShortMessage,
                closeAllSnackbar,
                closeSnackbar,
            }}
        >
            {children}
        </NotiStackContext.Provider>
    )
}

export const useNotiStackContext = () => useContext(NotiStackContext);
