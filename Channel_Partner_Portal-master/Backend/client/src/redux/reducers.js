// reducers.js
import { SET_USERNAME } from './constants';

const initialState = {
  username: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
    