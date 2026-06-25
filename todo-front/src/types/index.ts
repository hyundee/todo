export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ON_HOLD';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  dueDate: string | null;
  status: Status;
  priority: Priority;
  members: User[];
}

export interface TodoFormData {
  id?: number;
  title: string;
  content: string;
  dueDate: string;
  status: Status;
  priority: Priority;
  members: User[];
}
