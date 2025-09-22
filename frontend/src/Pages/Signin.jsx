import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email || !form.password) {
            setError('Please enter both email and password');
            return;
        }
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[form.email];
        if (!user || user.password !== form.password) {
            setError('Invalid email or password');
            return;
        }
        setSuccess('Sign in successful!');
        setForm({
            email: '',
            password: '',
            remember: false,
        });
        setTimeout(() => {
            navigate('/profile', { state: { email: form.email } });
        }, 1000);
    };

    return (
        
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8f9fc 0%, #f3f0ff 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#8e24aa', fontWeight: 700, fontSize: 30, marginBottom: 0, marginTop: 8 }}>XGen-Ed</div>
                <div style={{ color: '#555', marginBottom: 14 }}>Your Learning Management System</div>
                <h2 style={{ marginBottom: 0 }}>Welcome Back</h2>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>
                    Sign in to your XGen-Ed account
                </div>
            </div>
            <div style={{
                maxWidth: 400,
                width: '100%',
                background: '#fff',
                padding: 32,
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.65)',
                textAlign: 'center'
            }}>

                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: 12, fontWeight: 600 }}>
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: 12, fontWeight: 600 }}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Enter your password"
                            style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <input
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                                style={{ marginRight: 8 }}
                            />
                            <span style={{ fontSize: 13 }}>Remember me</span>
                        </div>
                        <a href="#" style={{ color: '#8e24aa', fontSize: 13 }}>Forgot password?</a>
                    </div>
                    {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
                    {success && <div style={{ color: 'green', marginBottom: 12 }}>{success}</div>}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: 12,
                            background: '#8e24aa',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 10,
                            fontWeight: 600,
                            fontSize: 16,
                            marginBottom: 16,
                            cursor: 'pointer'
                        }}
                    >
                        Sign In
                    </button>
                </form>
                <div style={{ fontSize: 14 }}>
                    Don’t have an account? <a href="/signup" style={{ color: '#8e24aa' }}>Sign up here</a>
                </div>
            </div>
            <div style={{
                marginTop: 8,
                color: '#555',
                fontSize: 12.5,
                textAlign: 'center',
                marginBottom: 0,
            }}>
                <div>What you'll get with XGen-Ed:</div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    justifyContent: 'center',
                    marginTop: 12,
                    maxWidth: 350,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <span>📝 Resume Builder</span>
                    <span>📊 CGPA Tracker</span>
                    <span>👤 Profile Management</span>
                    <span>💼 Placement Portal</span>
                </div>
            </div>
        </div>
    );
};

export default Signin;