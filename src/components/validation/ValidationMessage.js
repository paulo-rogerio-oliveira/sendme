import React from 'react';

const ValidationMessage = ({ hasError, collection,  property })=>{

    return (

        hasError&&collection[property]&&collection[property].map( 
            (e) => (<p key={e}>{e}</p>))
        
    );

}

export default ValidationMessage;