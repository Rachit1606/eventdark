import axios from 'axios';

const API_URL = 'https://tpvwwu4vxh.execute-api.us-east-1.amazonaws.com/prod';

export const createEvent = async (eventDetails) => {
  const response = await axios.post(`${API_URL}/events`, eventDetails);
  return response.data;
};

export const updateEvent = async (eventId, eventDetails) => {
  const response = await axios.put(`${API_URL}/events`, { ...eventDetails, event_id: eventId });
  return response.data;
};

export const fetchAllEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

export const deleteEvent = async (eventId) => {
  const response = await axios.delete(`${API_URL}/events`, { data: { event_id: eventId } });
  return response.data;
};
