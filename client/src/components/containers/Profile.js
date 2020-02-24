import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth';
import axios from 'axios';
import moment from 'moment';

import { InputLabel, TextField, Button } from '@material-ui/core';
import { Delete, Save, Edit, Cancel } from '@material-ui/icons'

const Profile = props => {

  const authContext = useContext(AuthContext);

  const [reservations, setReservations] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);

  useEffect( () => {
	axios.get('/api/user/'+authContext.user.userID)
		 .then( res => {
		   const responseData = res.data.reservations;
		   const updatedReservations = [...reservations];
		   for (let i = 0; i < responseData.length; i++) {
			 updatedReservations.push(responseData[i].row.slice(1,-1).split(','));
		   };
		   setReservations(updatedReservations)
		 })
		 .catch( err => console.log('Err: ', err));
  }, []);


  const active = reservations.filter( (res, i) => {
	return new Date(res[0]) >= Date.now();
  });


  const currentReservations = active.map( (res, i) => (
    <li key={i}>{moment(res[0]).format('ddd MMM DD YYYY HH:MM')} : {res[2]} for {moment.duration(moment(res[1]).diff(moment(res[0]))).asHours().toFixed(1)} hours</li>
  ));

  const done = reservations.filter( (res, i) => {
	return new Date(res[0]) < Date.now();
  });

  const pastReservations = done.map( (res, i) => (
    <li key={i}>{moment(res[0]).format('ddd MMM DD YYYY HH:MM')} : {res[2]} for {moment.duration(moment(res[1]).diff(moment(res[0]))).asHours().toFixed(1)} hours</li>
  ));

  const toggleMode = () => setUpdateMode(!updateMode);

  const updateProfile = (
	  <form>
		<InputLabel id='first-name-input'>First Name</InputLabel>
		<TextField placeholder={authContext.user.firstName} className='input' fullWidth variant='outlined' name='first_name' type='text' />
		<InputLabel id='last-name-input'>Last Name</InputLabel>
		<TextField placeholder={authContext.user.lastName} className='input' fullWidth variant='outlined' name='first_name' type='text' />
		<InputLabel id='phone-input'>Phone Number</InputLabel>
		<TextField placeholder={authContext.user.phone} className='input' fullWidth variant='outlined' name='first_name' type='text' />
		<Button id='update-user' className='auth-button' color='primary' variant='contained' onClick={() => console.log('TODO: create save handler')} startIcon={<Save />}>Save Profile</Button>
		<Button id='update-user' className='auth-button' color='default' variant='contained' onClick={toggleMode} startIcon={<Cancel />}>Cancel</Button>
	  </form>
  );

  const displayProfile = (
	  <form>
		<InputLabel id='first-name-input'>First Name</InputLabel>
		<h2>{authContext.user.firstName}</h2>
		<InputLabel id='last-name-input'>Last Name</InputLabel>
		<h2>{authContext.user.lastName}</h2>
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
		<ul>
		  {currentReservations}
		</ul>

		<h1>Past Reservations</h1>
		<ul>
		  {pastReservations}
		</ul>


		<h1>Danger Zone</h1>
		<Button id='delete-user' className='auth-button' color='secondary' variant='contained' startIcon={<Delete />}>Delete Account</Button>
	  </div>
	</div>
  )
}

export default Profile;
