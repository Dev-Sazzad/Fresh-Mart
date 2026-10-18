import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoutes from '../../core/PrivateRoutes';
import Profiles from './components/profiles.component';

function ProfileRoutes() {
	const { path } = useRouteMatch();

	return (
		<Switch>
			<PrivateRoutes path={`${path}/profiles`} component={Profiles} />
		</Switch>
	);
}

export default ProfileRoutes;