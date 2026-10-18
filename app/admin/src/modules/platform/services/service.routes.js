import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';
import PrivateRoutes from '../../core/PrivateRoutes';
import Services from './components/services.component';

function ServiceRoutes() {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoutes path={`${path}/services`} component={Services} />
        </Switch>
    );
}

export default ServiceRoutes;