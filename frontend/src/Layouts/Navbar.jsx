// ...existing code...
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NAVBAR_HEIGHT = 56;

const navItems = [
  { key: 'dashboard', label: 'Dashboard', to: '/' },
  { key: 'profile', label: 'Profile', to: '/profile' },
  { key: 'placement', label: 'Placement', to: '/placement' },
  { key: 'cgpa', label: 'CGPA', to: '/cgpa' },
  { key: 'resume', label: 'Resume Builder', to: '/resume' }
];

const Navbar = ({ active }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: NAVBAR_HEIGHT,
        boxSizing: 'border-box',
        width: '100%',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        borderBottom: '1px solid rgba(15,15,30,0.06)',
        zIndex: 200
      }}
    >
      <div style={{ fontWeight: 800, color: '#8e24aa', marginRight: 24 }}>XGen-Ed</div>

      <div style={{ display: 'flex', gap: 20 }}>
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => navigate(item.to)}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '8px 6px',
              cursor: 'pointer',
              color: active === item.label ? '#8e24aa' : '#222',
              fontWeight: active === item.label ? 700 : 600,
              borderBottom: active === item.label ? '2px solid #8e24aa' : '2px solid transparent'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div style={{ marginLeft: 'auto', width: 36, height: 36, borderRadius: '50%', background: '#ddd' }} />
    </div>
  );
};

export default Navbar;