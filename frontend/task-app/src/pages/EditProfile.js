import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axiosConfig';

const EditProfile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUsername(decodedToken.user.username);
        setFullName(decodedToken.user.fullname);
      } catch (error) {
        console.error('Error decoding user data from token:', error);
      }
    };

    fetchData();
  }, []);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch('/api/users/profile', {
        username,
        fullname: fullName,
      });
      alert('Username and fullname updated successfully');
      setFullName(fullName);
      setUsername(username);
    } catch (error) {
      console.error('Error updating username and fullname:', error);
      alert('Failed to update username and fullname');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.patch('/api/users/password', {
        oldPassword,
        newPassword,
      });
      setOldPassword('');
      setNewPassword('');
      alert('Password updated successfully');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password');
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="edit-profile container mt-5" style={{ color: '#d2691e' }}>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Edit Profile</h2>
        <button className="btn btn-secondary" onClick={handleBackClick}>Back to Dashboard</button>
      </div>
      <form onSubmit={handleUsernameSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>

      <form onSubmit={handlePasswordSubmit} className="mt-4">
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Change Password</button>
      </form>
    </div>
  );
};

export default EditProfile;
