


const fillRequestErrors = (errorMessage) =>{
   
    const newObject = {hasErrors: true};
    newObject.errors = { general: { errors:   [{ errorMessage: errorMessage }] }}
    console.log(newObject);
    return newObject;

}

const fillRequestErrorsFromAPI = (apiErrors, response) =>{
    
    const newObject = {hasErrors: true};
    
    Object.entries(apiErrors).forEach(([key, value]) => {

            const newErrors = [];
            value.forEach(e=> newErrors.push({errorMessage: e}))

            if(!response.errors[key].errors){
                 newObject.errors = {};
                 newObject.errors[key] = { errors: newErrors};
                 
            }
                               

        });

    console.log(newObject);
    return newObject;

}

/**
 * 
 * @param  responseStatus  wrapper API object error for validation
 * @returns 
 */
const getResultWrraper = async (responseStatus, response)=> {

    let data = {};
    try {

        data = await response.json();

    } catch (error) {

        console.log(error);
        return fillRequestErrors("Request error");

    }
    

    /* error in client side */
    if(responseStatus > 399 ) {
    
        console.log(data);
    
        if(data.errors){

            return fillRequestErrorsFromAPI(data.errors, data)
        }
        else{

            return fillRequestErrors(data.message? data.message: "Request error");
                        
        }         

    }

    console.log(data);
    return data;

   
}

/**
 * Get default headers for use in API
 */
const getDefaultHeaders = (user) =>{

    const headers = {
            
        "Content-Type": "application/json",
        "Origin": "https://localhost:3000",


    } 

    if(user&&user.token){
       
        headers.Authorization = `Bearer ${user.token}`;

    }

    console.log(headers );
    return headers;

}

export const serviceUtils ={

    getResultWrraper,
    getDefaultHeaders,

}

