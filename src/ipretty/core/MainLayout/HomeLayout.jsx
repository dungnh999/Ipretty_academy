import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from './AppLayout'
import ProfileLayout from './ProfileLayout'
import SplashScreen from "../router/SplashScreen"
import { useAuth } from '../../context/AppProvider';
import Home from "../../views/home/views/Home"


const UserProfileRoute = ({
	component: Component,
	...rest
	}) => {

	const RenderComponent = Component
	const context = useAuth();
	return (
		<Route
			{...rest}
			render={(props) =>
					(context.appReady ? (
						context.user ? (
							<ProfileLayout>
								<RenderComponent {...props}/>
							</ProfileLayout>
						) : (
							<Redirect to={{pathname: '/'}} />
						)
					): (
						<SplashScreen/>
						)
					)
			}
		/>
	)
}


const HomeLayout = () => {

	const {checkToken} = useAuth();

	React.useEffect(() => {
		checkToken();
	}, [])

	return (
			<AppLayout>
				<Switch>
					<UserProfileRoute exact path="/home" component={Home} />
				</Switch>
			</AppLayout>
	);
};


export default HomeLayout;
