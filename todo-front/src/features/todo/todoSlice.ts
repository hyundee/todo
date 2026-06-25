import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todoApi, userApi } from '../../api/todoApi';
import { Todo, TodoFormData, User, Status } from '../../types';

interface TodoState {
  items: Todo[];
  users: User[];
  loading: boolean;
  error: string | null;
  filterStatus: Status | 'ALL';
}

const initialState: TodoState = {
  items: [],
  users: [],
  loading: false,
  error: null,
  filterStatus: 'ALL',
};

export const fetchTodos = createAsyncThunk('todo/fetchAll', () => todoApi.getAll());
export const fetchUsers = createAsyncThunk('todo/fetchUsers', () => userApi.getAll());
export const createUser = createAsyncThunk(
  'todo/createUser',
  (data: Pick<User, 'name' | 'email'>) => userApi.create(data)
);
export const updateUser = createAsyncThunk('todo/updateUser', (data: User) =>
  userApi.update(data)
);
export const deleteUser = createAsyncThunk('todo/deleteUser', (id: number) =>
  userApi.delete(id).then(() => id)
);

export const createTodo = createAsyncThunk('todo/create', (data: TodoFormData) =>
  todoApi.create(data)
);

export const updateTodo = createAsyncThunk('todo/update', (data: TodoFormData) =>
  todoApi.update(data)
);

export const deleteTodo = createAsyncThunk('todo/delete', (id: number) =>
  todoApi.delete(id).then(() => id)
);

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setFilterStatus(state, action: PayloadAction<Status | 'ALL'>) {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.users[idx] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
