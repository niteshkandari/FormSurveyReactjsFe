import React from "react";
import Auth from "./Auth";
import { AuthProvider } from "../../facade/AuthFacade";

const AuthContainer = () => {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
};

export default AuthContainer;
