import { useRouteMatch, Switch } from "react-router-dom";
import PrivateRoutes from "../../core/PrivateRoutes";
import Permissions from "./components/permissions.component";

const PermissionRoutes = () => {
    const { path } = useRouteMatch();

    return (
        <Switch>
            <PrivateRoutes path={`${path}/permissions`} component={Permissions} />
        </Switch>
    );
}

export default PermissionRoutes;