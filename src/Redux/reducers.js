import { SET_USER_NAME, SET_USER_AGE, GET_DATA } from './actions';

const initialState = {
  userName: '',
  userAge: 0,
  data: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case SET_USER_NAME:
    return { ...state, userName: action.payload };
  case SET_USER_AGE:
    return { ...state, age: action.payload };
  case GET_DATA:
    return { ...state, data: action.payload };
  default:
    return state;
  }
}

export default userReducer;
