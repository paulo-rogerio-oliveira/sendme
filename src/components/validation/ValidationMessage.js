import React from 'react';

const ValidationMessage = ({  collection,  property })=>{

    return (

        collection&&collection.hasErrors&&collection.errors[property]&&collection.errors[property].errors.map( 
            (e) => (<p key={e.errorMessage}>{e.errorMessage}</p>))
        
    );

}

export default ValidationMessage;