import React, { useContext, useEffect, useState } from 'react';
import i18n from "./i18n.json";
import AuthService from 'ipretty/services/AuthService';
import UserService from 'ipretty/services/UserService';
import {
    getTokens,
    setTokens,
    removeTokens,
    getIsAdminPage
} from 'ipretty/helpers/utils';
import contextHelper from 'ipretty/helpers/contextHelper';
import useNavigator from "ipretty/hook/useNavigator";
export const AppContext = React.createContext(null);
export const AppConsumer = AppContext.Consumer;

export const AppProvider = ({children}) => {
    const [user, setUser] = useState(undefined);
    const [isAdminPage, setAdminPage] = useState(false);
    const [appReady, setAppReady] = useState(false);
    const [hashMess, sethashMess] = useState(false);
    const [receiveMessage, setReceiveMessage] = useState({});
    const theme = theme;
    const navigate = useNavigator();

    useEffect(() => {
        const user = getTokens().user;
        const checkPageAdmin = getIsAdminPage().isAdminPage ?  getIsAdminPage().isAdminPage : false;
        getUser(user);
        setAdminPage(checkPageAdmin);
    },[]);

    const getUser = (user) => {
        if (user) {
            setUser(user);
            setAppReady(true);
        } else {
            setUser(undefined);
            setAppReady(false);
        }
    };
    
    const clickMess = (status) => {
       sethashMess(status)
    }
    const onReceiveMessage = (message) => {
        setReceiveMessage(message)
         }
    const refreshUser = () => {
        AuthService.profile(
            user.id,
            (res) => {
            },
            (err) => {
                console.log(err);
            }
        )
    }
    
    const updateProfileUser = (user) => {
        getUser(user);
        contextHelper.localStoragePersist('user' ,user)
    }

    const updateProfile = (responseCb) => {
        if (user) {
            AuthService.profile(
                user.profile.userId,
                (res) => {
                    
                },
                (err) => {
                    console.log(err);
                }
            )
        }
        
    }
    
    const checkToken = () => {
        AuthService.get_me(user.authToken.access_token, onReceiveUserMe, catchUserProfileError);
    }

    const onReceiveUserMe = (res) => {
    }

    const catchUserProfileError = (err) => {
        if (err?.status === 401)
            AuthService.refresh_token(user.authToken.refresh_token, onRefreshToken, onRefreshTokenError)
    }

    const onRefreshToken = (data) => {
        setUser(data.user);
        setTokens(data.accessToken, data.user);
    };

    const onRefreshTokenError = (err) => {
    }

    const login = (data) => {
        setTokens(data.accessToken, data.user);
        setAppReady(true);
        setAdminPage(data.isAdminPage);
        contextHelper.localStoragePersist('isAdminPage', data.isAdminPage + '');
        let cookie = getCookie("accessToken");
        if (cookie) {
            eraseCookie("accessToken");
        }
        setCookie("accessToken", data.accessToken, 7)
        navigate('/');
    }

    const logout = (navigate, url = null) => {
        if (user) {
            AuthService.logout(() => { }, (error) => console.log(error))
        }
        setUser(undefined);
        removeTokens();
        if (navigate) {
            if (url) {
                console.log('redirect', url)
                navigate(url);
            } else if(isAdminPage) {
                navigate('/login-admin');
            } else {
                navigate('/');
            }
        } else {
            window.location.replace("/");
        }
        eraseCookie('accessToken')
        // localStorage.clear();
    }
    const changeLanguage = (lang) => {
        AuthService.changeLanguage(
            lang,
            (res) => {
                let data = res.data.data;
                user.lang = data.lang;
                contextHelper.localStoragePersist('user' , user);
                window.location.reload();
            },
            null,
        )
    }
    const getTranslation = (key, ...args) => {
        let result = null;
        if (user && user.lang) {
            result = i18n[user.lang][key]
        } else {
            result = i18n["vi"][key]
        }
        if (!result) {
            return key;
        }
        if (Array.isArray(args) && args.length) {
            return result.replace(/{(\d+)}/g, (_, n) => args[+n - 1])
        }
        return result;
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        let domain = process.env.COOKIE_DOMAIN
        document.cookie = name + "=" + (value || "") + expires + ";path=/;domain=" + domain;
    }

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    
    return (
      <AppContext.Provider
        value={{
          login,
          checkToken,
          logout,
          user,
          appReady,
          theme,
          updateProfile,
          refreshUser,
          getTranslation,
          changeLanguage,
          isAdminPage,
          updateProfileUser,
          hashMess,
          clickMess,
          receiveMessage,
          onReceiveMessage,
         
        }}
        >
          {children}
      </AppContext.Provider>
    );
}

export const useAuth = () => useContext(AppContext);

export const useTokenAuth = () => {
  const user = useContext(AppContext);
  const isAuthenticated = !!user.user;
  return {
    hasToken: !!getTokens(),
    isAuthenticated,
  };
};
