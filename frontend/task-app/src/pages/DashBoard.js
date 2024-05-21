import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';
import '../styles/DashBoard.css';
import AddTask from '../component/AddTask';
import Navbar from '../component/NavBar';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all', '1', '2', '3'

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  // Function to handle task creation
  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to handle task deletion
  const handleTaskDeleted = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle task completion
  const handleTaskCompleted = async (taskId, completed) => {
    try {
      const response = await axios.patch(`/api/tasks/${taskId}/completed`, { completed: !completed });
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle priority change
  const handlePriorityChange = async (taskId, priority) => {
    try {
      const response = await axios.patch(`api/tasks/${taskId}/priority`, { priority });
      setTasks(tasks.map(task => task._id === taskId ? response.data : task));
    } catch (err) {
      console.error(err);
    }
  };

  // Function to filter tasks based on status
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all' && priorityFilter === 'all') return true;
    if (filter !== 'all' && priorityFilter === 'all') {
      return filter === 'completed' ? task.completed : !task.completed;
    }
    if (filter === 'all' && priorityFilter !== 'all') {
      return task.priority === parseInt(priorityFilter, 10);
    }
    if (filter !== 'all' && priorityFilter !== 'all') {
      return (filter === 'completed' ? task.completed : !task.completed) && task.priority === parseInt(priorityFilter, 10);
    }
    return true;
  });

  // Function to search tasks by name
  const searchedTasks = filteredTasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="mb-4">Task Dashboard</h1>
        <AddTask onTaskAdded={handleTaskAdded} />
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="1">Priority 1</option>
              <option value="2">Priority 2</option>
              <option value="3">Priority 3</option>
            </select>
          </div>
        </div>
        <ul className="list-group">
          {searchedTasks.map(task => (
            <li key={task._id} className={`list-group-item ${task.completed ? 'list-group-item-success' : ''}`}>
              <span>{task.name}</span>
              <div className="float-right">
                <button className="btn btn-sm btn-info mr-2" onClick={() => handleTaskCompleted(task._id, task.completed)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <select
                  className="btn btn-sm btn-secondary mr-2 mx-2"
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(task._id, e.target.value)}

                >
                  <option value="1">Priority 1</option>
                  <option value="2">Priority 2</option>
                  <option value="3">Priority 3</option>
                </select>
                <button className="btn btn-sm btn-danger" onClick={() => handleTaskDeleted(task._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
