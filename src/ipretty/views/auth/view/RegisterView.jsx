import { useAuth } from 'ipretty/context/AppProvider';
import useNavigator from 'ipretty/hook/useNavigator';
import React, { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import AuthTemplate from 'ipretty/views/auth/templates/AuthTemplate'


const RegisterView = () => {
    const history = useHistory();
    const { logout } = useAuth();
    const navigate = useNavigator();

    useEffect(() => {

        if (history.location.search && history.location.search === '?logout') {
            const redirect = history.location.pathname + history.location.search;
            logout(navigate, redirect);
        }
    }, [history.location.search]);

    return (
        <AuthTemplate
            type={"register"}
            labelAction="Đăng ký"
            history={history}
        />
    );
}

export default withRouter(RegisterView);
