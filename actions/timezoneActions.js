import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_TIMEZONES_BEGIN   = 'FETCH_TIMEZONES_BEGIN';
export const FETCH_TIMEZONES_SUCCESS = 'FETCH_TIMEZONES_SUCCESS';
export const FETCH_TIMEZONES_FAILURE = 'FETCH_TIMEZONES_FAILURE';

export const fetchTimezonesBegin = () => ({
  type: FETCH_TIMEZONES_BEGIN
});

export const fetchTimezonesSuccess = (timezones) => ({
  type: FETCH_TIMEZONES_SUCCESS,
  payload: { timezones }
});

export const fetchTimezonesFailure = error => ({
  type: FETCH_TIMEZONES_FAILURE,
  payload: { error }
});

export function fetchTimezones() {
  return dispatch => {
    dispatch(fetchTimezonesBegin());
    return axios.get(`${BASE_API_URL}/timezones.json`, {
      })
      .then(json => {
        dispatch(fetchTimezonesSuccess(json.data.timezones));
        return json.data.timezones;
      })
      .catch(error => dispatch(fetchTimezonesFailure(error)));
  };
}
