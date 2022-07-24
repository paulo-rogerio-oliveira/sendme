import React from 'react';
import './NavBar.css'


const NavBar = ({ brandName, children  })=>{


    return(

        <div className='nav'>
            <label>{brandName}</label>
            {children}

      </div>

    );

}

export default NavBar;