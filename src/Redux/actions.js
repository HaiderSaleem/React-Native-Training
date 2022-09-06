import axios from 'axios';
import { RAPID_API_KEY } from '@env';

export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const GET_DATA = 'GET_DATA';
export const SET_PROFILE_IMAGE = 'SET_PROFILE_IMAGE';

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
      dispatch({
        type: GET_DATA,
        payload: response.data,
      });
    }
  };
};
export const setName = (userName) => (dispatch) => {
  dispatch({
    type: SET_USER_NAME,
    payload: userName,
  });
};

export const setPassword = (password) => (dispatch) => {
  dispatch({
    type: SET_USER_PASSWORD,
    payload: password,
  });
};

export const setProfileImage = (profileUri) => (dispatch) => {
  dispatch({
    type: SET_PROFILE_IMAGE,
    payload: profileUri,
  });
};

export const setData = (data) => (dispatch) => {
  dispatch({
    type: SET_USER_PASSWORD,
    payload: data,
  });
};
