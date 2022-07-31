import { serviceUtils } from "./serviceUtils";
/**
 * Login an user in app
 */
const autenticate = async(user) =>{

 
    try {
        
        console.log(JSON.stringify(user));
        const response = await fetch(`${process.env.REACT_APP_API_AUTH}`,  {  method: "POST",  headers: serviceUtils.getDefaultHeaders(), body: JSON.stringify(user)  });
        const data = await response.json();
        const result = serviceUtils.padronizeResponse(response.status, response);

        if(result.token){

            localStorage.setItem("user", data);
        }

        return result;

    } catch (error) {
        return serviceUtils.padronizeResponse(400, error);
    }




}


/***
 * Register user in server
 */
const register = async(user)=>{

    try {


        const response = await fetch(`${process.env.REACT_APP_API_AUTH}`, {method: "PUT", headers: serviceUtils.getDefaultHeaders(), body: JSON.stringify(user)});
        const data = await response.json();
        const result = serviceUtils.padronizeResponse(response.status, data);
        
        return result;

        
    } catch (error) {
        return serviceUtils.padronizeResponse(400, error);
      
    }


}





export const userService ={

    autenticate,
    register,

}
