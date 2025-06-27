import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_BLOCKED_TIME_BEGIN = 'CREATE_BLOCKED_TIME_BEGIN';
export const CREATE_BLOCKED_TIME_SUCCESS = 'CREATE_BLOCKED_TIME_SUCCESS';
export const CREATE_BLOCKED_TIME_FAILURE = 'CREATE_BLOCKED_TIME_FAILURE';
export const CREATE_BLOCKED_TIME_CLEAR = 'CREATE_BLOCKED_TIME_CLEAR';

export const UPDATE_BLOCKED_TIME_BEGIN = 'UPDATE_BLOCKED_TIME_BEGIN';
export const UPDATE_BLOCKED_TIME_SUCCESS = 'UPDATE_BLOCKED_TIME_SUCCESS';
export const UPDATE_BLOCKED_TIME_FAILURE = 'UPDATE_BLOCKED_TIME_FAILURE';
export const UPDATE_BLOCKED_TIME_CLEAR = 'UPDATE_BLOCKED_TIME_CLEAR';

export const DELETE_BLOCKED_TIME_BEGIN = 'DELETE_BLOCKED_TIME_BEGIN';
export const DELETE_BLOCKED_TIME_SUCCESS = 'DELETE_BLOCKED_TIME_SUCCESS';
export const DELETE_BLOCKED_TIME_FAILURE = 'DELETE_BLOCKED_TIME_FAILURE';
export const DELETE_BLOCKED_TIME_CLEAR = 'DELETE_BLOCKED_TIME_CLEAR';

export const FETCH_BLOCKED_TIMES_BEGIN = 'FETCH_BLOCKED_TIMES_BEGIN';
export const FETCH_BLOCKED_TIMES_SUCCESS = 'FETCH_BLOCKED_TIMES_SUCCESS';
export const FETCH_BLOCKED_TIMES_FAILURE = 'FETCH_BLOCKED_TIMES_FAILURE';

export const fetchBlockedTimesBegin = () => ({
  type: FETCH_BLOCKED_TIMES_BEGIN
});

export const fetchBlockedTimesSuccess = (blockedTimes) => ({
  type: FETCH_BLOCKED_TIMES_SUCCESS,
  payload: { blockedTimes }
});

export const fetchBlockedTimesFailure = error => ({
  type: FETCH_BLOCKED_TIMES_FAILURE,
  payload: { error }
});

export function fetchBlockedTimes() {
  return dispatch => {
    dispatch(fetchBlockedTimesBegin());
    return axios.get(`${BASE_API_URL}/blocked_times.json`, {
      })
      .then(json => {
        dispatch(fetchBlockedTimesSuccess(json.data.blocked_times));
        return json.data.blocked_times;
      })
      .catch(error => dispatch(fetchBlockedTimesFailure(error)));
  };
}

export const createBlockedTimeBegin = () => ({
  type: CREATE_BLOCKED_TIME_BEGIN
});

export const createBlockedTimeSuccess = (blockedTime) => ({
  type: CREATE_BLOCKED_TIME_SUCCESS,
  payload: { blockedTime }
});

export const createBlockedTimeFailure = error => ({
  type: CREATE_BLOCKED_TIME_FAILURE,
  payload: { error }
});

export const createBlockedTimeClear = () => ({
  type: CREATE_BLOCKED_TIME_CLEAR
});

export function createBlockedTime(values) {
  return dispatch => {
    dispatch(createBlockedTimeBegin());
    return axios.post(`${BASE_API_URL}/blocked_times.json`,
      JSON.stringify({ blocked_time: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createBlockedTimeSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createBlockedTimeFailure(error.response.data))
      });
  };
}

export const updateBlockedTimeBegin = () => ({
  type: UPDATE_BLOCKED_TIME_BEGIN
});

export const updateBlockedTimeSuccess = (blockedTime) => ({
  type: UPDATE_BLOCKED_TIME_SUCCESS,
  payload: { blockedTime }
});

export const updateBlockedTimeFailure = error => ({
  type: UPDATE_BLOCKED_TIME_FAILURE,
  payload: { error }
});

export const updateBlockedTimeClear = () => ({
  type: UPDATE_BLOCKED_TIME_CLEAR
});

export function updateBlockedTime(id, values) {
  return dispatch => {
    dispatch(updateBlockedTimeBegin());
    return axios.put(`${BASE_API_URL}/blocked_times/${id}.json`,
      JSON.stringify({ blocked_time: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateBlockedTimeSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateBlockedTimeFailure(error.response.data))
      });
  };
}

export const deleteBlockedTimeBegin = () => ({
  type: DELETE_BLOCKED_TIME_BEGIN
});

export const deleteBlockedTimeSuccess = (blockedTime) => ({
  type: DELETE_BLOCKED_TIME_SUCCESS,
  payload: { blockedTime }
});

export const deleteBlockedTimeFailure = error => ({
  type: DELETE_BLOCKED_TIME_FAILURE,
  payload: { error }
});

export const deleteBlockedTimeClear = () => ({
  type: DELETE_BLOCKED_TIME_CLEAR
});

export function deleteBlockedTime(id) {
  return dispatch => {
    dispatch(deleteBlockedTimeBegin());
    return axios.delete(`${BASE_API_URL}/blocked_times/${id}.json`, {
      })
      .then(json => {
        dispatch(deleteBlockedTimeSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(deleteBlockedTimeFailure(error)));
  };
}
