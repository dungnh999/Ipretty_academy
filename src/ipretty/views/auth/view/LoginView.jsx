import React, {useEffect} from 'react';
import { useHistory, withRouter} from "react-router-dom";
import AuthTemplate from 'ipretty/views/auth/templates/AuthTemplate'
import { useAuth } from 'ipretty/context/AppProvider';
import useNavigator from 'ipretty/hook/useNavigator';

function LoginView (props) {
	const history = useHistory();
	const {logout} = useAuth();
	const navigate = useNavigator();

	useEffect(() => {
		if(history.location.search && history.location.search === '?logout') {
			const redirect = history.location.pathname;
			logout(navigate, redirect);
		}
	},[history.location.search]);

	return (
		<AuthTemplate
			type={"login"}
			labelAction="Đăng nhập"
			history={history}
		/>
	);
}
export default withRouter(LoginView)
