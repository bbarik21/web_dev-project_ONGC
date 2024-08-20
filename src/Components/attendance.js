import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Attendance() {
  const [dateTime, setDateTime] = useState(new Date());
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Fetch userName from localStorage or session storage
    const storedUserData = sessionStorage.getItem('loggedInUser');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserName(userData.name);
    } else {
      console.log('User data not found in sessionStorage');
    }
    return () => clearInterval(timer);
  }, []);

  const handleMarkAsPresent = async () => {
    try {
      const date = dateTime.toISOString().split('T')[0]; // Get YYYY-MM-DD format
      await axios.post('http://localhost:3000/attendance/mark', {
        userName,
        date
      });

      alert(`Marked as present on ${date} at ${dateTime.toLocaleTimeString()}`);
    } catch (err) {
      console.error(err);
      if (err.response.status === 403) {
        alert(err.response.data);
      } else {
        alert('Error marking attendance');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4">
        <h2 className="card-title text-center">Attendance</h2>
        <div className="card-body">
          <p className="card-text text-center">
            <strong>Username:</strong> {userName}
          </p>
          <p className="card-text text-center">
            <strong>Date:</strong> {dateTime.toLocaleDateString()}
          </p>
          <p className="card-text text-center">
            <strong>Time:</strong> {dateTime.toLocaleTimeString()}
          </p>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success" onClick={handleMarkAsPresent}>
              Mark as Present
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
