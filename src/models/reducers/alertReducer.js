import { createReducer } from '@reduxjs/toolkit';
import { toggleShowAlert } from 'models/actions/alertActions';

const initialState = {
  message: 'Alert',
  show: false,
  type: 'success',
};
const alertReducer = createReducer(initialState, (builder) => {
  builder.addCase(toggleShowAlert, (state, action) => {
    return {
      ...state,
      show: action.payload.show,
      message: action.payload.message,
      type: action.payload.type,
    };
  });
});

export default alertReducer;
