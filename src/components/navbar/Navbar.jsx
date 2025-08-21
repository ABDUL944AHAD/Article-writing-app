import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='navbar'>
      <div className='rightSide'>
        <h1 className='logo'>DevWrite</h1>
      </div>
      <div className='leftSide'>
        <ul className='navLinks'>
          <li className='nav-link'><Link  to='/'>Home</Link></li>
          <li className='nav-link'>Explore</li>
          <li className='nav-link'>Login</li>
        </ul>

        {/* Button with Link */}
        <button className='button-primary'>
          <Link className='button-link' to='/create-article'>Start Writing</Link>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
