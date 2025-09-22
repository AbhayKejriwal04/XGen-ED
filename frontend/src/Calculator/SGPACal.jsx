import React, { useState, useEffect } from 'react';
import Navbar, { NAVBAR_HEIGHT } from '../Layouts/Navbar';
// ...existing code...

const GRADE_OPTIONS = [
  { label: 'A+', value: 10 },
  { label: 'A', value: 9 },
  { label: 'B+', value: 8 },
  { label: 'B', value: 7 },
  { label: 'C+', value: 6 },
  { label: 'C', value: 5 },
  { label: 'D', value: 4 },
  { label: 'F', value: 0 }
];

const MAX_SUBJECTS = 30;

const SGPACal = () => {
  const [rows, setRows] = useState([{ name: '', credit: '', grade: '' }]);
  const [subjectsList, setSubjectsList] = useState([]); // fetched from backend
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  // fetch subject names from backend API on mount
  useEffect(() => {
    let mounted = true;
    setLoadingSubjects(true);
    fetch('/api/subjects') // backend endpoint should return JSON array [{ id?, name }, ...]
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        // normalize to { id, name }
        const list = Array.isArray(data) ? data.map((s) => ({ id: s.id ?? s.name, name: s.name ?? s })) : [];
        setSubjectsList(list);
      })
      .catch(() => {
        setSubjectsList([]); // fallback to empty -> free text input will be shown
      })
      .finally(() => mounted && setLoadingSubjects(false));
    return () => {
      mounted = false;
    };
  }, []);

  const addRow = () =>
    setRows((prev) => {
      if (prev.length >= MAX_SUBJECTS) {
        setNotice(`Maximum ${MAX_SUBJECTS} subjects allowed`);
        setTimeout(() => setNotice(''), 2500);
        return prev;
      }
      setNotice('');
      return [...prev, { name: '', credit: '', grade: '' }];
    });

  const removeRow = (i) => setRows((r) => r.filter((_, idx) => idx !== i));
  const updateRow = (i, key, value) =>
    setRows((r) => {
      const copy = [...r];
      copy[i] = { ...copy[i], [key]: value };
      return copy;
    });

  const calculate = () => {
    setError('');
    setResult(null);
    let totalWeighted = 0,
      totalCredits = 0;
    for (const row of rows) {
      const c = Number(row.credit);
      const g = Number(row.grade);
      if (!isFinite(c) || c <= 0) {
        setError('All credits must be positive numbers');
        return;
      }
      if (!isFinite(g)) {
        setError('Select grade for each subject');
        return;
      }
      totalWeighted += c * g;
      totalCredits += c;
    }
    if (totalCredits === 0) {
      setError('Total credits cannot be zero');
      return;
    }
    const sgpa = Math.round((totalWeighted / totalCredits) * 100) / 100;
    setResult({ sgpa, totalCredits });
  };

  const reset = () => {
    setRows([{ name: '', credit: '', grade: '' }]);
    setResult(null);
    setError('');
    setNotice('');
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg, #f8f9fc)' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
        <Navbar active="CGPA" />
      </div>

      <main
        style={{
          // ensure content sits below fixed navbar and is centered horizontally
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
        <div style={{ maxWidth: 1000, width: '100%' }}>
          <h1 style={{ textAlign: 'center', fontSize: 28, marginBottom: 8, color: '#111', fontWeight: 800 }}>SGPA Calculator</h1>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: 20 }}>
            Enter subjects, credits and select grades. Subject names come from backend.
          </p>

          <section style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 8px 30px rgba(15,15,30,0.06)' }}>
            <div
              role="region"
              aria-label="Subject rows"
              style={{
                maxHeight: '58vh',
                overflowY: 'auto',
                paddingRight: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >
              {rows.map((r, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 160px 46px', gap: 12, alignItems: 'center' }}>
                  {/* If backend provided subjects -> show dropdown, otherwise fallback to free text */}
                  {loadingSubjects ? (
                    <input value={'Loading subjects...'} readOnly style={{ ...inputStyle, background: '#f3f4f6', cursor: 'default' }} />
                  ) : subjectsList.length > 0 ? (
                    <select
                      value={r.name}
                      onChange={(e) => updateRow(i, 'name', e.target.value)}
                      style={inputStyle}
                      aria-label={`Subject ${i + 1}`}
                    >
                      <option value="">Select subject</option>
                      {subjectsList.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input value={r.name} onChange={(e) => updateRow(i, 'name', e.target.value)} placeholder="Subject (optional)" style={inputStyle} />
                  )}

                  <input value={r.credit} onChange={(e) => updateRow(i, 'credit', e.target.value)} placeholder="Credits" type="number" min="0" style={inputStyle} />
                  <select value={r.grade} onChange={(e) => updateRow(i, 'grade', e.target.value)} style={inputStyle}>
                    <option value="">Select grade</option>
                    {GRADE_OPTIONS.map((g) => (
                      <option key={g.label} value={g.value}>
                        {g.label} ({g.value})
                      </option>
                    ))}
                  </select>
                  <button onClick={() => removeRow(i)} style={delBtn} aria-label={`Remove subject ${i + 1}`}>
                    🗑
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 12, alignItems: 'center' }}>
              <button onClick={addRow} style={outlineBtn}>
                + Add Subject
              </button>
              <button onClick={calculate} style={primaryBtn}>
                Calculate SGPA
              </button>
              <button onClick={reset} style={ghostBtn}>
                Reset
              </button>
              <div style={{ marginLeft: 'auto', alignSelf: 'center', color: '#374151', fontSize: 15 }}>
                {result ? `SGPA: ${result.sgpa} (Credits: ${result.totalCredits})` : error ? error : notice ? notice : ''}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const inputStyle = {
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #e6e4f2',
  background: '#fff',
  color: '#111'
};
const primaryBtn = { background: '#2563eb', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 8, cursor: 'pointer' };
const outlineBtn = { background: 'transparent', color: '#374151', border: '1px solid #e6e4f2', padding: '10px 12px', borderRadius: 8, cursor: 'pointer' };
const ghostBtn = { background: 'transparent', color: '#374151', border: '1px solid #e6e4f2', padding: '10px 12px', borderRadius: 8, cursor: 'pointer' };
const delBtn = { background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer' };

export default SGPACal;