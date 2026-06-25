import { Todo, TodoFormData, User } from '../types';

const BASE_URL = 'http://localhost:8080';

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/user`);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  create: async (data: Pick<User, 'name' | 'email'>): Promise<User> => {
    const res = await fetch(`${BASE_URL}/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  },

  update: async (data: User): Promise<User> => {
    const res = await fetch(`${BASE_URL}/user`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/user/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete user');
  },
};

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const res = await fetch(`${BASE_URL}/todo`);
    if (!res.ok) throw new Error('Failed to fetch todos');
    return res.json();
  },

  create: async (data: TodoFormData): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/todo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create todo');
    return res.json();
  },

  update: async (data: TodoFormData): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/todo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/todo/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete todo');
  },
};
