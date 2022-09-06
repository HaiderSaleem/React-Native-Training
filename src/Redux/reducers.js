import {
  SET_USER_NAME, SET_USER_PASSWORD, GET_DATA, SET_PROFILE_IMAGE,
} from './actions';

const initialState = {
  userName: '',
  userAge: 0,
  profileUri: '',
  data: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case SET_USER_NAME:
    return { ...state, userName: action.payload };
  case SET_USER_PASSWORD:
    return { ...state, password: action.payload };
  case SET_PROFILE_IMAGE:
    return { ...state, profileUri: action.payload };
  case GET_DATA:
    return { ...state, data: action.payload };
  default:
    return state;
  }
}

export default userReducer;
