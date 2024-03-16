/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const defaultChannelId = 1;
const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    loadChannels: (state, { payload }) => {
      state.currentChannelId = defaultChannelId;
      channelsAdapter.addMany(state, payload);
    },
    addChannel: channelsAdapter.addOne,

    setCurrentChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },

    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        const newCurrentChannelId = state.ids[0];
        state.currentChannelId = newCurrentChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    renameChannel: channelsAdapter.updateOne,
  },
});
export const {
  addChannel,
  removeChannel,
  renameChannel,
  setCurrentChannel,
  loadChannels,
} = channelsSlice.actions;
export const selectorsChannels = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const selectCurrentChannel = (state) => {
  const { currentChannelId } = state.channels;
  return selectorsChannels.selectById(state, currentChannelId);
};
export { defaultChannelId };
export default channelsSlice.reducer;
