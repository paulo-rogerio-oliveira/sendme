import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const AuthCondition = (props)=>{

    const {authenticated} = useAuth();

    const selectComponent = ()=>{
        
        const childs =React.Children.toArray(props.children);
          
        if(authenticated&& childs[0]&&childs[0].type.name ==="Signed"){
            return childs[0];

        } else if(authenticated&&childs[1]&&childs[1].type.name ==="Signed"){
            return childs[1];
        } else if(!authenticated&&childs[0]&&childs[0].type.name ==="Unsigned" )  {
            return childs[0];
           
        } else if(!authenticated&&childs[1]&&childs[1].type.name ==="Unsigned"){
            return childs[1];
        }

    }

    return selectComponent();

}

export default AuthCondition;