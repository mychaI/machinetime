import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '../presentation/Modal';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import momenttz from 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const now = new Date;
const events = [ 
  {title: 'CNC', start: now, end: now, allDay : false, resource: null },
  { title: 'CNC', start: now, end: now, allDay : false, resource: null },
  { title: 'CNC', start: now, end: now, allDay : false, resource: null },
  { title: 'CNC', start: now, end: now, allDay : false, resource: null },
  { title: 'CNC', start: now, end: now, allDay : false, resource: null },
  { title: 'CNC', start: now, end: now, allDay : false, resource: null },
  { title: 'CNC', start: now, end: now, allDay : false, resource: null }
]

const Calendar = props => {
  const showDetail = (event, e) => {
	setState({
	  open: true,
	  title: event.title,
	  start: event.start.toString(),
	  end: event.end.toString(),
	});
	console.log(event);
  };

  const closeModal = () => {
	setState({
	  open: false
	});
  };

  const [state, setState] = useState({});
  const [events, setEvents] = useState([]);

  // Retrieve all reservations when component mounts
  useEffect( () => {
	axios.get('/api/all')
		 .then( res => {
		   let reservations = [];
		   // convert date strings into JS date objects and create a key for 'title'
		   for (let reservation of res.data.reservations) {
			 reservation = {
			   ...reservation,
			   start: momenttz.tz(reservation.start_time, 'America/Los_Angeles').toDate(),
			   end: momenttz.tz(reservation.end_time, 'America/Los_Angeles').toDate(),
			   title: reservation.machine + ' res. by ' + reservation.first_name + ' at ' + momenttz.tz(reservation.start_time, 'America/Los_Angeles').format('LT')
			 }
			 reservations.push(reservation);
		   }
		   setEvents(reservations);
		 })
		 .catch( err => console.log('Error retrieving reservations: ', err));
  }, []);

  return (
    <>
	  <h1>Current Schedule</h1>
	  <BigCalendar 
	    localizer={localizer}
		events={events}
		startAccessor="start"
		endAccessor="end"
		style={{ height: 800 }}
		popup={true}
		onSelectEvent={showDetail}
	  />
	  <Modal open={state.open} closeModal={closeModal} title={state.title} start={state.start} end={state.end} />
	</>
  )
};

export default Calendar;
