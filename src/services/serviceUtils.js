
import {v4 as Guid} from 'uuid'

const fillRequestErrors = (errorMessage) =>{
    
    const guid = Guid();

    const newObject = {hasErrors: true};
    newObject.errors = { general: { errors:   [{ id: guid.slice(0,8), errorMessage }] }}
    console.log(newObject);
    return newObject;

}

const fillRequestErrorsFromAPI = (apiErrors) =>{
    
    const newObject = {hasErrors: true};
    newObject.errors = {};
    const guid = Guid();
    
    Object.entries(apiErrors).forEach(([key, value]) => {
        debugger
            const newErrors = [];

            if (value.errors){
                value.errors.forEach(e=> newErrors.push({ id: guid.slice(0,8), errorMessage: e.errorMessage}))
            } else {
                
                if(Array.isArray(value)){

                    value.forEach(e=> newErrors.push({id: guid.slice(0,8), errorMessage: e}))
                }
            }

            if(newErrors.length>0) newObject.errors[key] = { errors: newErrors};
                             

        });

    console.log(newObject);
    return newObject;

}

/**
 * Return json result or errors object padronized to application
 * @param  responseStatus  wrapper API object error for validation
 * @returns 
 */
const padronizeResponse = async (responseStatus, response)=> {

    
    /* error in client side */
    if(responseStatus > 399 ) {
    
        console.log(response);
    
        if(response.errors){

            return fillRequestErrorsFromAPI(response.errors)
        }
        else{

            return fillRequestErrors(response.message? response.message: "Request error");
                        
        }         

    }

    return response;
   
}

/**
 * Get default headers for use in API
 */
const getDefaultHeaders = (user) =>{

    const headers = {
            
    } 

    headers["Content-Type"] = "application/json";
    headers["Accept"] = "*/*";
    

    if(user&&user.token){
       
        headers["Authorization"]= `Bearer ${user.token}`;
    }

    console.log(headers );
    return headers;

}

export const serviceUtils ={

    padronizeResponse,
    getDefaultHeaders,

}

