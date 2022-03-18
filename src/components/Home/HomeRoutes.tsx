import { lazy } from "react";
import ProtectedRoute from "../../protectedRoutes";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";

const Create = lazy(() => import("../Home/modules/Create"));
const Forms = lazy(() => import("../Home/modules/Forms"));
const Account = lazy(() => import("../Home/modules/Account"));

export const HomeRoutes = () => {
  const match = useRouteMatch();
  console.log(match);
  return (
    <Switch>
      <ProtectedRoute
        exact={true}
        path={match.path + "/edit/:id"}
        component={Create}
      />
      <ProtectedRoute
        exact={true}
        path={match.path + "/create"}
        component={Create}
      />
      <ProtectedRoute
        exact={true}
        path={match.path + "/Forms"}
        component={Forms}
      />
      <ProtectedRoute
        exact={true}
        path={match.path + "/Account"}
        component={Account}
      />
    </Switch>
  );
};
