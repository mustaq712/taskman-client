import React, { useState } from 'react';
import axios from '../axiosConfig';

const AddTask = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskName.trim() === '') {
      setError('Task name cannot be empty');
      return;
    }

    try {
      // Get the user ID from the JWT token stored in localStorage
      const token = localStorage.getItem('token');
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userId = decodedToken.user.id;

      // Add the task with the current user's ID
      const response = await axios.post('/api/tasks', { name: taskName, userId });
      onTaskAdded(response.data);
      setTaskName('');
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error adding task');
    }
  };

  return (
    <div className="add-task container mt-4">
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          className="form-control"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  </div>
  );
};

export default AddTask;
