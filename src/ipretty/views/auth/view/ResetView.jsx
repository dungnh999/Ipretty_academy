import { useAuth } from 'ipretty/context/AppProvider';
import React, {useState, useEffect} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import AuthTemplate from 'ipretty/views/auth/templates/AuthTemplate'

function ResetView (props) {
  const {history, location, match} = props;
  const { user, logout } = useAuth();

  const [reset, setReset] = useState({
    email: "",
    token: "",
    readOnly: false
  });


  // if (
  //   history.location.pathname !== "/home" &&
  //   user &&
  //   localStorage.getItem("user")
  // ) {
  //   return <Redirect to="/home" />;
  // }

  useEffect(() => {
    let mounted = true;
    const runAsync = async () => {
        try {
            if (mounted) {
              let params = queryStringParse(location.search);
              if (params) {
                setReset({
                  email: params.email,
                  token: params.token,
                  readOnly: true
                })
              }
            }
        } catch (e) {
            if (mounted) {
                throw e
            }
        }
    }
    runAsync();
    return () => mounted = false;
  }, []);

  function queryStringParse (string) {
    let parsed = {}
    if(string != '') {
        string = string.substring(string.indexOf('?')+1)
        let p1 = string.split('&')
        p1.map(function(value) {
            let params = value.split('=')
            parsed[params[0]] = params[1]
        });
    }
    return parsed
}
  return (
    <AuthTemplate
      type={"reset"}
      labelAction={"Đồng ý"}
      history={history}
      resetInfo={reset}
      match={match}
    />
  );
}
export default withRouter(ResetView)
