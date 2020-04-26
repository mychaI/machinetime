import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../Auth';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TypoGraphy from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Info, LockOpen, Edit, Event, AccountBox, Schedule, ExitToApp } from '@material-ui/icons';

const useStyles = makeStyles({
  navbar: {
	backgroundColor: '#263238',
	display: 'flex',
  },
  title: {
	fontSize: '28px',
	flex: 1,
  },
  titleLink: {
	color: '#fff',
	fontFamily: 'roboto',
	textDecoration: 'none'
  },	
  links: {
	color: '#fff',
	fontSize: '20px',
	fontFamily: 'roboto',
	textDecoration: 'none',
  },
  logout: {
	cursor: 'pointer',
  }
});


const Navbar = props => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);

  const handleLogout = e => {
	e.preventDefault();
	localStorage.removeItem('user');
	localStorage.removeItem('jwt');
	authContext.setUser(null);
  }

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
		  <Link to='/reserve' className={classes.links}>
			Reserve <Schedule />
		  </Link>
		</TypoGraphy>
	  </ListItemText>

	  <ListItemText inset>
		<TypoGraphy color='inherit' variant='subtitle1'>
		  <Link to='/profile' className={classes.links}>
			 Profile <AccountBox />
		  </Link>
		</TypoGraphy>
	  </ListItemText>

	  <ListItemText inset>
		<TypoGraphy color='inherit' variant='subtitle1'>
		  <a className={[classes.links, classes.logout].join(' ')} onClick={handleLogout}>
		    Log Out <ExitToApp />
		  </a>
		</TypoGraphy>
	  </ListItemText>


	</>
  );

  return (
	<>
	  <AppBar className={classes.navbar} position='static'>
		<Toolbar>
		  <TypoGraphy variant='h1' className={classes.title}>
		    <Link to='/' className={classes.titleLink}>
			  MachineTime
			</Link>
		  </TypoGraphy>

		  <List component='nav'>
			<ListItem component='div'>

			  <ListItemText inset>
				<TypoGraphy color='inherit' variant='subtitle1'>
				  <Link to='/about' className={classes.links}>
					About <Info />
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
			
			  {authContext.user ? authLinks : guestLinks}

			</ListItem>
		  </List>
		</Toolbar>
	  </AppBar>
	</>

  )

};

export default Navbar;
