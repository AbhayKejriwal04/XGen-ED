// ...existing code...
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardCGPA = ({ title, description, accent = '#8e24aa', buttonText = 'Open', to = '/', Icon }) => {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(to)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(to)}
      className="card-cgpa"
      style={{
        cursor: 'pointer',
        borderRadius: 12,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        minHeight: 300,
        width: '100%',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        background: '#ffffff',
        boxShadow: '0 10px 30px rgba(15,15,30,0.06)',
        border: '1px solid rgba(15,15,30,0.04)'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', width: '100%' }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 12,
            background: `${accent}1A`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {Icon ? <Icon size={28} color={accent} /> : <div style={{ width: 22, height: 22, borderRadius: 6, background: accent }} />}
        </div>

        <div style={{ width: '100%' }}>
          <h3 style={{ margin: 0, fontSize: 20, color: '#111', fontWeight: 800 }}>{title}</h3>
          <p style={{ marginTop: 10, color: '#6b7280', fontSize: 14, lineHeight: 1.45 }}>{description}</p>
        </div>
      </div>

      <div style={{ marginTop: 12, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button
          style={{
            background: accent,
            color: '#fff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: 10,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CardCGPA;