import React from 'react';

const ValidationMessage = ({  collection,  property })=>{

    return (

        collection&&collection.hasErrors&&collection[property]&&collection[property].map( 
            (e) => (<p key={e}>{e}</p>))
        
    );

}

export default ValidationMessage;