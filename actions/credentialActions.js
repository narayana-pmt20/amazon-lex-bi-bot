import { buildSortString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CREDENTIALS_BEGIN   = 'FETCH_CREDENTIALS_BEGIN';
export const FETCH_CREDENTIALS_SUCCESS = 'FETCH_CREDENTIALS_SUCCESS';
export const FETCH_CREDENTIALS_FAILURE = 'FETCH_CREDENTIALS_FAILURE';

export const fetchCredentialsBegin = () => ({
  type: FETCH_CREDENTIALS_BEGIN
});

export const fetchCredentialsSuccess = (credentials, totalItems) => ({
  type: FETCH_CREDENTIALS_SUCCESS,
  payload: { credentials, totalItems }
});

export const fetchCredentialsFailure = error => ({
  type: FETCH_CREDENTIALS_FAILURE,
  payload: { error }
});

export function fetchCredentials(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchCredentialsBegin());
    let sortString = buildSortString(sorter);
    return axios.get(`${BASE_API_URL}/credentials.json?page=${page}${sortString}`, {
      })
      .then(json => {
        dispatch(fetchCredentialsSuccess(json.data.credentials, json.data.total_entries));
        return json.data.credentials;
      })
      .catch(error => dispatch(fetchCredentialsFailure(error)));
  };
}

