import { combineReducers } from '@reduxjs/toolkit';
import servicesReducer from './slices/servicesSlice';
import formReducer from './slices/formSlice';

const rootReducer = combineReducers({
  services: servicesReducer,
  form: formReducer,
});

export default rootReducer;

