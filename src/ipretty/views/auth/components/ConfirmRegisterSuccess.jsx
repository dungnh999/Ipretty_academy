import { useAuth } from 'ipretty/context/AppProvider';
import useNavigator from 'ipretty/hook/useNavigator';
import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import AuthTemplate from 'ipretty/views/auth/templates/AuthTemplate';

function ConfirmRegisterSuccess(props) {
	const { history, context, location: {} } = props;
	const { logout } = useAuth();
	const navigate = useNavigator();
	const email = location.hash.substring(24, location.hash.indexOf('&'));
	const token = location.hash.substring(location.hash.lastIndexOf('en=') + 3, location.hash.lastIndexOf('&'));

	useEffect(() => {
		if(history.location.search && history.location.search === '?logout') {
			const redirect = history.location.pathname + history.location.search;
			logout(navigate, redirect);
			// logout(navigate);
		}
	},[history.location.search]);

	return (
			<AuthTemplate
				type={"confirmSuccess"}
				labelAction="Đăng nhập"
				context={context}
				history={history}
				emailPath={email}
				token={token}
			/>
	);
}
export default withRouter(ConfirmRegisterSuccess)
