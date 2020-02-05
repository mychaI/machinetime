import React, { useState, useContext } from 'react';
import { InputLabel, TextField, Select, MenuItem, Button } from '@material-ui/core';
import { AuthContext } from '../../Auth';
// Date Time Picker
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const Reserve = props => {

  const [date, setDate] = useState(new Date());
  const [machine, setMachine] = useState('');

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


  const authContext = useContext(AuthContext);

  const submitForm = e => {
	//console.log('submitting the following res ', authContext.user, reservation);
	console.log(machine);
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
		    <DatePicker value={date} onChange={setDate} className='input' />
			<TimePicker value={date} onChange={setDate} className='input' />
		  </MuiPickersUtilsProvider>
		  <Button variant='contained' className='auth-button' color='primary' onClick={submitForm}>Reserve</Button>
		</div>
	  </div>
	</>
  )
};

export default Reserve;
