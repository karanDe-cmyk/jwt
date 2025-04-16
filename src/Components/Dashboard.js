'use client';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        alert('You are not logged in!');
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const res = await fetch('http://localhost:3001/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Send token in Authorization header
          },
        });

        const data = await res.json();

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            // Unauthorized or invalid token
            alert('Session expired. Please log in again.');
            localStorage.removeItem('token');
            navigate('/login'); // Redirect to login
          } else {
            throw new Error(data.message || 'Failed to fetch user data');
          }
        }

        setName(data.name);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        console.error('Error:', err);
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center p-4 border rounded bg-white shadow-sm">
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <>
            <h1>Welcome, {name}!</h1>
            <p>This is your dashboard.</p>
          </>
        )}
      </div>
    </div>
  );
}