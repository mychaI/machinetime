import React, { useState, useContext } from 'react';
import axios from 'axios';
import { InputLabel, TextField, Select, MenuItem, Button } from '@material-ui/core';
import { AuthContext } from '../../Auth';
// Date Time Picker
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const Reserve = props => {

  const [machine, setMachine] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(start);

  const machines = [
    'cnc',
	'laser',
  ];

  const machineNames = {
	cnc: 'Shark CNC', 
	laser: 'CamFive Laser',
  };

  const updateSelection = e => {
	setMachine(e.target.value);
  }

  const setDate = e => {
	setStart(e);
	setEnd(e);
  }


  const authContext = useContext(AuthContext);

  const submitForm = e => {
	// Create a new reservation object
	const newReservation = {
	  machine,
	  start,
	  end,
	  firstName: authContext.user.firstName,
	  lastName: authContext.user.lastName,
	};
	console.log('new reservation ', newReservation);
	axios.post('/api/new', {newReservation})
		 .then( res => console.log('res ', res))
		 .catch( err => console.log('Err :', err));
  }


  return (
    <>
	  <div id='reservation'>
	    <div className='container'>
		  <h1>Reserve a time slot</h1>

		  <InputLabel id='machine-select'>Machine Type</InputLabel>
		  <Select label='Machine' labelId='machine-select' className='input' value={machine} onChange={updateSelection}>
		    {machines.map( mech => (
			  <MenuItem key={mech} value={mech}>
			    {machineNames[mech]}
			  </MenuItem>
			))}
		  </Select>
		  <MuiPickersUtilsProvider utils={DateFnsUtils}>
		    <InputLabel id='date-select'>Date</InputLabel>
		    <DatePicker value={start} minDate={Date.now()} onChange={setDate} className='input' />
		    <InputLabel id='time-select'>Start Time</InputLabel>
			<TimePicker value={start} onChange={setStart} className='input' />
		    <InputLabel id='time-select'>End Time</InputLabel>
			<TimePicker value={end} onChange={setEnd} className='input' />
		  </MuiPickersUtilsProvider>
		  <Button variant='contained' className='auth-button' color='primary' onClick={submitForm}>Reserve</Button>
		</div>
	  </div>
	</>
  )
};

export default Reserve;
