import React, { useEffect } from 'react';
import './TextLine.css';

const TextLine = ({inputValue="", state,  inputId, inputName, inputLabel, inputPlaceHolder, textColor = "#000", fieldType = "input"}) =>{

    const setColor = ()=>{

        const control = document.querySelector(":root");
        control.style.setProperty("--textColor", textColor);
       
        
    }

    useEffect( ()=>{

        setColor();

    },[])


    const selectInput = ()=> {


        switch (fieldType) {
        
        case "email":
            return <input type="email"  onChange={(e)=> { state(e.target.value) }}  value={inputValue} id={inputId} name={inputName} placeholder={inputPlaceHolder}  />

        case "password":
            return  <input type='password'  onChange={(e)=> { state(e.target.value) }}  value={inputValue} id={inputId} name={inputName} placeholder={inputPlaceHolder}  />    

        default:
            return  <input  onChange={(e)=> { state(e.target.value) }}  value={inputValue} id={inputId} name={inputName} placeholder={inputPlaceHolder}  />
        }

    }

return (


        
    <div className='formRow'> 
         
        {selectInput()}
        <label htmlFor={inputId} name={inputId}> {inputLabel} </label>                
    </div>

);

}

export default TextLine;