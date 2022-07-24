import React, { useState } from 'react'
import { Form, FormGroup, Button } from 'reactstrap';
import TextLine from '../../components/TextLine/TextLine';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { smsService } from '../../services/smsService';
import { useAuth } from '../../hooks/useAuth';
import ValidationMessage from '../../components/validation/ValidationMessage';

const SmsAdd = ()=>{


    const [applicationName, setApplicationName] = useState("");
    const [applicationProvider, setApplicationProvider] = useState("");
    const {errors} = useSelector((state)=> state.user);
    const { user} = useAuth();
    const service = smsService();


    const AddSms = async ()=>{

        await service.addSmsConfiguration({ApplicationName: applicationName, ProviderName: applicationProvider,}, user)
             
               
    }



    const HandleSave = (e)=>{

        e.preventDefault();
        AddSms();
        Reset();
    }

    const Reset= ()=>{
        
        setApplicationName("");
        setApplicationProvider("");

    }


    return(

        <div> 
            
            <Form>
                <FormGroup>
                    <TextLine state={setApplicationName}  inputValue={applicationName}   inputId="applicationName"  inputLabel="Application name"   inputName="applicationName" inputPlaceHolder="Type your application name"   />
                    <ValidationMessage collection={errors} hasError={errors} property="ApplicationName" />
                </FormGroup>
               
                <FormGroup>
                    <TextLine state={setApplicationProvider} inputValue={applicationProvider} inputId="applicationProvider" inputLabel="Application provider" inputName="applicationProvider" inputPlaceHolder="Type your application provider"  />
                    <ValidationMessage collection={errors} hasError={errors} property="ProviderName" />
                </FormGroup>       
                    

                <Button onClick={ (e)=>HandleSave(e) }>Save</Button>


            </Form>

        </div>

    );
}

export default SmsAdd;