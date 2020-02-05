import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment);

const events = [ { title: 'CNC', start: Date.now, end: Date.now + 10000, allDay : false, resource: null } ]

const Calendar = props => {
  return (
    <>
	  <h1>Current Schedule</h1>
	  <BigCalendar 
	    localizer={localizer}
		events={events}
		startAccessor="start"
		endAccessor="end"
		style={{ height: 500 }}
	  />

	</>
  )
};

export default Calendar;
