import axios from "axios";
import React from "react";
import { createContext, useContext } from "react";
import { useSelector } from "react-redux";

let operationsAllowed = {};

const HttpApiServiceContext = createContext(operationsAllowed);

export const HttpApiServiceProvider = (props: any) => {
 
  React.useEffect(() => {

    axios.interceptors.request.use(function (config) {
      // Do something before request is sent
      // console.log(config,"intecterc req")
      return config;
    }, function (error) {
      // Do something with request error
      // console.log(error,"intecterc req err")
      // return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log(response,"intercepto resp ")
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      // console.log(error,"intercepto resp err")
      return Promise.reject(error);
    });
  },[])

  const bearerToken = useSelector((state: any) => state.tokenReducer.token);
  const BASE_URL = process.env.REACT_APP_API_URL;
  // const BASE_URL = '';

  const getHeaders = () => {
    return {
      headers: {
        Authorization: "Bearer " + bearerToken,
        'app-id':'com.example.app',
      },
    };
  };

  const handleError = (error: Error) => {
    let errorMessage = "Something went wrong, Please try after sometime.";
    const err: any = { ...error };
    if (err?.response?.data?.message) {
      errorMessage = err?.response?.data?.message;
    } else {
      const { message } = error;
      errorMessage = message;
    }
    return errorMessage;
  };

  const get = (path: string, header = getHeaders()) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${BASE_URL}${path}`, header)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  };

  const patch = (path: string, data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(`${BASE_URL}${path}`, data, getHeaders())
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  };

  const post = (path: string, data: any, headers = getHeaders()) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${BASE_URL}${path}`, data, headers)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(handleError(error));
        });
    });
  };

  const remove = (path: string, headers = getHeaders()) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${BASE_URL}${path}`, headers)
        .then((response:any) => {
          resolve(response);
        })
        .catch((error:any) => {
          reject(handleError(error));
        });
    });
  };

  operationsAllowed = {
    get,
    patch,
    post,
    remove,
  };

  return (
    <HttpApiServiceContext.Provider value={operationsAllowed}>
      {props.children}
    </HttpApiServiceContext.Provider>
  );
};

export const useHttpApiService = () => {
  return useContext(HttpApiServiceContext);
};
