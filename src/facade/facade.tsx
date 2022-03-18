import React,{ createContext, useContext } from "react";
import { useHttpApiService } from "../services/Http.Api.service";
import { API_URL } from "./models/api-urls-enum";

let callers = {};

const FacadeContext = createContext(callers);

export const FacadeLayerProvider = (props:any) => {
    const httpApiService:any = useHttpApiService();
    
    const createForm = (requestBody:any) =>{
      let url = API_URL.CREATE_FORM;
      return httpApiService.post(url, requestBody);
    }

    const getAllForms = () => {
        let url = API_URL.GET_ALL_FORMS;
        return httpApiService.get(url)
    }
    const deleteForm = (requestId:number) => {
        let url = API_URL.DELETE_FORM+'/'+requestId;
        return httpApiService.remove(url)
    }
    const updateForm = (request:{id:number,body:any}) => {
        let url = API_URL.UPDATE_FORM+'/'+request.id;
        return httpApiService.patch(url,request.body)
    }
    const getFormById = (id:number) => {
         let url = API_URL.GET_FORM_BY_ID+'/'+id;
         return httpApiService.get(url);
    }

    callers = {
        createForm,
        getAllForms,
        deleteForm,
        updateForm,
        getFormById
    }
    return (
        <FacadeContext.Provider value={callers}>
            {props.children}
        </FacadeContext.Provider>    
    );
};

export const useFacade = () => {
    return useContext(FacadeContext);
}