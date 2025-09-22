// ...existing code...
import React, { useState } from 'react';
import Navbar, { NAVBAR_HEIGHT } from '../Layouts/Navbar';

const CGPACal = () => {
  const [semesters, setSemesters] = useState([{ name: 'Semester 1', sgpa: '', credits: '' }]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const addSemester = () =>
    setSemesters((prev) => {
      const nextIndex = prev.length + 1;
      return [...prev, { name: `Semester ${nextIndex}`, sgpa: '', credits: '' }];
    });

  const removeSemester = (i) =>
    setSemesters((s) =>
      s
        .filter((_, idx) => idx !== i)
        .map((sem, idx) => ({ ...sem, name: `Semester ${idx + 1}` })) // re-index names
    );

  const change = (i, key, value) =>
    setSemesters((s) => {
      const copy = [...s];
      copy[i] = { ...copy[i], [key]: value };
      return copy;
    });

  const calculate = () => {
    setError('');
    setResult(null);
    let totalWeighted = 0,
      totalCredits = 0;
    for (const sem of semesters) {
      const sg = Number(sem.sgpa),
        c = Number(sem.credits);
      if (!isFinite(sg) || !isFinite(c) || c <= 0) {
        setError('Enter valid SGPA and credits for every semester');
        return;
      }
      totalWeighted += sg * c;
      totalCredits += c;
    }
    if (totalCredits === 0) {
      setError('Total credits cannot be zero');
      return;
    }
    const cgpa = Math.round((totalWeighted / totalCredits) * 100) / 100;
    setResult({ cgpa, totalCredits });
  };

  const reset = () => {
    setSemesters([{ name: 'Semester 1', sgpa: '', credits: '' }]);
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
          // increase top padding so header and first content aren't cut by the fixed navbar
          paddingTop: NAVBAR_HEIGHT + 28,
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingLeft: 32,
          paddingRight: 32,
          paddingBottom: 32,
          boxSizing: 'border-box'
        }}
      >
        <div style={{ maxWidth: 1000, width: '100%', marginTop: 8 }}>
          <h1 style={{ textAlign: 'center', fontSize: 28, marginBottom: 8, color: '#111', fontWeight: 800 }}>CGPA Calculator</h1>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 20 }}>
            Enter SGPA and credits for each semester to compute your cumulative CGPA.
          </p>

          <section style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 8px 30px rgba(15,15,30,0.06)' }}>
            {/* rows container: scroll only inside this card area */}
            <div
              role="region"
              aria-label="Semester rows"
              style={{
                maxHeight: '58vh', // scroll only inside this card
                overflowY: 'auto',
                paddingRight: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 8
              }}
            >
              {semesters.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 140px 140px 46px',
                    gap: 12,
                    alignItems: 'center',
                    marginBottom: 4
                  }}
                >
                  {/* fixed, non-editable semester name */}
                  <input value={s.name} readOnly style={{ ...inputStyle, background: '#f3f4f6', cursor: 'default' }} />

                  <input placeholder="SGPA" value={s.sgpa} onChange={(e) => change(i, 'sgpa', e.target.value)} type="number" step="0.01" style={inputStyle} />
                  <input placeholder="Total Credits" value={s.credits} onChange={(e) => change(i, 'credits', e.target.value)} type="number" style={inputStyle} />
                  <button onClick={() => removeSemester(i)} style={delBtn} aria-label={`Remove semester ${i + 1}`}>
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <button onClick={addSemester} style={outlineBtn}>
                + Add Semester
              </button>
              <button onClick={calculate} style={primaryBtn}>
                Calculate CGPA
              </button>
              <button onClick={reset} style={ghostBtn}>
                Reset
              </button>
              <div style={{ marginLeft: 'auto', color: '#374151', alignSelf: 'center' }}>
                {result ? `CGPA: ${result.cgpa} (Credits: ${result.totalCredits})` : error ? error : ''}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const inputStyle = { padding: '10px 12px', borderRadius: 8, border: '1px solid #e6e4f2', background: '#fff', color: '#111' };
const primaryBtn = { background: '#10b981', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 8, cursor: 'pointer' };
const outlineBtn = { background: 'transparent', color: '#374151', border: '1px solid #e6e4f2', padding: '10px 12px', borderRadius: 8, cursor: 'pointer' };
const ghostBtn = { background: 'transparent', color: '#374151', border: '1px solid #e6e4f2', padding: '10px 12px', borderRadius: 8, cursor: 'pointer' };
const delBtn = { background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer' };

export default CGPACal;
// ...existing code...