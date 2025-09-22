// ...existing code...
import React, { useState } from 'react';
import Navbar, { NAVBAR_HEIGHT } from '../Layouts/Navbar';

const Predictor = () => {
  const [currentCGPA, setCurrentCGPA] = useState('');
  const [earnedCredits, setEarnedCredits] = useState('');
  const [targetCGPA, setTargetCGPA] = useState('');
  const [nextCredits, setNextCredits] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);
    const cur = Number(currentCGPA),
      earned = Number(earnedCredits),
      target = Number(targetCGPA),
      next = Number(nextCredits);
    if (![cur, earned, target, next].every((v) => isFinite(v))) {
      setError('Enter valid numeric values');
      return;
    }
    if (next <= 0) {
      setError('Next semester credits must be > 0');
      return;
    }
    const totalCredits = earned + next;
    const required = (target * totalCredits - cur * earned) / next;
    const requiredRounded = Math.round(required * 100) / 100;
    setResult({ required: requiredRounded });
  };

  const reset = () => {
    setCurrentCGPA('');
    setEarnedCredits('');
    setTargetCGPA('');
    setNextCredits('');
    setResult(null);
    setError('');
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg, #f8f9fc)' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Navbar active="CGPA" />
      </div>

      <main
        style={{
          paddingTop: NAVBAR_HEIGHT,
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: 900, width: '100%' }}>
          <h1 style={{ textAlign: 'center', fontSize: 28, marginBottom: 8, color: '#111', fontWeight: 800 }}>CGPA Predictor</h1>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 20 }}>
            Calculate the SGPA you need next semester to reach a target CGPA.
          </p>

          <section style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 8px 30px rgba(15,15,30,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ color: '#6b7280', marginBottom: 6 }}>Current CGPA</div>
                <input value={currentCGPA} onChange={(e) => setCurrentCGPA(e.target.value)} style={inputStyle} placeholder="e.g. 7.5" />
              </div>
              <div>
                <div style={{ color: '#6b7280', marginBottom: 6 }}>Current Total Credits Earned</div>
                <input value={earnedCredits} onChange={(e) => setEarnedCredits(e.target.value)} style={inputStyle} placeholder="e.g. 100" />
              </div>
              <div>
                <div style={{ color: '#6b7280', marginBottom: 6 }}>Target CGPA</div>
                <input value={targetCGPA} onChange={(e) => setTargetCGPA(e.target.value)} style={inputStyle} placeholder="e.g. 8.0" />
              </div>
              <div>
                <div style={{ color: '#6b7280', marginBottom: 6 }}>Upcoming Semester Credits</div>
                <input value={nextCredits} onChange={(e) => setNextCredits(e.target.value)} style={inputStyle} placeholder="e.g. 25" />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button onClick={calculate} style={primaryBtn}>
                Calculate Required SGPA
              </button>
              <button onClick={reset} style={ghostBtn}>
                Reset
              </button>
              <div style={{ marginLeft: 'auto', alignSelf: 'center', color: '#374151' }}>{error || (result ? `Required SGPA: ${result.required}` : '')}</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const inputStyle = { padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e4f2', background: '#fff', color: '#111' };
const primaryBtn = { background: '#ff6b21', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 8, cursor: 'pointer' };
const ghostBtn = { background: 'transparent', color: '#374151', border: '1px solid #e6e4f2', padding: '10px 12px', borderRadius: 8, cursor: 'pointer' };

export default Predictor;