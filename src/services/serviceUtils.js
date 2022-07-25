
/**
 * 
 * @param  responseStatus  wrapper API object error for validation
 * @returns 
 */
const getResultWrraper = (responseStatus, response)=> {


    /* error in client side */
    if(responseStatus > 399 ) {
        
        if(response.errors){

            response.errors.hasErrors = true;
            return response.errors;
        }
        else{

            let errors = {hasErrors:true};

            if(response.message) {

                errors.general = [response.message] ;
                console.log(response.stack);

            } else {

                errors.general = ["Request error"] ;

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

