import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = () => {
  const guestLinks = (
	<ul className='navbar'>
	  <li className='nav-item'>
		<Link className='nav-link' to='/'>Home</Link>
	  </li>
	  <li className='nav-item'>
		<Link className='nav-link' to='/register'>Sign up</Link>
	  </li>
	  <li className='nav-item'>
		<Link className='nav-link' to='/login'>Login</Link>
	  </li>
	</ul>
  );

  const authLinks = (
	<ul className='navbar-nav'>
	  <li className='nav-item'>
		<Link className='nav-link' to='/profile'>Profile</Link>
	  </li>
	  <li className='navbar-nav'>
		<Link className='nav-link' to='/reserve'>Reserve</Link>
	  </li>
	</ul>
  );

  return (
	<>
	  {guestLinks}


	</>
  )

};

export default Navbar;
