// ...existing code...
import React from 'react';
import CardCGPA from '../Layouts/CardCGPA';
import Navbar, { NAVBAR_HEIGHT } from '../Layouts/Navbar';
import { FaCalculator, FaChartBar, FaBullseye } from 'react-icons/fa';

const CGPA = () => {
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
        <div style={{ maxWidth: 1100, width: '100%', textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, marginBottom: 8, color: '#111', fontWeight: 800 }}>CGPA Tools</h1>
          <p style={{ color: '#6b7280', marginBottom: 28, maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
            Use these calculators to compute SGPA/CGPA or predict target SGPA for upcoming semesters.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              alignItems: 'start',
              justifyItems: 'center',
              marginTop: 12
            }}
            className="cgpa-grid"
          >
            <CardCGPA
              title="SGPA Calculator"
              description="Calculate your Semester Grade Point Average quickly by entering subjects and credits."
              accent="#2b6cb0"
              buttonText="Calculate SGPA"
              to="/cgpa/sgpa"
              Icon={FaCalculator}
            />

            <CardCGPA
              title="CGPA Calculator"
              description="Compute cumulative GPA across semesters and keep a running record of your performance."
              accent="#2f855a"
              buttonText="Calculate CGPA"
              to="/cgpa/cgpa"
              Icon={FaChartBar}
            />

            <CardCGPA
              title="CGPA Predictor"
              description="Predict required SGPA for target CGPA in upcoming semesters."
              accent="#dd6b20"
              buttonText="Predict CGPA"
              to="/cgpa/predict"
              Icon={FaBullseye}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CGPA;