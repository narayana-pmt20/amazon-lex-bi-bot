import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_ANNOUNCEMENTS_BEGIN = 'FETCH_ANNOUNCEMENTS_BEGIN';
export const FETCH_ANNOUNCEMENTS_SUCCESS = 'FETCH_ANNOUNCEMENTS_SUCCESS';
export const FETCH_ANNOUNCEMENTS_FAILURE = 'FETCH_ANNOUNCEMENTS_FAILURE';
export const FETCH_ANNOUNCEMENTS_CLEAR = 'FETCH_ANNOUNCEMENTS_CLEAR';

export const fetchAnnouncementsBegin = () => ({
  type: FETCH_ANNOUNCEMENTS_BEGIN
});

export const fetchAnnouncementsSuccess = (announcements) => ({
  type: FETCH_ANNOUNCEMENTS_SUCCESS,
  payload: { announcements }
});

export const fetchAnnouncementsFailure = error => ({
  type: FETCH_ANNOUNCEMENTS_FAILURE,
  payload: { error }
});

export const fetchAnnouncementsClear = () => ({
  type: FETCH_ANNOUNCEMENTS_CLEAR
});

export function fetchAnnouncements() {
  return dispatch => {
    dispatch(fetchAnnouncementsBegin());
    return axios.get(`${BASE_API_URL}/announcements.json`,
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(fetchAnnouncementsSuccess(json.data.announcements));
        return json.data.announcements;
      })
      .catch(error => {
        dispatch(fetchAnnouncementsFailure(error))
      });
  };
}