import { serviceUtils } from "./serviceUtils";
/**
 * Login an user in app
 */
const autenticate = async(user) =>{

 
    try {
        
        console.log(JSON.stringify(user));
        const response = await fetch(`${process.env.REACT_APP_API_AUTH}`,  {  method: "POST",  headers: serviceUtils.getDefaultHeaders(), body: JSON.stringify(user)  });
        const data = serviceUtils.getResultWrraper(response.status, response);

        if(data.token){

            localStorage.setItem("user", data);
        }

        return data;

    } catch (error) {
        return serviceUtils.getResultWrraper(400, error);
    }




}


/***
 * Register user in server
 */
const register = async(user)=>{

    try {


        const response = await fetch(`${process.env.REACT_APP_API_AUTH}`, {method: "PUT", headers: serviceUtils.getDefaultHeaders(), body: JSON.stringify(user)});
        const data = serviceUtils.getResultWrraper(response.status, response);
        
        return data;

        
    } catch (error) {
        return serviceUtils.getResultWrraper(400, error);
      
    }


}





export const userService ={

    autenticate,
    register,

}
