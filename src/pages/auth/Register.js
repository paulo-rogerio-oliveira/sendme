import React, { useEffect } from 'react';
import { useState } from "react";
import { Form, FormGroup } from 'reactstrap';
import TextLine from "../../components/TextLine/TextLine";
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { reset, register } from '../../slices/userSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {useNavigate} from 'react-router-dom';
import ValidationMessage from '../../components/validation/ValidationMessage';
import {Button} from 'reactstrap';

const Register = ()=>{


    const[login, setLogin] = useState("");
    const[password, setPassword] = useState("");
    const[mail, setMail] = useState("");
    const dispatch = useDispatch();
    const {loading, autenticated, errors} = useSelector( (state) => state.user);
    const navigate = useNavigate();

    useEffect( () =>{

        reset();
        autenticated&&navigate("/sms");


    }, [autenticated]);


    const handleRegister = () =>{

        dispatch( register({login: login, password: password, email: mail}));

    }

    return (

        <div>
            {loading && <p>working...</p>}
            <ValidationMessage collection={errors} hasError = {errors} property="general" />
            <Form>
                <FormGroup>
                    <TextLine inputId="userLogin" inputLabel="Login" inputName="userLogin" inputPlaceHolder="Type your login"  state={setLogin} inputValue={login}    />
                    <ValidationMessage collection={errors} hasError = {errors} property="login" />
                </FormGroup>

                <FormGroup>
                    <TextLine inputId="userPassword" inputLabel="Password" inputName="userPassword" inputPlaceHolder="Type your password"  state={setPassword} inputValue={password}  fieldType="password"  />
                    <ValidationMessage collection={errors} hasError = {errors} property="password" />
                </FormGroup>

                <FormGroup>
                    <TextLine inputId="userMail" inputLabel="Email" inputName="serEmail" inputPlaceHolder="Type your email"  state={setMail} inputValue={mail} fieldType="email"   />
                    <ValidationMessage collection={errors} hasError = {errors} property="email" />
                </FormGroup>

                <Button onClick={ ()=> handleRegister()  }>Register</Button>
            </Form>
            
            

        </div>

    );

}

export default Register;