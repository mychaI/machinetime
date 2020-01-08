import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, AccountBox, Create } from '@material-ui/icons';
import blueGrey from '@material-ui/core/colors/blueGrey';

const primary = blueGrey[500];
const light = blueGrey[200];
const dark = blueGrey[700];

const Navbar = props => {
  const guestLinks = (
	<>
	  <AppBar color='primary' position='static'>
		<Toolbar>
		  <TypoGraphy variant='h5' color='inherit'>
			MachineTime
		  </TypoGraphy>

		  <List component='nav'>
			<ListItem component='div'>

			  <ListItemText inset>
				<TypoGraphy color='inherit' variant='h5'>
				  <Link to='/'>
					Home <Home />
				  </Link>
				</TypoGraphy>
			  </ListItemText>

			  <ListItemText inset>
				<TypoGraphy color='inherit' variant='h5'>
				  <Link to='/login'>
					Log In <AccountBox />
				  </Link>
				</TypoGraphy>
			  </ListItemText>

			  <ListItemText inset>
				<TypoGraphy color='inherit' variant='h5'>
				  <Link to='/signup'>
					Sign Up <Create />
				  </Link>
				</TypoGraphy>
			  </ListItemText>

			</ListItem>
		  </List>
		</Toolbar>
	  </AppBar>
	</>
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
