import React, { useState } from 'react';
import Modal from '../presentation/Modal';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
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
