
/**
 * 
 * @param  responseStatus  wrapper API object error for validation
 * @returns 
 */
const getResultWrraper = (responseStatus, response)=> {


    /* error in client side */
    if(responseStatus > 399 ) {
        
        if(!response.errors){

            let errors = {};

            if(response.message) {

                errors = { errors: { general: [response.message]}};
                console.log(response.stack);

            } else {

                errors = { errors:{  general: [response] }};

            } 
             
             return errors ;
        }         

    }

    return response.json();
}

/**
 * Get default headers for use in API
 */
const getDefaultHeaders = (user, method) =>{


  
    const headers = {
        
        "Content-Type": "application/json", 
        "accept": "*/*",
        "method": method,
        "Authorization": user&& `Bearer ${user.token}`,

    } 
    console.log(headers );
    return headers;

}

export const serviceUtils ={

    getResultWrraper,
    getDefaultHeaders,

}

