'use client';

import { useEffect, useState } from 'react';
import { useSocket } from '../components/providers/socket-provider';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const socket = useSocket();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo'
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch tasks');
      }
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    if (socket) {
      socket.on('newTask', (task) => {
        setTasks(prevTasks => [...prevTasks, task]);
      });

      return () => {
        socket.off('newTask');
      };
    }
  }, [socket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          dueDate: new Date().toISOString(),
          createdBy: 'currentUserId', // Replace with actual user ID
          assignedTo: 'currentUserId' // Replace with actual user ID
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo'
      });

      if (socket) {
        const newTask = await response.json();
        socket.emit('taskCreated', newTask);
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-100 p-4 rounded">
          <h2 className="text-xl font-bold">Total Tasks</h2>
          <p className="text-3xl">{tasks.length}</p>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <h2 className="text-xl font-bold">Completed</h2>
          <p className="text-3xl">{tasks.filter(t => t.status === 'completed').length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded">
          <h2 className="text-xl font-bold">In Progress</h2>
          <p className="text-3xl">{tasks.filter(t => t.status === 'in-progress').length}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h2 className="text-xl font-bold">Overdue</h2>
          <p className="text-3xl">
            {tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full p-2 border rounded"
              required
              value={formData.title}
              onChange={handleChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              className="w-full p-2 border rounded"
              required
              value={formData.description}
              onChange={handleChange}
            />
            <select 
              name="priority"
              className="w-full p-2 border rounded"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task: any) => (
            <div key={task._id} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
              <div className="mt-2 flex items-center gap-4">
                <span className="text-sm text-gray-500">Priority: {task.priority}</span>
                <span className="text-sm text-gray-500">Status: {task.status}</span>
                <span className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}