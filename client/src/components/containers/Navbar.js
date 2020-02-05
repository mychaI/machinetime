import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../Auth';

import { AuthContext } from '../../Auth';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, LockOpen, Edit, Event, AccountBox, Schedule } from '@material-ui/icons';

const useStyles = makeStyles({
  navbar: {
	backgroundColor: '#263238',
  },
  title: {
	fontSize: '28px',
	fontFamily: 'roboto',
  },
  links: {
	color: '#fff',
	fontSize: '20px',
	fontFamily: 'roboto',
	textDecoration: 'none',
  }
});


const Navbar = props => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  const guestLinks = (
	<>
	  <ListItemText inset>
		<TypoGraphy color='inherit' variant='subtitle1'>
		  <Link to='/login' className={classes.links}>
			Log In <LockOpen /> 	
		  </Link>
		</TypoGraphy>
	  </ListItemText>

	  <ListItemText inset>
		<TypoGraphy color='inherit' variant='subtitle1'>
		  <Link to='/register' className={classes.links}>
			 Register <Edit />
		  </Link>
		</TypoGraphy>
	  </ListItemText>
	</>
  );

  const authLinks = (
	<>
	  <ListItemText inset>
		<TypoGraphy color='inherit' variant='subtitle1'>
		  <Link to='/profile' className={classes.links}>
			 Profile <AccountBox />
		  </Link>
		</TypoGraphy>
	  </ListItemText>

	  <ListItemText inset>
		<TypoGraphy color='inherit' variant='subtitle1'>
		  <Link to='/reserve' className={classes.links}>
			Reserve <Schedule />
		  </Link>
		</TypoGraphy>
	  </ListItemText>
	</>
  );

  return (
	<>
	  <AppBar className={classes.navbar} position='static'>
		<Toolbar>
		  <TypoGraphy variant='h1' className={classes.title}>
			MachineTime
		  </TypoGraphy>

		  <List component='nav'>
			<ListItem component='div'>

			  <ListItemText inset>
				<TypoGraphy color='inherit' variant='subtitle1'>
				  <Link to='/' className={classes.links}>
					Home <Home />
				  </Link>
				</TypoGraphy>
			  </ListItemText>

			  <ListItemText inset>
				<TypoGraphy color='inherit' variant='subtitle1'>
				  <Link to='/calendar' className={classes.links}>
					Calendar  <Event />
				  </Link>
				</TypoGraphy>
			  </ListItemText>
			
			  {user ? authLinks : guestLinks}

			</ListItem>
		  </List>
		</Toolbar>
	  </AppBar>
	</>

  )

};

export default Navbar;
