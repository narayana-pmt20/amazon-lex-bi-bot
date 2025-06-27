import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_CALENDAR_BEGIN = 'CREATE_CALENDAR_BEGIN';
export const CREATE_CALENDAR_SUCCESS = 'CREATE_CALENDAR_SUCCESS';
export const CREATE_CALENDAR_FAILURE = 'CREATE_CALENDAR_FAILURE';
export const CREATE_CALENDAR_CLEAR = 'CREATE_CALENDAR_CLEAR';

export const UPDATE_CALENDAR_BEGIN = 'UPDATE_CALENDAR_BEGIN';
export const UPDATE_CALENDAR_SUCCESS = 'UPDATE_CALENDAR_SUCCESS';
export const UPDATE_CALENDAR_FAILURE = 'UPDATE_CALENDAR_FAILURE';
export const UPDATE_CALENDAR_CLEAR = 'UPDATE_CALENDAR_CLEAR';

export const FETCH_EXTERNAL_CALENDARS_BEGIN = 'FETCH_EXTERNAL_CALENDARS_BEGIN';
export const FETCH_EXTERNAL_CALENDARS_SUCCESS = 'FETCH_EXTERNAL_CALENDARS_SUCCESS';
export const FETCH_EXTERNAL_CALENDARS_FAILURE = 'FETCH_EXTERNAL_CALENDARS_FAILURE';

export const DELETE_EXTERNAL_CALENDAR_BEGIN = 'DELETE_EXTERNAL_CALENDAR_BEGIN';
export const DELETE_EXTERNAL_CALENDAR_SUCCESS = 'DELETE_EXTERNAL_CALENDAR_SUCCESS';
export const DELETE_EXTERNAL_CALENDAR_FAILURE = 'DELETE_EXTERNAL_CALENDAR_FAILURE';

export const createCalendarBegin = () => ({
  type: CREATE_CALENDAR_BEGIN
});

export const createCalendarSuccess = (calendar) => ({
  type: CREATE_CALENDAR_SUCCESS,
  payload: { calendar }
});

export const createCalendarFailure = error => ({
  type: CREATE_CALENDAR_FAILURE,
  payload: { error }
});

export const createCalendarClear = () => ({
  type: CREATE_CALENDAR_CLEAR
});

export function createCalendar(values) {
  return dispatch => {
    dispatch(createCalendarBegin());
    return axios.post(`${BASE_API_URL}/calendar.json`,
      JSON.stringify({ calendar: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createCalendarSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createCalendarFailure(error.response.data))
      });
  };
}

export const updateCalendarBegin = () => ({
  type: UPDATE_CALENDAR_BEGIN
});

export const updateCalendarSuccess = (calendar) => ({
  type: UPDATE_CALENDAR_SUCCESS,
  payload: { calendar }
});

export const updateCalendarFailure = error => ({
  type: UPDATE_CALENDAR_FAILURE,
  payload: { error }
});

export const updateCalendarClear = () => ({
  type: UPDATE_CALENDAR_CLEAR
});

export function updateCalendar(values) {
  return dispatch => {
    dispatch(updateCalendarBegin());
    return axios.put(`${BASE_API_URL}/calendar.json`,
      JSON.stringify({ calendar: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateCalendarSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateCalendarFailure(error.response.data))
      });
  };
}

export const fetchExternalCalendarsBegin = () => ({
  type: FETCH_EXTERNAL_CALENDARS_BEGIN
});

export const fetchExternalCalendarsSuccess = (calendars, agent_subscription, available_credits, total_credits, totalItems) => ({
  type: FETCH_EXTERNAL_CALENDARS_SUCCESS,
  payload: { calendars, agent_subscription, available_credits, total_credits, totalItems }
});

export const fetchExternalCalendarsFailure = error => ({
  type: FETCH_EXTERNAL_CALENDARS_FAILURE,
  payload: { error }
});

export function fetchExternalCalendars() {
  return dispatch => {
    dispatch(fetchExternalCalendarsBegin());
    return axios.get(`${BASE_API_URL}/external_calendars.json`, {
      })
      .then(json => {
        dispatch(fetchExternalCalendarsSuccess(json.data.calendars));
        return json.data.calendars;
      })
      .catch(error => dispatch(fetchExternalCalendarsFailure(error)));
  };
}

export async function validateCalendar(slug) {
  let json = await axios.post(`${BASE_API_URL}/calendar_validations.json`,
    JSON.stringify({ slug }),
    { headers: { 'Content-Type': 'application/json' } })
  return json.data;
}

export const deleteExternalCalendarBegin = () => ({
  type: DELETE_EXTERNAL_CALENDAR_BEGIN
});

export const deleteExternalCalendarSuccess = (calendar) => ({
  type: DELETE_EXTERNAL_CALENDAR_SUCCESS,
  payload: { calendar }
});

export const deleteExternalCalendarFailure = error => ({
  type: DELETE_EXTERNAL_CALENDAR_FAILURE,
  payload: { error }
});

export function deleteExternalCalendar() {
  return dispatch => {
    dispatch(deleteExternalCalendarBegin());
    return axios.delete(`${BASE_API_URL}/external_calendar.json`, {
      })
      .then(json => {
        dispatch(deleteExternalCalendarSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(deleteExternalCalendarFailure(error)));
  };
}
