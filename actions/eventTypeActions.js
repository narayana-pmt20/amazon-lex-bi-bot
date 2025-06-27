import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_EVENT_TYPE_BEGIN = 'CREATE_EVENT_TYPE_BEGIN';
export const CREATE_EVENT_TYPE_SUCCESS = 'CREATE_EVENT_TYPE_SUCCESS';
export const CREATE_EVENT_TYPE_FAILURE = 'CREATE_EVENT_TYPE_FAILURE';
export const CREATE_EVENT_TYPE_CLEAR = 'CREATE_EVENT_TYPE_CLEAR';

export const UPDATE_EVENT_TYPE_BEGIN = 'UPDATE_EVENT_TYPE_BEGIN';
export const UPDATE_EVENT_TYPE_SUCCESS = 'UPDATE_EVENT_TYPE_SUCCESS';
export const UPDATE_EVENT_TYPE_FAILURE = 'UPDATE_EVENT_TYPE_FAILURE';
export const UPDATE_EVENT_TYPE_CLEAR = 'UPDATE_EVENT_TYPE_CLEAR';

export const DELETE_EVENT_TYPE_BEGIN = 'DELETE_EVENT_TYPE_BEGIN';
export const DELETE_EVENT_TYPE_SUCCESS = 'DELETE_EVENT_TYPE_SUCCESS';
export const DELETE_EVENT_TYPE_FAILURE = 'DELETE_EVENT_TYPE_FAILURE';
export const DELETE_EVENT_TYPE_CLEAR = 'DELETE_EVENT_TYPE_CLEAR';

export const FETCH_EVENT_TYPES_BEGIN = 'FETCH_EVENT_TYPES_BEGIN';
export const FETCH_EVENT_TYPES_SUCCESS = 'FETCH_EVENT_TYPES_SUCCESS';
export const FETCH_EVENT_TYPES_FAILURE = 'FETCH_EVENT_TYPES_FAILURE';

export const fetchEventTypesBegin = () => ({
  type: FETCH_EVENT_TYPES_BEGIN
});

export const fetchEventTypesSuccess = (eventTypes) => ({
  type: FETCH_EVENT_TYPES_SUCCESS,
  payload: { eventTypes }
});

export const fetchEventTypesFailure = error => ({
  type: FETCH_EVENT_TYPES_FAILURE,
  payload: { error }
});

export function fetchEventTypes() {
  return dispatch => {
    dispatch(fetchEventTypesBegin());
    return axios.get(`${BASE_API_URL}/event_types.json`, {
      })
      .then(json => {
        dispatch(fetchEventTypesSuccess(json.data.event_types));
        return json.data.event_types;
      })
      .catch(error => dispatch(fetchEventTypesFailure(error)));
  };
}

export const createEventTypeBegin = () => ({
  type: CREATE_EVENT_TYPE_BEGIN
});

export const createEventTypeSuccess = (eventType) => ({
  type: CREATE_EVENT_TYPE_SUCCESS,
  payload: { eventType }
});

export const createEventTypeFailure = error => ({
  type: CREATE_EVENT_TYPE_FAILURE,
  payload: { error }
});

export const createEventTypeClear = () => ({
  type: CREATE_EVENT_TYPE_CLEAR
});

export function createEventType(values) {
  return dispatch => {
    dispatch(createEventTypeBegin());
    return axios.post(`${BASE_API_URL}/event_types.json`,
      JSON.stringify({ event_type: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createEventTypeSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createEventTypeFailure(error.response.data))
      });
  };
}

export const updateEventTypeBegin = () => ({
  type: UPDATE_EVENT_TYPE_BEGIN
});

export const updateEventTypeSuccess = (eventType) => ({
  type: UPDATE_EVENT_TYPE_SUCCESS,
  payload: { eventType }
});

export const updateEventTypeFailure = error => ({
  type: UPDATE_EVENT_TYPE_FAILURE,
  payload: { error }
});

export const updateEventTypeClear = () => ({
  type: UPDATE_EVENT_TYPE_CLEAR
});

export function updateEventType(id, values) {
  return dispatch => {
    dispatch(updateEventTypeBegin());
    return axios.put(`${BASE_API_URL}/event_types/${id}.json`,
      JSON.stringify({ event_type: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateEventTypeSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateEventTypeFailure(error.response.data))
      });
  };
}

export const deleteEventTypeBegin = () => ({
  type: DELETE_EVENT_TYPE_BEGIN
});

export const deleteEventTypeSuccess = (eventType) => ({
  type: DELETE_EVENT_TYPE_SUCCESS,
  payload: { eventType }
});

export const deleteEventTypeFailure = error => ({
  type: DELETE_EVENT_TYPE_FAILURE,
  payload: { error }
});

export const deleteEventTypeClear = () => ({
  type: DELETE_EVENT_TYPE_CLEAR
});

export function deleteEventType(id) {
  return dispatch => {
    dispatch(deleteEventTypeBegin());
    return axios.delete(`${BASE_API_URL}/event_types/${id}.json`, {
      })
      .then(json => {
        dispatch(deleteEventTypeSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(deleteEventTypeFailure(error)));
  };
}

export async function validateEventType(slug) {
  let json = await axios.post(`${BASE_API_URL}/event_type_validations.json`,
    JSON.stringify({ slug }),
    { headers: { 'Content-Type': 'application/json' } })
  return json.data;
}
