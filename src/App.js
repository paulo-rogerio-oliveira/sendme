/* Components */
import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { NavLink } from 'react-router-dom';

/* Icons */
import {FaSms} from 'react-icons/fa';
import {MdOutlineEmail} from 'react-icons/md';
import {SiWebrtc} from 'react-icons/si';

/* hooks */
import {logout} from './slices/userSlice';
import { useDispatch } from 'react-redux/es/exports';

/* App componentes */

import Navbar from './components/navbar/NavBar';
import AuthCondition from './components/authCondition/AuthCondition';
import Signed from './components/authCondition/Signed';
import Unsigned from './components/authCondition/Unsigned';


/* Pages from app */
import Login from './pages/auth/login/Login';
import Register from './pages/auth/register/Register';
import SmsAdd from './pages/sms/SmsAdd';
import SmsEdit from './pages/sms/SmsEdit';
import SmsList from './pages/sms/SmsList';

/* Css imports */
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';




function App(){

  const dispatch = useDispatch();
  
  return (
   <BrowserRouter>
    
    <Navbar brandName = "Send-Me API" >      

        <div className='actions'>

          <AuthCondition>
            <Unsigned>
              <NavLink to="/register" >
                <span>Register</span>
              </NavLink>
            </Unsigned>  
          </AuthCondition>        


          <AuthCondition>
            <Unsigned>
              <NavLink to="/login">
                <span >Login</span>
              </NavLink>
            </Unsigned>
          </AuthCondition>        

          <AuthCondition>
            <Signed>
             
              <NavLink onClick={()=>dispatch(logout())}  to="/login">
                <span >Logout</span>
              </NavLink>

              <button tag="Setup your sms notification" ><FaSms /></button>
              <button tag="Setup your email notification"><MdOutlineEmail /></button>
              <button tag="Setup your web push notification 3"><SiWebrtc /></button>
            </Signed>  
          </AuthCondition>        

        </div>
    </Navbar>
    <div className='App-header'>


      <Routes>
          
          <Route  path='/'  element={<Login />} />
          <Route  path='/login'  element={<Login />} />
          <Route  path='/register' element={<Register />} />
          <Route  path='/sms' element={<SmsList />} />
          <Route path='/sms/add' element={<SmsAdd />} />
          <Route path='/sms/edit/:id' element={<SmsEdit />} />

      </Routes>
      
    </div>
   </BrowserRouter>

 
  
  );
}

export default App;
