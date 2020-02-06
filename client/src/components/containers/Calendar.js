import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'

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
	console.log(event);
  }

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

	</>
  )
};

export default Calendar;
