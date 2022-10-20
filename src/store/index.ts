import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user';

const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
