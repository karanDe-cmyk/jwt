'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
    const navigate = useNavigate();

    const usernameRef = useRef();
    const emailRef = useRef();
    const contactRef = useRef();
    const passwordRef = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const formSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        const payload = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            contact: contactRef.current.value,
            password: passwordRef.current.value, // Added password to payload
        };

        const phoneRegex = /^[0-9]{10}$/;
        if (!payload.username || !payload.email || !phoneRegex.test(payload.contact) || !payload.password) {
            setError('All fields are required, and contact must be a 10-digit number.');
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to create user');
            }

            alert(data.message || 'User created successfully!');
            navigate('/login'); // Redirect to login page
            // Reset form
            usernameRef.current.value = '';
            emailRef.current.value = '';
            contactRef.current.value = '';
            passwordRef.current.value = ''; // Reset password field
        } catch (err) {
            setError(err.message || 'Something went wrong');
            console.error('Error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center align-content-center w-50 vh-50 bg-light">
            <form onSubmit={formSubmit} className="w-50 mx-auto p-4 border rounded bg-white shadow-sm">
                <h2 className="text-center mb-4">Sign Up</h2>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        ref={usernameRef}
                        className="form-control"
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        ref={emailRef}
                        className="form-control"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input
                        type="tel"
                        ref={contactRef}
                        className="form-control"
                        placeholder="Enter your contact number"
                        pattern="[0-9]{10}"
                        required
                    />
                    <div className="form-text">Must be a 10-digit number</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        ref={passwordRef}
                        className="form-control"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
}
