import { createStore, combineReducers } from "redux";

const tokenReducer = (
  state: { token: string } = { token: "" },
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "store-token":
      localStorage.setItem("token", action.payload);
      return { token: (state.token = action.payload) };
    case "delete-token":
      localStorage.removeItem("token");
      return { token: (state.token = "") };
    default:
      return state;
  }
};

const userReducer = (
  state:{id:string} = {id:""} ,
  action:{type:string, payload:any}
) => {
 switch (action.type) {
   case 'SET-ID':
     return {id: state.id = action.payload};
   case 'RESET-ID':
     return {id: state.id = ""};
   default: 
      return state;    
  }
};

const store = createStore(combineReducers({tokenReducer,userReducer}));

export default store;
