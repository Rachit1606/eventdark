import React, { useState } from 'react';
import { createEvent } from '../apiservice';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleCreateEvent = async () => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        const eventDetails = { title, description, image: base64Image };
        const response = await createEvent(eventDetails);
        window.alert('Event Created ' + response); 
        setTitle('');
        setDescription('');
        setImage(null);
      };
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
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
      <button onClick={handleCreateEvent}>Create Event</button>
    </div>
  );
};

export default CreateEvent;
