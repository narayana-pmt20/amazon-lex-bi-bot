import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_VIDEOS_BEGIN   = 'FETCH_VIDEOS_BEGIN';
export const FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS';
export const FETCH_VIDEOS_FAILURE = 'FETCH_VIDEOS_FAILURE';

export const fetchVideosBegin = () => ({
  type: FETCH_VIDEOS_BEGIN
});

export const fetchVideosSuccess = (videos, totalItems) => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload: { videos, totalItems }
});

export const fetchVideosFailure = error => ({
  type: FETCH_VIDEOS_FAILURE,
  payload: { error }
});

export function fetchVideos(page = 1, query, freeOnly = false) {
  return dispatch => {
    dispatch(fetchVideosBegin());
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[title_or_description_cont]=${query}`
    }
    const free = `&free=${freeOnly}`
    return axios.get(`${BASE_API_URL}/videos.json?page=${page}${queryString}${free}`, {
      })
      .then(json => {
        dispatch(fetchVideosSuccess(json.data.videos, json.data.total_entries ));
        return json.data.videos;
      })
      .catch(error => dispatch(fetchVideosFailure(error)));
  };
}