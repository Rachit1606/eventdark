// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateEvent from './components/CreateEvent';
import UpdateEvent from './components/UpdateEvent';
import EventsList from './components/EventList';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/create">Create Event</Link>
            </li>
            <li>
              <Link to="/events">View Events</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/update" element={<UpdateEvent />} />
          <Route path="/events" element={<EventsList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
