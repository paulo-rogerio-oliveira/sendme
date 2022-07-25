import React from 'react';
import './NavBar.css'


const NavBar = ({ brandName, children  })=>{


    return(

        <div className='nav'>
            <span>{brandName}</span>
            {children}

      </div>

    );

}

export default NavBar;