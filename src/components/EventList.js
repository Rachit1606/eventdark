import React, { useState, useEffect } from 'react';
import { fetchAllEvents, deleteEvent } from '../apiservice';
import { Link, useLocation } from 'react-router-dom';

const EventsList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventIdParam = searchParams.get('eventId');
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetchAllEvents();
        const responseBody = JSON.parse(response.body);
        setEvents(responseBody);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    getEvents();
  }, [eventIdParam]); // Trigger useEffect when eventIdParam changes

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      setEvents(events.filter((event) => event.event_id !== eventId));
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  return (
    <div>
      <h1>All Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.event_id}>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            {event.image && <img src={event.image} alt={event.title} />}
            <button onClick={() => handleDeleteEvent(event.event_id)}>Delete Event</button>
            <Link to={{ pathname: `/update`, search: `?eventId=${event.event_id}` }}>Update Event</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
