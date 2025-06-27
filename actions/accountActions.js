import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_ACCOUNT_BEGIN = 'FETCH_ACCOUNT_BEGIN';
export const FETCH_ACCOUNT_SUCCESS = 'FETCH_ACCOUNT_SUCCESS';
export const FETCH_ACCOUNT_FAILURE = 'FETCH_ACCOUNT_FAILURE';

export const UPDATE_ACCOUNT_BEGIN = 'UPDATE_ACCOUNT_BEGIN';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';
export const UPDATE_ACCOUNT_CLEAR = 'UPDATE_ACCOUNT_CLEAR';

export const REMOVE_LOGO_BEGIN = 'REMOVE_LOGO_BEGIN';
export const REMOVE_LOGO_SUCCESS = 'REMOVE_LOGO_SUCCESS';
export const REMOVE_LOGO_FAILURE = 'REMOVE_LOGO_FAILURE';
export const REMOVE_LOGO_CLEAR = 'REMOVE_LOGO_CLEAR';

export const UPDATE_API_TOKEN_BEGIN = 'UPDATE_API_TOKEN_BEGIN';
export const UPDATE_API_TOKEN_SUCCESS = 'UPDATE_API_TOKEN_SUCCESS';
export const UPDATE_API_TOKEN_FAILURE = 'UPDATE_API_TOKEN_FAILURE';
export const UPDATE_API_TOKEN_CLEAR = 'UPDATE_API_TOKEN_CLEAR';

export const fetchAccountBegin = () => ({
  type: FETCH_ACCOUNT_BEGIN
});

export const fetchAccountSuccess = (account) => ({
  type: FETCH_ACCOUNT_SUCCESS,
  payload: { account }
});

export const fetchAccountFailure = error => ({
  type: FETCH_ACCOUNT_FAILURE,
  payload: { error }
});

export function fetchAccount() {
  return dispatch => {
    dispatch(fetchAccountBegin());
    return axios.get(`${BASE_API_URL}/account.json`, {
    })
      .then(json => {
        dispatch(fetchAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchAccountFailure(error)));
  };
}

export const updateApiTokenBegin = () => ({
  type: UPDATE_API_TOKEN_BEGIN
});

export const updateApiTokenSuccess = (account) => ({
  type: UPDATE_API_TOKEN_SUCCESS,
  payload: { account }
});

export const updateApiTokenFailure = error => ({
  type: UPDATE_API_TOKEN_FAILURE,
  payload: { error }
});

export const updateApiTokenClear = () => ({
  type: UPDATE_API_TOKEN_CLEAR
});

export function updateApiToken(values) {
  return dispatch => {
    dispatch(updateApiTokenBegin());
    return axios.put(`${BASE_API_URL}/api_token.json`,
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(updateApiTokenSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateApiTokenFailure(error.response.data)));
  };
}


export const updateAccountBegin = () => ({
  type: UPDATE_ACCOUNT_BEGIN
});

export const updateAccountSuccess = (account) => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  payload: { account }
});

export const updateAccountFailure = error => ({
  type: UPDATE_ACCOUNT_FAILURE,
  payload: { error }
});

export const updateAccountClear = () => ({
  type: UPDATE_ACCOUNT_CLEAR
});

export function updateAccount(formData) {
  return dispatch => {
    dispatch(updateAccountBegin());
    return axios.put(`${BASE_API_URL}/account.json`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(json => {
        dispatch(updateAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateAccountFailure(error.response.data)));
  };
}

export const removeLogoBegin = () => ({
  type: REMOVE_LOGO_BEGIN
});

export const removeLogoSuccess = (account) => ({
  type: REMOVE_LOGO_SUCCESS,
  payload: { account }
});

export const removeLogoFailure = error => ({
  type: REMOVE_LOGO_FAILURE,
  payload: { error }
});

export const removeLogoClear = () => ({
  type: REMOVE_LOGO_CLEAR
});

export function removeLogo() {
  return dispatch => {
    dispatch(removeLogoBegin());
    return axios.put(`${BASE_API_URL}/account/remove_logo.json`,
      null,
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(removeLogoSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(removeLogoFailure(error.response.data)));
  };
}


