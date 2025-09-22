import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Information = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        uid: '',
        year: '',
        semester: '',
        courseName: '',
        officialEmail: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        // If no email in state, redirect to login
        if (!email) {
            navigate('/login');
        }
    }, [email, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError('');
    };

    const validate = () => {
        for (const key in form) {
            if (!form[key].trim()) {
                setError('All fields are required.');
                return false;
            }
        }
        if (!/\S+@\S+\.\S+/.test(form.officialEmail)) {
            setError('Enter a valid email address.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // Store profile info per email
        const profileInfo = JSON.parse(localStorage.getItem('profileInfo') || '{}');
        profileInfo[email] = form;
        localStorage.setItem('profileInfo', JSON.stringify(profileInfo));
        navigate('/profile', {state: {email}}); // Redirect to home or dashboard
    };

    return (
        <div className="card">
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit}>
               <div style={{ display: 'flex', gap: '12px', marginBottom: 4 }}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        style={{ flex: 1 }}
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        style={{ flex: 1 }}
                    />
            </div>
        <input
            type="text"
            name="uid"
            placeholder="UID"
            value={form.uid}
            onChange={handleChange}
            required
            style={{ marginBottom: 8 }}
        />
        <div style={{ display: 'flex', gap: '12px', marginBottom: 4 }}>
            <input
                type="text"
                name="year"
                placeholder="Year"
                value={form.year}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
            />
            <input
                type="text"
                name="semester"
                placeholder="Semester"
                value={form.semester}
                onChange={handleChange}
                required
                style={{ flex: 1 }}
            />
        </div>
        <input
            type="text"
            name="courseName"
            placeholder="Full Course Name"
            value={form.courseName}
            onChange={handleChange}
            required
            style={{ marginBottom: 8 }}
        />
        <input
            type="email"
            name="officialEmail"
            placeholder="Official Email ID"
            value={form.officialEmail}
            onChange={handleChange}
            required
            style={{ marginBottom: 8 }}
        />
            {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
            <button type="submit">Submit</button>
        </form>
    </div>
    );
};

export default Information;