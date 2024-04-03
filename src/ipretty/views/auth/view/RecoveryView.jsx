import React from 'react';
import {Redirect, withRouter} from "react-router-dom";
import AuthTemplate from 'ipretty/views/auth/templates/AuthTemplate'

function RecoveryView (props) {
  const {history, context} = props;

  return (
    <AuthTemplate
      type={"recovery"}
      labelAction="Gửi mã"
      context={context}
      history={history}
    />
  );
}
export default withRouter(RecoveryView)
