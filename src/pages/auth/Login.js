import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Row, Col} from 'reactstrap';
import TextLine from '../../components/TextLine/TextLine';
import { useDispatch } from 'react-redux/es/exports';
import { autenticate, reset } from '../../slices/userSlice';
import ValidationMessage from '../../components/validation/ValidationMessage';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Login = ()=>{


    const[login, setLogin] = useState("");
    const[password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {loading, errors, authenticated} = useAuth();
    const navigate= useNavigate();

    const executeLogin = ()=>{

        dispatch( autenticate({login: login, password: password})  );

    }

    useEffect( ()=>{

        reset();
        console.log(authenticated);
        authenticated &&navigate("/sms"); 

    },[authenticated]);


    return (

        <div>

            {loading&&<p>Working...</p>}
            <ValidationMessage collection={errors} hasError={errors} property="general" />
            <Form>

                <FormGroup>
                    <TextLine inputId="userLogin" inputLabel="Login" inputName="userLogin" inputPlaceHolder="Type your login"  state={setLogin} inputValue={login}    />
                    <ValidationMessage collection={errors} hasError={errors} property="login" />
                </FormGroup>

                <FormGroup>
                    <TextLine inputId="userPassword" inputLabel="Password" inputName="userPassword" inputPlaceHolder="Type your password"  state={setPassword} inputValue={password}  fieldType="password"  />
                    <ValidationMessage collection={errors} hasError={errors} property="password" />
                </FormGroup>
               
                <Row className='row justify-content-end'>
                    
                    <Col>
                        <Button onClick={ ()=> executeLogin()  }>Login</Button>
                    </Col>

                
                </Row>
                
                


            </Form>

           
            

        </div>

    );

}


export default Login;