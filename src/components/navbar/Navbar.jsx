import React from 'react';
import './Navbar.css';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='rightSide'>
        <h1 className='logo'>
          <RouterLink to='/'>DevWrite</RouterLink>
        </h1>
      </div>
      <div className='leftSide'>
        <ul className='navLinks'>
          <li className='nav-link'>
            <RouterLink to='/'>Home</RouterLink>
          </li>
          <li className='nav-link'>
            <ScrollLink
              to="all-articles"  // matches the id
              smooth={true}       // smooth scrolling
              duration={1500}      // duration in ms
              offset={50}        // optional offset for fixed navbar
            >
              Explore
            </ScrollLink>
          </li>
          <li className='nav-link'>
            Login
          </li>
        </ul>

        {/* Button with Link */}
        <button className='button-primary'>
          <RouterLink className='button-link' to='/create-article'>Start Writing</RouterLink>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
