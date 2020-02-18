import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Auth';
import axios from 'axios';

import { InputLabel, TextField, Button } from '@material-ui/core';
import { Delete, Save } from '@material-ui/icons'

const Profile = props => {

  const authContext = useContext(AuthContext);

  const [reservations, setReservations] = useState([]);


  useEffect( () => {
	console.log('auth', authContext.user.userID);
	axios.get('/api/user/'+authContext.user.userID)
		 .then( res => {
		   const responseData = res.data.reservations;
		   const updatedReservations = [...reservations];
		   for (let i = 0; i < responseData.length; i++) {
			 updatedReservations.push(responseData[i].row.slice(1,-1).split(','));
		   };
		   console.log('updated ', updatedReservations);
		   setReservations(updatedReservations)
		 })
		 .catch( err => console.log('Err: ', err));
  }, []);

  const currentReservations = reservations.map( (res, i) => (
    <li key={i}>{res[0]}</li>
  ));


  return (
    <div className='container'>
	  <h1>User Profile</h1>
	  <form>
		<InputLabel id='first-name-input'>First Name</InputLabel>
		<TextField placeholder={authContext.user.firstName} className='input' fullWidth variant='outlined' name='first_name' type='text' />
		<InputLabel id='last-name-input'>Last Name</InputLabel>
		<TextField placeholder={authContext.user.lastName} className='input' fullWidth variant='outlined' name='first_name' type='text' />
		<InputLabel id='phone-input'>Phone Number</InputLabel>
		<TextField placeholder={authContext.user.phone} className='input' fullWidth variant='outlined' name='first_name' type='text' />
		<Button id='update-user' className='auth-button' color='primary' variant='contained' startIcon={<Save />}>Update Profile</Button>
	  </form>
	  <h1>Current Reservations</h1>
	  <ul>
		{currentReservations}
	  </ul>

	  <h1>Past Reservations</h1>



      <h1>Danger Zone</h1>
	  <Button id='delete-user' className='auth-button' color='secondary' variant='contained' startIcon={<Delete />}>Delete Account</Button>
	</div>
  )
}

export default Profile;
