// Libs
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Onboarding
import Login from '../screens/onboarding/Login/LoginScreen';
import ResetPasswordCode from '../screens/onboarding/Login/ResetPasswordCode';
import NewPassowrdScreen from '../screens/onboarding/Login/NewPasswordScreen';
import ResetPasswordEmailScreen from '../screens/onboarding/Login/ResetPasswordScreen';
import CreateUserScreen from '../screens/onboarding/User/CreateUserScreen';

// Dashboard
// import Dashboard from '../screens/dashboard/index';
import DocumentsScreen from '../screens/dashboard/Documents/DocumentsScreen';
import OrganizationScreen from '../screens/dashboard/Organization/OrganizationScreen';
import ModalSucessfully from '../screens/dashboard/Organization/ModalSucessfully';

import PrivateRoute from './PrivateRoute';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Login} />
			<Route exact path='/OSC-Legal' component={Login} />

			<Route path='/resetcode' component={ResetPasswordCode} />
			<Route path='/resetpassword' component={ResetPasswordEmailScreen} />
			<Route path='/newpassword' component={NewPassowrdScreen} />
			<Route path='/createuser' component={CreateUserScreen} />

			<Route path='/sucessfully' component={ModalSucessfully} />
			<PrivateRoute path='/organizations' component={OrganizationScreen} />
			<Route path='/documents' component={DocumentsScreen} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
