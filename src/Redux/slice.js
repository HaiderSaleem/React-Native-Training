import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    userName: '',
    userAge: 0,
    profileUri: '',
    coverUri: '',
    data: [],
  },

  reducers: {
    setName: (state, action) => ({ ...state, userName: action.payload }),
    setPassword: (state, action) => ({ ...state, password: action.payload }),
    setProfileImage: (state, action) => ({ ...state, profileUri: action.payload }),
    setCoverImage: (state, action) => ({ ...state, coverUri: action.payload }),
    setData: (state, action) => ({ ...state, data: action.payload }),
  },
});

export const getAPIData = () => {
  const options = {
    method: 'GET',
    url: 'https://mocki.io/v1/5985dc76-3ebe-4979-89cb-2b23ba04993f', // 'https://alpha-vantage.p.rapidapi.com/query',
    // params: {
    //   function: 'TIME_SERIES_DAILY',
    //   symbol: 'MSFT',
    //   datatype: 'json',
    //   output_size: 'compact',
    // },
    headers: {
      'Content-Type': 'application/json',
      // 'X-RapidAPI-Key': RAPID_API_KEY,
      //  'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
    },
  };

  return async (dispatch) => {
    const response = await axios.request(options);
    if (response != null) {
      console.log(response.data);
      dispatch(userSlice.actions.setData(response.data));
    }
  };
};
export const setName = (userName) => (dispatch) => {
  dispatch(
    userSlice.actions.setName(userName),
  );
};

export const setPassword = (password) => (dispatch) => {
  dispatch(userSlice.actions.setPassword(password));
};

export const setProfileImage = (profileUri) => (dispatch) => {
  dispatch(userSlice.actions.setProfileImage(profileUri));
};

export const setCoverImage = (coverUri) => (dispatch) => {
  dispatch(userSlice.actions.setCoverImage(coverUri));
};

export const setData = (data) => (dispatch) => {
  dispatch(userSlice.actions.setData(data));
};

export default userSlice;
