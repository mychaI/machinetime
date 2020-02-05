import React, { useState, useContext } from 'react';
import { TextField, Select, Button } from '@material-ui/core';
import { AuthContext } from '../../Auth';


const Reserve = props => {

  const [reservation, setReservation] = useState({
	title: '',
	start: Date.now(),
	end: Date.now()+7200000,
	allDay: false,
	resource: null
  });

  const authContext = useContext(AuthContext);

  const submitForm = e => {
	console.log('submitting the following res ', authContext.user, reservation);
  }


  return (
    <>
	  <div id='reservation'>
	    <div className='container'>
		  <h1>Reserve a time slot</h1>
		  <Select label='Machine' />

		  <Button variant='contained' className='auth-button' color='primary' onClick={submitForm}>Reserve</Button>
		</div>
	  </div>
	</>
  )
};

export default Reserve;
