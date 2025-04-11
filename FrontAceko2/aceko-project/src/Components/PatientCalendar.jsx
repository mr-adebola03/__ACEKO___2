import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const PatientCalendar = ({ events }) => {
  const eventStyleGetter = (event) => {
    const backgroundColor = {
      'PLANIFIE': '#3b82f6',
      'CONFIRME': '#10b981',
      'ANNULE': '#ef4444',
      'TERMINE': '#6b7280'
    }[event.status] || '#8b5cf6';

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        color: 'white',
        border: '0px'
      }
    };
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        eventPropGetter={eventStyleGetter}
        messages={{
          today: "Aujourd'hui",
          previous: "Précédent",
          next: "Suivant",
          month: "Mois",
          week: "Semaine",
          day: "Jour"
        }}
      />
    </div>
  );
};

export default PatientCalendar;