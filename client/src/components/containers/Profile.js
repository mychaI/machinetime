import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth';
import axios from 'axios';
import moment from 'moment';

import { InputLabel, TextField, Button, IconButton, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { Delete, Save, Edit, Cancel } from '@material-ui/icons'

const Profile = props => {

  const authContext = useContext(AuthContext);

  const [reservations, setReservations] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [profile, setProfile] = useState(authContext.user);

  useEffect( () => {
	getReservations();
  }, []);

  const getReservations = () => {
	axios.get('/api/user/'+authContext.user.userID)
		 .then( res => {
		   const responseData = res.data.reservations;
		   const updatedReservations = [];
		   for (let i = 0; i < responseData.length; i++) {
			 updatedReservations.push(responseData[i].row.slice(1,-1).split(','));
		   };
		   setReservations(updatedReservations)
		 })
		 .catch( err => console.log('Err: ', err));
  }

  const handleChange = e => {
	setProfile({
	  ...profile,
	  [e.target.name]: e.target.value
	})
  };


  const cancelReservation = resId => {
	if (confirm('Are you sure you want to cancel this reservation?')) {
	  axios.delete('/api/reservation/'+resId)
		   .then( res => getReservations() )
		   .catch( err => console.log('Error: ', err));
	};
  };

  const active = reservations.filter( (res, i) => {
	return new Date(res[0]) >= Date.now();
  });

  const currentReservations = active.map( (res, i) => (
    <ListItem key={i} button divider>
	  <ListItemText> {moment(res[0]).format('ddd MMM DD YYYY HH:MM')} : {res[2]} for {moment.duration(moment(res[1]).diff(moment(res[0]))).asHours().toFixed(1)} hours </ListItemText>
	  <IconButton className='cancel-button' size='small' data-id={res.id} onClick={() => cancelReservation(res[4])} aria-label='Cancel this reservation'> <Cancel fontSize='inherit'/> </IconButton>
	</ListItem>
  ));

  const done = reservations.filter( (res, i) => {
	return new Date(res[0]) < Date.now();
  });

  const pastReservations = done.map( (res, i) => (
    <ListItem key={i} button divider>
	  <ListItemText> {moment(res[0]).format('ddd MMM DD YYYY HH:MM')} : {res[2]} for {moment.duration(moment(res[1]).diff(moment(res[0]))).asHours().toFixed(1)} hours </ListItemText>
	</ListItem>
  ));

  const toggleMode = () => setUpdateMode(!updateMode);

  const saveProfile = () => {
	const profileUpdates = {
	  email: profile.email,
	  first_name: profile.firstName,
	  last_name: profile.lastName,
	  phone: profile.phone
	}

	axios.put('/auth/update/' + authContext.user.userID, profileUpdates)
	  .then( res => console.log('Response ', res))
	  .catch( err => console.log('Error: ', err));
  };

  const updateProfile = (
	  <form>
		<InputLabel id='first-name-input'>First Name</InputLabel>
		<TextField placeholder={authContext.user.firstName} className='input' fullWidth variant='outlined' name='firstName' type='text' onChange={handleChange} value={profile.firstName} />
		<InputLabel id='last-name-input'>Last Name</InputLabel>
		<TextField placeholder={authContext.user.lastName} className='input' fullWidth variant='outlined' name='lastName' type='text' onChange={handleChange} value={profile.lastName} />
		<InputLabel id='phone-input'>Email</InputLabel>
		<TextField placeholder={authContext.user.email} className='input' fullWidth variant='outlined' name='email' type='text' onChange={handleChange} value={profile.email} />
		<InputLabel id='phone-input'>Phone Number</InputLabel>
		<TextField placeholder={authContext.user.phone} className='input' fullWidth variant='outlined' name='phone' type='text' onChange={handleChange} value={profile.phone} />
		<Button id='update-user' className='auth-button' color='primary' variant='contained' onClick={saveProfile} startIcon={<Save />}>Save Profile</Button>
		<Button id='update-user' className='auth-button' color='secondary' variant='contained' onClick={toggleMode} startIcon={<Cancel />}>Cancel</Button>
	  </form>
  );

  const displayProfile = (
	  <form>
		<InputLabel id='first-name-input'>First Name</InputLabel>
		<h2>{authContext.user.firstName}</h2>
		<InputLabel id='last-name-input'>Last Name</InputLabel>
		<h2>{authContext.user.lastName}</h2>
		<InputLabel id='email-input'>Email</InputLabel>
		<h2>{authContext.user.email}</h2>
		<InputLabel id='phone-input'>Phone Number</InputLabel>
		<h2>{authContext.user.phone}</h2>
		<Button id='update-user' className='auth-button' color='primary' variant='contained' onClick={toggleMode} startIcon={<Edit />}>Update Profile</Button>
	  </form>
  );

  return (
	<div id='profile'>
	  <div className='container'>
		<h1>User Profile</h1>
		{updateMode ? updateProfile : displayProfile}
		<h1>Current Reservations</h1>
		<List aria-label="Upcoming Reservations">
		  {currentReservations}
		</List>

		<h1>Past Reservations</h1>
		<List aria-label="Past Reservations">
		  {pastReservations}
		</List>


		<h1>Danger Zone</h1>
		<Button id='delete-user' className='auth-button' color='secondary' variant='contained' startIcon={<Delete />}>Delete Account</Button>
	  </div>
	</div>
  )
}

export default Profile;
