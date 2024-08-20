import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar.js';
import './Components/Navbar.css'; // Ensure to import the CSS

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (!email || !password) {
            alert('Email and password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.indexOf('application/json') !== -1) {
                const userData = await response.json();
                if (response.ok) {
                    sessionStorage.setItem('loggedInUser', JSON.stringify(userData));
                    navigate('/dashboard');
                } else {
                    alert(userData.message || 'Authentication failed');
                }
            } else {
                alert('Unexpected response format');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing your request.');
        }
    }

    return (
        <>
            <Navbar title={'Oil and Natural Gas Corporation Limited'}/>
            <div className='login-container'>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email"><strong>Email</strong></label>
                            <input type="email" placeholder='Enter Email' className='form-control rounded-2' required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password"><strong>Password</strong></label>
                            <input type="password" placeholder='Enter Password' className='form-control rounded-2' required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <button type="submit" className='btn btn-success w-100 rounded-2'>
                                <strong>Log In</strong>
                            </button>
                            <p>For existing accounts</p>
                            <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-2 text-decoration-none'>
                                <strong>Sign Up</strong>
                            </Link>
                            <p>New user?</p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
