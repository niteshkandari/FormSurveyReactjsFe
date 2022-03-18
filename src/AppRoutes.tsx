import React,{ lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { checkAutoLogin } from "./AuthService/AuthService";
import ProtectedRoute from "./protectedRoutes";
 
const AuthContainer = lazy(() => import("./components/Auth/AuthContainer"));
const HomeContainer = lazy(() => import("./components/Home/HomeContainer"));


export const AppRoutes  = () => { 
    const dispatch = useDispatch();
    
    useEffect(() => {
      checkAutoLogin(dispatch);
    }, []);
    
    return (
        <Switch>
         <Route path="/auth" component={AuthContainer} />
         <ProtectedRoute path="/home" component={HomeContainer} />
         <Redirect exact path="/" to="/auth" />
        </Switch>
    )
}