import React, { useState } from 'react';

const Signup = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (!form.agree) {
            setError('You must agree to the Terms of Service and Privacy Policy');
            return;
        }
        try {
            // Example: await signupApi(form);
            setSuccess('Signup successful!');
            setForm({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
                agree: false,
            });
        } catch (err) {
            setError('Signup failed. Please try again.');
        }
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
            <div style={{
                textAlign: 'center'
            }}>
                <div style={{ color: '#8e24aa', fontWeight: 700, fontSize: 30, marginBottom: 4 ,marginTop:8}}>XGen-Ed</div>
                <div style={{ color: '#555', marginBottom: 14 }}>Start your learning journey today</div>
                <h2 style={{ marginBottom: 0 }}>Create Account</h2>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>
                    Join thousands of students on XGen-Ed
                </div>
            </div>
            <div style={{
                maxWidth: 400,
                width: '100%',
                background: '#fff',
                padding: 32,
                borderRadius: 16,
                boxShadow: '0 4px 24px rgba(80, 80, 120, 0.08)',
                textAlign: 'center'
            }}>
                <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: 12, fontWeight: 600 }}>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={form.username}
                            onChange={handleChange}
                            required
                            placeholder="Choose a username"
                            style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ddd' }}
                        />
                    </div>
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
                    <div style={{ marginBottom: 12, fontWeight: 600  }}>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder="Create a password"
                            style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: 12, fontWeight: 600  }}>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="Confirm your password"
                            style={{ width: '100%', padding: 10, marginTop: 4, borderRadius: 6, border: '1px solid #ddd' }}
                        />
                    </div>
                    <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            name="agree"
                            checked={form.agree}
                            onChange={handleChange}
                            style={{ marginRight: 8 }}
                        />
                        <span style={{ fontSize: 13 }}>
                            I agree to the <a href="#" style={{ color: '#8e24aa' }}>Terms of Service</a> and <a href="#" style={{ color: '#8e24aa' }}>Privacy Policy</a>
                        </span>
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
                        Create Account
                    </button>
                </form>        
                <div style={{ fontSize: 14 }}>
                    Already have an account? <a href="/login" style={{ color: '#8e24aa' }}>Sign in here</a>
                </div>
            </div>
            <div style={{
                marginTop: 8,
                color: '#555',
                fontSize: 12.5,
                textAlign: 'center',
                marginBottom:0,
            }}>
                <div>Join XGen-Ed and unlock:</div>
                <div style={{ display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    justifyContent: 'center',
                    marginTop: 12,
                    maxWidth: 350,
                    marginLeft: 'auto',
                    marginRight: 'auto' 
                    }}>
                    <span>📝 Resume Builder</span>
                    <span>📊 CGPA Tracking</span>
                    <span>💼 Profile Management</span>
                    <span>📈 Placement Portel</span>
                </div>
            </div>
        </div>
    );
};

export default Signup;