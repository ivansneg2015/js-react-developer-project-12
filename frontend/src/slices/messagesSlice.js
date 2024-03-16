import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
// import { actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
});
export const { addMessage, addMessages } = messagesSlice.actions;
export const selectorsMessage = messagesAdapter.getSelectors(
  (state) => state.messages,
);
export default messagesSlice.reducer;
