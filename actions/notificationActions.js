import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const UPDATE_NOTIFICATION_BEGIN = 'UPDATE_NOTIFICATION_BEGIN';
export const UPDATE_NOTIFICATION_SUCCESS = 'UPDATE_NOTIFICATION_SUCCESS';
export const UPDATE_NOTIFICATION_FAILURE = 'UPDATE_NOTIFICATION_FAILURE';
export const UPDATE_NOTIFICATION_CLEAR = 'UPDATE_NOTIFICATION_CLEAR';

export const updateNotificationBegin = () => ({
  type: UPDATE_NOTIFICATION_BEGIN
});

export const updateNotificationSuccess = (notification) => ({
  type: UPDATE_NOTIFICATION_SUCCESS,
  payload: { notification }
});

export const updateNotificationFailure = error => ({
  type: UPDATE_NOTIFICATION_FAILURE,
  payload: { error }
});

export const updateNotificationClear = () => ({
  type: UPDATE_NOTIFICATION_CLEAR
});

export function updateNotification(id) {
  return dispatch => {
    dispatch(updateNotificationBegin());
    return axios.put(`${BASE_API_URL}/notifications/${id}.json`,null,
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateNotificationSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateNotificationFailure(error))
      });
  };
}