import {configureStore} from '@reduxjs/toolkit';
import toodoListReducer from './todoList/todoListSlice';

export const store = configureStore({
  reducer: {
    todo: toodoListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
