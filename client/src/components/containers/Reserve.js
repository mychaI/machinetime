import React, { useState, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, TextField, Select, MenuItem, Button, Modal } from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import { AuthContext } from '../../Auth';
// Date Time Picker
import { MuiPickersUtilsProvider, DatePicker, TimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles({
  modal: {
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	position: 'absolute',
	width: 400,
	backgroundColor: 'ghostwhite',
	border: '2px solid #000',
	padding: '20px',
	textAlign: 'center',
  },
  modalText: {
	fontSize: '1.75em',
  },
  checkMark: {
	color: 'green',
	margin: 'auto',
  }
});



const Reserve = props => {

  const [machine, setMachine] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(start);
  const [modal, setModal] = useState(false);

  const machines = [
    'CNC',
	'Laser',
  ];

  const machineNames = {
	CNC: 'Shark CNC', 
	Laser: 'CamFive Laser',
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
	  user_id: authContext.user.userID,
	  first_name: authContext.user.firstName,
	  last_name: authContext.user.lastName,
	  machine,
	  start_time: start,
	  end_time: end,
	};
	axios.post('/api/new', {newReservation})
		 .then( res => setModal(true))
		 .catch( err => console.log('Err :', err.response.data));
  }

  const handleClose = () => {
	setModal(false);
  };

  const classes = useStyles();


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

		  <Modal open={modal} onClose={handleClose}>
			<div className={classes.modal}>
			  <h2>Confirmation:</h2>
			  <CheckCircleOutline className={classes.checkMark} />			  
			  <p className={classes.modalText}>Reservation successful</p>
			</div>
		  </Modal>
		</div>
	  </div>
	</>
  )
};

export default Reserve;
