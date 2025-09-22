import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar, { NAVBAR_HEIGHT } from '../Layouts/Navbar';

// ...existing code...
const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email;
  const last = JSON.parse(localStorage.getItem('lastLoggedIn') || 'null');
  const email = emailFromState || last?.email;

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    uid: '',
    year: '',
    semester: '',
    courseName: '',
    officialEmail: '',
    phone: '',
    github: '',
    linkedin: '',
    about: '',
    photo: '', // base64
    skills: [],
    achievements: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [message, setMessage] = useState('');

  // some predefined skills for dropdown
  const predefinedSkills = [
    'JavaScript',
    'React',
    'Node.js',
    'Express',
    'HTML',
    'CSS',
    'Python',
    'C++',
    'Data Structures',
    'Algorithms',
    'Communication',
    'Leadership'
  ];

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }
    const profileInfo = JSON.parse(localStorage.getItem('profileInfo') || '{}');
    if (profileInfo[email]) {
      setProfile(prev => ({ ...prev, ...profileInfo[email] }));
    } else {
      // If profile missing redirect or show message
      navigate('/login');
    }
    // persist last logged
    localStorage.setItem('lastLoggedIn', JSON.stringify({ email }));
  }, [email, navigate]);

  const saveProfileToStorage = (updated) => {
    const profileInfo = JSON.parse(localStorage.getItem('profileInfo') || '{}');
    profileInfo[email] = { ...profileInfo[email], ...updated };
    localStorage.setItem('profileInfo', JSON.stringify(profileInfo));
    setProfile(prev => ({ ...prev, ...updated }));
    setMessage('Saved');
    setTimeout(() => setMessage(''), 1500);
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      saveProfileToStorage({ photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = () => {
    if (!profile.photo) return;
    // confirm deletion
    if (!window.confirm('Remove profile photo?')) return;
    saveProfileToStorage({ photo: '' });
  };

  const handleContactSave = (e) => {
    e.preventDefault();
    const { phone, github, linkedin } = profile;
    saveProfileToStorage({ phone, github, linkedin });
  };

  const handleAboutSave = (e) => {
    e.preventDefault();
    saveProfileToStorage({ about: profile.about });
  };

  const handleAddSkill = () => {
    const s = (skillInput || '').trim();
    if (!s) return;
    const skills = Array.isArray(profile.skills) ? [...profile.skills] : [];
    if (!skills.includes(s)) skills.push(s);
    saveProfileToStorage({ skills });
    setSkillInput('');
  };

  const handleAddSkillFromList = (val) => {
    if (!val) return;
    const skills = Array.isArray(profile.skills) ? [...profile.skills] : [];
    if (!skills.includes(val)) {
      skills.push(val);
      saveProfileToStorage({ skills });
    }
  };

  const handleRemoveSkill = (index) => {
    const skills = profile.skills.filter((_, i) => i !== index);
    saveProfileToStorage({ skills });
  };

  const handleAddAchievement = () => {
    const title = window.prompt('Enter achievement / certification title');
    if (!title) return;
    const achievements = Array.isArray(profile.achievements) ? [...profile.achievements, title] : [title];
    saveProfileToStorage({ achievements });
  };

  const handleRemoveAchievement = (idx) => {
    const achievements = (profile.achievements || []).filter((_, i) => i !== idx);
    saveProfileToStorage({ achievements });
  };

  const onFieldChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  if (!profile) return null;

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f5f6fb' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: NAVBAR_HEIGHT, zIndex: 100 }}>
        <Navbar active="Profile" />
      </div>

      {/* slightly up the page: reduce top padding a bit */}
      <main style={{ paddingTop: NAVBAR_HEIGHT + 12, paddingBottom: 48, paddingLeft: 24, paddingRight: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontSize: 24, marginBottom: 18, color: '#111', fontWeight: 700 }}>My Profile</h1>

          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Left column */}
            <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={card}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {profile.photo
                      ? <img src={profile.photo} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <div style={{ color: '#888', fontSize: 14 }}>No photo</div>
                    }
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{profile.firstName} {profile.lastName}</div>
                  <div style={{ fontSize: 13, color: '#666' }}>{profile.uid}</div>
                  <div style={{ fontSize: 13, color: '#666', textAlign: 'center' }}>{profile.courseName} • Final Year {profile.year}</div>

                  <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                    <label style={photoLabel}>
                      Edit Your Photo
                      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                    </label>

                    <button onClick={handleDeletePhoto} style={secondaryBtn} aria-label="Delete photo">
                      Delete Photo
                    </button>
                  </div>
                </div>
              </div>

              <div style={card}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>About Me</div>
                <textarea
                  name="about"
                  value={profile.about || ''}
                  onChange={onFieldChange}
                  placeholder="Write a short bio..."
                  style={{ width: '100%', minHeight: 96, padding: 10, borderRadius: 8, border: '1px solid #e6e4f2', fontSize: 14 }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                  <button onClick={handleAboutSave} style={primaryBtn}>Save</button>
                </div>
              </div>
            </div>

            {/* Right column */}
            <div style={{ flex: 1, minWidth: 360, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ ...card, paddingBottom: 16 }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Contact Information</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={label}>Official Email</div>
                    <input readOnly value={profile.officialEmail} style={input} />
                  </div>
                  <div>
                    <div style={label}>Phone</div>
                    <input name="phone" value={profile.phone || ''} onChange={onFieldChange} placeholder="+91 9xxxxxxxxx" style={input} />
                  </div>

                  <div>
                    <div style={label}>GitHub</div>
                    <input name="github" value={profile.github || ''} onChange={onFieldChange} placeholder="github.com/username" style={input} />
                  </div>
                  <div>
                    <div style={label}>LinkedIn</div>
                    <input name="linkedin" value={profile.linkedin || ''} onChange={onFieldChange} placeholder="linkedin.com/in/..." style={input} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                  <button onClick={handleContactSave} style={primaryBtn}>Save The Contact</button>
                </div>
              </div>

              <div style={card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Skills & Interests</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      list="skills-list"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="Add skill"
                      style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #e6e4f2', fontSize: 14 }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
                    />
                    <datalist id="skills-list">
                      {predefinedSkills.map((s) => <option key={s} value={s} />)}
                    </datalist>

                    <button onClick={handleAddSkill} style={secondaryBtn}>+ Add</button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {(profile.skills || []).length === 0 && <div style={{ color: '#777', fontSize: 13 }}>No skills added</div>}
                  {(profile.skills || []).map((s, i) => (
                    <div key={i} style={skillPill}>
                      <span style={{ marginRight: 8 }}>{s}</span>
                      <button onClick={() => handleRemoveSkill(i)} style={pillRemove}>×</button>
                    </div>
                  ))}
                </div>
              </div>

              <div style={card}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Achievements & Certification</div>
                <div style={{ color: '#666', fontSize: 13, marginBottom: 12 }}>
                  Add achievements to showcase your work.
                </div>

                {(profile.achievements || []).length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {(profile.achievements || []).map((a, idx) => (
                      <li key={idx} style={{ marginBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#333' }}>{a}</span>
                        <button onClick={() => handleRemoveAchievement(idx)} style={ghostSmall}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                  <button onClick={handleAddAchievement} style={primaryBtn}>+ Add Achievement</button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, color: '#2d6a4f', fontSize: 13 }}>{message}</div>
        </div>
      </main>
    </div>
  );
};

/* styles */
const card = {
  background: '#fff',
  borderRadius: 12,
  padding: 18,
  boxShadow: '0 6px 18px rgba(15,15,30,0.03)'
};

const label = {
  fontSize: 13,
  color: '#666',
  marginBottom: 6
};

const input = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid #e6e4f2',
  fontSize: 14,
  background: '#fbfbff'
};

const primaryBtn = {
  background: '#8e24aa',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '8px 14px',
  fontWeight: 700,
  cursor: 'pointer'
};

const secondaryBtn = {
  background: '#f3f0ff',
  color: '#8e24aa',
  border: 'none',
  borderRadius: 8,
  padding: '6px 10px',
  fontWeight: 700,
  cursor: 'pointer'
};

const ghostSmall = {
  background: 'transparent',
  color: '#8e24aa',
  border: 'none',
  cursor: 'pointer',
  fontSize: 13
};

const photoLabel = {
  marginTop: 6,
  background: '#fff',
  border: '1px solid #8e24aa',
  color: '#8e24aa',
  padding: '6px 10px',
  borderRadius: 8,
  fontSize: 13,
  cursor: 'pointer'
};

const skillPill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: '#f3f0ff',
  color: '#333',
  padding: '6px 10px',
  borderRadius: 999,
  fontSize: 14
};

const pillRemove = {
  background: '#8e24aa',
  color: '#fff',
  border: 'none',
  borderRadius: 999,
  width: 20,
  height: 20,
  lineHeight: 0,
  cursor: 'pointer'
};

export default Profile;