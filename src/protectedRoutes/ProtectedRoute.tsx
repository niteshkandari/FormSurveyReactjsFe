import { Redirect, Route } from "react-router-dom";
import { checkUserIsLoggedIn } from "../AuthService/AuthService";

type ProtectedTypes = {
  component: any;
  path: string;
  exact?: boolean;
};

const ProtectedRoute = ({
  component: Component,
  path,
  ...rest
}: ProtectedTypes) => {

  return (
    <Route
      {...rest}
      render={(props) => {
        if (checkUserIsLoggedIn()) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{ pathname: "/auth", state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
