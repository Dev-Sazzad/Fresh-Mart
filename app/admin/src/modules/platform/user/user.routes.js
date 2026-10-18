import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import Users from './components/users.component';
import UserManagement from './components/user-management.component';
import PrivateRoutes from '../../core/PrivateRoutes';

function UserRoutes() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<PrivateRoutes exact path={path} component={UserManagement} />
			{/* <PrivateRoutes path={`${path}/users/:id/update`} component={UpdateUser} />
			<PrivateRoutes path={`${path}/users/create`} component={UserForm} />
			<PrivateRoutes path={`${path}/users/:id`} component={UserDetails} /> */}
			<PrivateRoutes path={`${path}/users`} component={Users} />
		</Switch>
	);
}

export default UserRoutes;