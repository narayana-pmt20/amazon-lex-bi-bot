import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CALENDAR_EVENTS_BEGIN = 'FETCH_CALENDAR_EVENTS_BEGIN';
export const FETCH_CALENDAR_EVENTS_SUCCESS = 'FETCH_CALENDAR_EVENTS_SUCCESS';
export const FETCH_CALENDAR_EVENTS_FAILURE = 'FETCH_CALENDAR_EVENTS_FAILURE';
export const FETCH_CALENDAR_EVENTS_CLEAR = 'FETCH_CALENDAR_EVENTS_CLEAR';

export const UPDATE_CALENDAR_EVENT_BEGIN = 'UPDATE_CALENDAR_EVENT_BEGIN';
export const UPDATE_CALENDAR_EVENT_SUCCESS = 'UPDATE_CALENDAR_EVENT_SUCCESS';
export const UPDATE_CALENDAR_EVENT_FAILURE = 'UPDATE_CALENDAR_EVENT_FAILURE';
export const UPDATE_CALENDAR_EVENT_CLEAR = 'UPDATE_CALENDAR_EVENT_CLEAR';

export const DELETE_CALENDAR_EVENT_BEGIN = 'DELETE_CALENDAR_EVENT_BEGIN';
export const DELETE_CALENDAR_EVENT_SUCCESS = 'DELETE_CALENDAR_EVENT_SUCCESS';
export const DELETE_CALENDAR_EVENT_FAILURE = 'DELETE_CALENDAR_EVENT_FAILURE';

export const CANCEL_CALENDAR_EVENT = 'CANCEL_CALENDAR_EVENT';

export const fetchEventsBegin = () => ({
  type: FETCH_CALENDAR_EVENTS_BEGIN
});

export const fetchEventsSuccess = (calendar_events) => ({
  type: FETCH_CALENDAR_EVENTS_SUCCESS,
  payload: { calendar_events }
});

export const fetchEventsFailure = error => ({
  type: FETCH_CALENDAR_EVENTS_FAILURE,
  payload: { error }
});

export const fetchEventsClear = () => ({
  type: FETCH_CALENDAR_EVENTS_CLEAR
});

export function fetchEvents(start, end, contact_id = null) {
  return dispatch => {
    dispatch(fetchEventsBegin());
    let url = `${BASE_API_URL}/calendar_events.json?`
    if (start) {
      url += `start=${start}&`
    }
    if (end) {
      url += `end=${end}&`
    }
    if (contact_id) {
      url += `contact_id=${contact_id}`
    }

    return axios.get(url, {
    })
      .then(json => {
        dispatch(fetchEventsSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchEventsFailure(error)));
  };
}


export const updateCalendarEventBegin = () => ({
  type: UPDATE_CALENDAR_EVENT_BEGIN
});

export const updateCalendarEventSuccess = (message) => ({
  type: UPDATE_CALENDAR_EVENT_SUCCESS,
  payload: { message }
});

export const updateCalendarEventFailure = error => ({
  type: UPDATE_CALENDAR_EVENT_FAILURE,
  payload: { error }
});

export const updateCalendarEventClear = () => ({
  type: UPDATE_CALENDAR_EVENT_CLEAR
});

export function updateCalendarEvent(id, values) {
  return dispatch => {
    dispatch(updateCalendarEventBegin());
    return axios.put(`${BASE_API_URL}/calendar_events/${id}.json`, 
      JSON.stringify({ calendar_event: values }), 
      { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        dispatch(updateCalendarEventSuccess(response.data.message));
        return response.data;
      })
      .catch(error => {
        dispatch(updateCalendarEventFailure(error.response.data));
      });
  };
}

export const cancelCalendarEvent = (id, cancellationReason) => ({
  type: CANCEL_CALENDAR_EVENT,
  payload: { id, cancellationReason }
});

export const deleteCalendarEventBegin = () => ({
  type: DELETE_CALENDAR_EVENT_BEGIN,
});

export const deleteCalendarEventSuccess = (id) => ({
  type: DELETE_CALENDAR_EVENT_SUCCESS,
  payload: { id },
});

export const deleteCalendarEventFailure = (error) => ({
  type: DELETE_CALENDAR_EVENT_FAILURE,
  payload: { error },
});

export function deleteCalendarEvent(id, cancellationReason = 'Deleted by user') {
  return (dispatch) => {
    dispatch(deleteCalendarEventBegin());
    return axios
      .put(`/api/v2/calendar_events/${id}.json`, {
        calendar_event: { cancelled: true, cancellation_reason: cancellationReason },
      })
      .then(() => {
        return axios
          .delete(`/api/v2/calendar_events/${id}.json`)
          .then(() => {
            dispatch(deleteCalendarEventSuccess(id));
          })
          .catch((error) => {
            dispatch(deleteCalendarEventFailure(error.response.data));
          });
      })
      .catch((error) => {
        dispatch(deleteCalendarEventFailure(error.response.data));
      });
  };
}