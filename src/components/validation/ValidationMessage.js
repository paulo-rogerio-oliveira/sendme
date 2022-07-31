import React from 'react';

const ValidationMessage = ({  collection,  property })=>{

    return (

        <p>
        {collection&&collection.hasErrors&&collection.errors[property]&&collection.errors[property].errors.map( 
            (e) => <span key={e.id}>{e.errorMessage}</span>)}
        </p>
    );

}

export default ValidationMessage;