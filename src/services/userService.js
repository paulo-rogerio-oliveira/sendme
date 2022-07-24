
/**
 * Login an user in app
 */
const autenticate = async(user) =>{

 
    try {
        
        const response = await fetch(`${process.env.REACT_APP_API_AUTH}`, { method: "POST", headers: { "Content-Type": "application/json"} , body: JSON.stringify(user)  });
    
        const data = await response.json();
    
        if(response.status === 422){

            if(!data.errors)
            console.log({errors: data});
            return { errors: data}
        }

        localStorage.setItem("user", JSON.stringify(data));
    
        return data;

    } catch (error) {
        let errors = { errors:{  general: ["Error in request."] }};
        return errors;
    }




}


/***
 * Register user in server
 */
const register = async(user)=>{

    try {

        const response = await fetch(`${process.env.REACT_APP_API_AUTH}`, {method: "PUT", headers: {"Content-Type": "application/json", "accept": "*/*"} , body: JSON.stringify(user)});

        const data = await response.json();
        
        if(response.status === 422){
            if(!data.errors){

                return { errors: data}
            }
        }
        
        return data;

        
    } catch (error) {
        let errors = { errors:{  general: ["Error in request."] }};
        return errors;
    }


}





export const userService ={

    autenticate,
    register,

}
