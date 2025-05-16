import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TodoItem {
  id?: number;
  title?: string;
  description?: string;
  date?: string;
  status?: string;
  key?: number;
  editData?: any;
  filter?: string;
}

interface TodoState {
  modalVisible: boolean;
  editModalVisible: boolean;
  sheet: boolean;
  todo: TodoItem[];
  status: TodoItem[];
  edit: TodoItem | null;
}

const initialState: TodoState = {
  modalVisible: false,
  editModalVisible: false,
  sheet: false,
  todo: [],
  status: [],
  edit: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    toggleModal(state) {
      state.modalVisible = !state.modalVisible;
      if (state.modalVisible === false) state.edit = null;
    },
    toggleEditModal(state) {
      state.editModalVisible = !state.editModalVisible;
    },
    setSheet(state, action: PayloadAction<boolean>) {
      state.sheet = action.payload;
    },
    addTodo(state, action: PayloadAction<TodoItem>) {
      state.todo.push(action.payload);
    },
    setEdit(state, action: PayloadAction<TodoItem | null>) {
      state.edit = action.payload;
    },
    editTodo(state, action: PayloadAction<TodoItem>) {
      const index = state.todo.findIndex(t => t.id === action.payload.id);
      if (index > -1) {
        state.todo[index] = action.payload;
        state.edit = null;
      }
    },
    setFilteredStatus(state, action: PayloadAction<TodoItem[]>) {
      state.status = action.payload;
    },
  },
});

export const {
  toggleModal,
  toggleEditModal,
  setSheet,
  addTodo,
  setEdit,
  editTodo,
  setFilteredStatus,
} = todoSlice.actions;

export default todoSlice.reducer;
