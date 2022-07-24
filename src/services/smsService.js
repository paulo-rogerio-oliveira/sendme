import { serviceUtils } from "./serviceUtils";
import { useAuth } from "../hooks/useAuth";

export const smsService = ()=>{


     const {user: authenticatedUser} = useAuth();

     const addSmsConfiguration = async (value) =>{

        try {

            const response = await fetch(`${process.env.REACT_APP_API}`, {method: "POST", headers: serviceUtils.getDefaultHeaders(authenticatedUser), body: JSON.stringify(value)});        
            return serviceUtils.getResultWrraper(response.status, response);

        } catch (error) {

            return serviceUtils.getResultWrraper(400, error);

        }

    }

    const listSmsConfiguration= async()=>{
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API}`, {method: "GET", headers: serviceUtils.getDefaultHeaders(authenticatedUser)});
            return serviceUtils.getResultWrraper(response.status, response);

        } catch (error) {

            return serviceUtils.getResultWrraper(400, error);

        }

    }

    const removeSmsConfiguration = async(removeID)=>{


        try {
            
            const response = await fetch(`${process.env.REACT_APP_API}`, {method: "DELETE", headers: serviceUtils.getDefaultHeaders(authenticatedUser,"remove"), body: JSON.stringify({ id: removeID, })});
            return serviceUtils.getResultWrraper(response.status, response);

        } catch (error) {

            return serviceUtils.getResultWrraper(400, error);

        }
    }

    return {addSmsConfiguration, removeSmsConfiguration, listSmsConfiguration,};

}

