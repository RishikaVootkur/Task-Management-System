export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}