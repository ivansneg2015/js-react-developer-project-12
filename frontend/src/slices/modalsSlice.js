/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      const { type, extra } = payload;
      state.isOpened = true;
      state.type = type;
      state.extra = extra ?? null;
    },
    closeModal: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});
export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
