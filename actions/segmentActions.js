import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_SEGMENTS_BEGIN   = 'FETCH_SEGMENTS_BEGIN';
export const FETCH_SEGMENTS_SUCCESS = 'FETCH_SEGMENTS_SUCCESS';
export const FETCH_SEGMENTS_FAILURE = 'FETCH_SEGMENTS_FAILURE';

export const UPDATE_SEGMENT_BEGIN   = 'UPDATE_SEGMENT_BEGIN';
export const UPDATE_SEGMENT_SUCCESS = 'UPDATE_SEGMENT_SUCCESS';
export const UPDATE_SEGMENT_FAILURE = 'UPDATE_SEGMENT_FAILURE';
export const UPDATE_SEGMENT_CLEAR   = 'UPDATE_SEGMENT_CLEAR';

export const CREATE_SEGMENT_BEGIN   = 'CREATE_SEGMENT_BEGIN';
export const CREATE_SEGMENT_FAILURE = 'CREATE_SEGMENT_FAILURE';
export const CREATE_SEGMENT_CLEAR   = 'CREATE_SEGMENT_CLEAR';

export const DELETE_SEGMENT_BEGIN   = 'DELETE_SEGMENT_BEGIN';
export const DELETE_SEGMENT_SUCCESS = 'DELETE_SEGMENT_SUCCESS';
export const DELETE_SEGMENT_FAILURE = 'DELETE_SEGMENT_FAILURE';

export const fetchSegmentsBegin = () => ({
  type: FETCH_SEGMENTS_BEGIN
});

export const fetchSegmentsSuccess = (segments, totalItems) => ({
  type: FETCH_SEGMENTS_SUCCESS,
  payload: { segments, totalItems }
});

export const fetchSegmentsFailure = error => ({
  type: FETCH_SEGMENTS_FAILURE,
  payload: { error }
});

export function fetchSegments(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchSegmentsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[name_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/segments.json?page=${page}${sortString}${filterString}${queryString}`)
      .then(json => {
        dispatch(fetchSegmentsSuccess(json.data.segments, json.data.total_entries));
        return json.data.segments;
      })
      .catch(error => dispatch(fetchSegmentsFailure(error)));
  };
}

export const updateSegmentBegin = () => ({
  type: UPDATE_SEGMENT_BEGIN
});

export const updateSegmentSuccess = (segment, allSegments) => ({
  type: UPDATE_SEGMENT_SUCCESS,
  payload: { segment, allSegments }
});

export const updateSegmentFailure = error => ({
  type: UPDATE_SEGMENT_FAILURE,
  payload: { error }
});

export const updateSegmentClear = () => ({
  type: UPDATE_SEGMENT_CLEAR
});

export function updateSegment(id, values) {
  return dispatch => {
    dispatch(updateSegmentBegin());
    return axios.put(`${BASE_API_URL}/segments/${id}.json`,
      JSON.stringify({ segment: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(updateSegmentSuccess(json.data, json.data.available_segments));
        return json.data;
      })
      .catch(error => dispatch(updateSegmentFailure(error.response.data)));
  };
}

export const createSegmentBegin = () => ({
  type: CREATE_SEGMENT_BEGIN
});

export const createSegmentFailure = error => ({
  type: CREATE_SEGMENT_FAILURE,
  payload: { error }
});

export const createSegmentClear = () => ({
  type: CREATE_SEGMENT_CLEAR
});

export function createSegments(values) {
  return dispatch => {
    dispatch(createSegmentBegin());
    return axios.post(`${BASE_API_URL}/segments.json`,
      JSON.stringify({ segment_list: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(createSegmentClear());
      })
      .catch(error => dispatch(createSegmentFailure(error.response.data)));
  };
}

export const deleteSegmentBegin = () => ({
  type: DELETE_SEGMENT_BEGIN
});

export const deleteSegmentSuccess = (segment) => ({
  type: DELETE_SEGMENT_SUCCESS,
  payload: { segment }
});

export const deleteSegmentFailure = error => ({
  type: DELETE_SEGMENT_FAILURE,
  payload: { error }
});

export function deleteSegment(segment) {
  return async (dispatch) => {
    dispatch(deleteSegmentBegin());
    await axios.delete(`${BASE_API_URL}/segments/${segment.id}.json`)
      .then(() => {
        dispatch(deleteSegmentSuccess(segment));
      })
      .catch(error => dispatch(deleteSegmentFailure(error)));
    dispatch(fetchSegments());
  };
}
