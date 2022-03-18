import React,{ createContext, useContext } from "react";
import { useHttpApiService } from "../services/Http.Api.service";
import { API_URL } from "./models/api-urls-enum";

let callers = {};

const AuthContext = createContext(callers);

export const AuthProvider = (props:any) => {
    const httpApiService:any = useHttpApiService();
    
    const login = (requestBody:{email:string, password:string}) =>{
      let url = API_URL.LOG_IN;
      return httpApiService.post(url, requestBody);
    }

    const signUp = (requestBody:{email:string, password:string}) => {
        let url = API_URL.SIGN_UP;
        return httpApiService.post(url, requestBody);
    }

    callers = {
        login,
        signUp
    }
    return (
        <AuthContext.Provider value={callers}>
            {props.children}
        </AuthContext.Provider>    
    );
};

export const useAuthFacade = () => {
    return useContext(AuthContext);
}