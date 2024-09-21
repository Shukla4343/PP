// actions.js
import { SET_USERNAME } from './constants';

export const setUsername = (username) => {
  return { type: 'SET_USERNAME', payload: username };
};

