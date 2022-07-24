import { useEffect, useState } from "react";
import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import TextLine from "../../components/TextLine/TextLine";

const SmsEdit = ()=>{



    const {id} = useParams();
    const [applicationName, setApplicationName] = useState("");
    const [applicationProvider, setApplicationProvider] = useState("");
    const {user} = useSelector( (state) => state.user );
    


    const loadModelByID = async ()=>{

        try {
            const response= await fetch(`${URL}/sms/FindByID?id=${id}`);
            const loadedObject = await response.json();
            setApplicationName(loadedObject.applicationName);
            setApplicationProvider(loadedObject.providerName); 
            console.log(loadedObject);
        } catch (error) {
            console.log(error);
        }


    }

    useEffect(()=>{

        loadModelByID(id);

    }, []);

    return (
    <div className="smsEditContainer">

        <h2>Setup from {`${user.login}`}</h2>
        <div className="row">
            <TextLine state={ setApplicationName } inputValue={applicationName} inputId="applicationName" inputLabel="Name" inputName="applicationName" inputPlaceHolder="type your application name"  />
        </div>

        <div className="row">
            <TextLine state={ setApplicationProvider} inputValue={applicationProvider} inputId="applicationProvider" inputLabel="Provider" inputName="applicationProvider" inputPlaceHolder="Type your application provider" />
        </div>

    </div>
    );

}

export default SmsEdit;