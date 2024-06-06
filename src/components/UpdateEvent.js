// UpdateEvent.js
import React, { useState, useEffect } from 'react';
import { updateEvent, fetchAllEvents } from '../apiservice';
import { useLocation } from 'react-router-dom';

const UpdateEvent = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('eventId'); // Extracting eventId from searchParams
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const events = await fetchAllEvents();
        const eventToUpdate = events.find(event => event.event_id === eventId);
        setEvent(eventToUpdate);
        setTitle(eventToUpdate.title);
        setDescription(eventToUpdate.description);
      } catch (error) {
        console.error('Error fetching event', error);
      }
    };

    getEvent();
  }, [eventId]);

  const handleUpdateEvent = async () => {
    try {
      let base64Image = event.image_url;
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
          base64Image = reader.result.split(',')[1];
          const eventDetails = { title, description, image: base64Image };
          await updateEvent(eventId, eventDetails);
          window.alert('Event Updated'); 
        };
      } else {
        const eventDetails = { title, description, image: base64Image };
        await updateEvent(eventId, eventDetails);
        window.alert('Event Updated'); 
      }
    } catch (error) {
      console.error('Error updating event', error);
      window.alert('Error updating event');
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h1>Update Event</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={handleUpdateEvent}>Update Event</button>
    </div>
  );
};

export default UpdateEvent;
