import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import Roles from './components/roles.component';
import PrivateRoutes from '../../core/PrivateRoutes';

function RoleRoutes() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<PrivateRoutes path={`${path}/roles`} component={Roles} />
		</Switch>
	);
}

export default RoleRoutes;