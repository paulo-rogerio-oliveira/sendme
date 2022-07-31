import { serviceUtils } from "./serviceUtils";
import { useAuth } from "../hooks/useAuth";

export const smsService = ()=>{


     const {user: authenticatedUser} = useAuth();

     const addSmsConfiguration = async (value) =>{

        try {

            const response = await fetch(`${process.env.REACT_APP_API}`, {method: "POST", headers: serviceUtils.getDefaultHeaders(authenticatedUser), body: JSON.stringify(value)});        
            const data = await response.json();
            const result =  serviceUtils.padronizeResponse(response.status, data);
            return result;

        } catch (error) {

            return serviceUtils.padronizeResponse(400, error);

        }

    }

    const listSmsConfiguration= async()=>{
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API}`, {   method: "GET", headers: serviceUtils.getDefaultHeaders(authenticatedUser)});
            console.log(response);
            const data = await response.json();
            const result =  serviceUtils.padronizeResponse(response.status, data);
            return result;

        } catch (error) {

            return serviceUtils.padronizeResponse(400, error);

        }

    }

    const removeSmsConfiguration = async(removeID)=>{


        try {
            
            const response = await fetch(`${process.env.REACT_APP_API}`, {method: "DELETE", headers: serviceUtils.getDefaultHeaders(authenticatedUser), body: JSON.stringify({ id: removeID, })});
            const data = await response.json();
            const result =  serviceUtils.padronizeResponse(response.status, data);
            return result;

        } catch (error) {

            return serviceUtils.padronizeResponse(400, error);

        }
    }

    return {addSmsConfiguration, removeSmsConfiguration, listSmsConfiguration,};

}

