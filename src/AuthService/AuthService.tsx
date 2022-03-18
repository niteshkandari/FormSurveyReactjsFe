
export function checkAutoLogin(dispatch:any) {
 let tokeninLocalStorage = localStorage.getItem('token');
 if(!tokeninLocalStorage){
  return; 
 }
  dispatch({type:"store-token",payload:tokeninLocalStorage})  
}

export function checkUserIsLoggedIn() {
    let tokeninLocalStorage = localStorage.getItem('token');
    if(tokeninLocalStorage){
        return true;
    }
    return false; 
}

export function logOutUser(dispatch:any) {
    dispatch({type:"delete-token",payload:"token"})
    dispatch({type:'RESET-ID'})
}