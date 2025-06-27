import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_AUTHORIZATION_BEGIN = 'FETCH_AUTHORIZATION_BEGIN';
export const FETCH_AUTHORIZATION_SUCCESS = 'FETCH_AUTHORIZATION_SUCCESS';
export const FETCH_AUTHORIZATION_FAILURE = 'FETCH_AUTHORIZATION_FAILURE';
export const FETCH_AUTHORIZATION_CLEAR = 'FETCH_AUTHORIZATION_CLEAR';

export const DELETE_AUTHORIZATION_BEGIN = 'DELETE_AUTHORIZATION_BEGIN';
export const DELETE_AUTHORIZATION_SUCCESS = 'DELETE_AUTHORIZATION_SUCCESS';
export const DELETE_AUTHORIZATION_FAILURE = 'DELETE_AUTHORIZATION_FAILURE';
export const DELETE_AUTHORIZATION_CLEAR = 'DELETE_AUTHORIZATION_CLEAR';

export const fetchAuthorizationBegin = () => ({
  type: FETCH_AUTHORIZATION_BEGIN,
});

export const fetchAuthorizationSuccess = (authorization) => ({
  type: FETCH_AUTHORIZATION_SUCCESS,
  payload: { authorization },
});

export const fetchAuthorizationFailure = (error) => ({
  type: FETCH_AUTHORIZATION_FAILURE,
  payload: { error },
});

export const fetchAuthorizationClear = () => ({
  type: FETCH_AUTHORIZATION_CLEAR,
});

export function fetchAuthorization(provider) {
  return (dispatch) => {
    dispatch(fetchAuthorizationBegin());
    return axios.get(`${BASE_API_URL}/authorizations.json`, {
      params: { provider }
    })
      .then((response) => {
        dispatch(fetchAuthorizationSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(fetchAuthorizationFailure(error.response.data));
      });
  };
}

export const deleteAuthorizationBegin = () => ({
  type: DELETE_AUTHORIZATION_BEGIN,
});

export const deleteAuthorizationSuccess = () => ({
  type: DELETE_AUTHORIZATION_SUCCESS,
});

export const deleteAuthorizationFailure = (error) => ({
  type: DELETE_AUTHORIZATION_FAILURE,
  payload: { error },
});

export const deleteAuthorizationClear = () => ({
  type: DELETE_AUTHORIZATION_CLEAR,
});

export function deleteAuthorization(provider) {
  return (dispatch) => {
    dispatch(deleteAuthorizationBegin());
    return axios.delete(`${BASE_API_URL}/authorizations.json`, {
      params: { provider }
    })
      .then(() => {
        dispatch(deleteAuthorizationSuccess());
      })
      .catch((error) => {
        dispatch(deleteAuthorizationFailure(error.response.data));
      });
  };
}