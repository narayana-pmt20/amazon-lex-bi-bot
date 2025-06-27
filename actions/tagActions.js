import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_TAGS_BEGIN   = 'FETCH_TAGS_BEGIN';
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS';
export const FETCH_TAGS_FAILURE = 'FETCH_TAGS_FAILURE';

export const UPDATE_TAG_BEGIN   = 'UPDATE_TAG_BEGIN';
export const UPDATE_TAG_SUCCESS = 'UPDATE_TAG_SUCCESS';
export const UPDATE_TAG_FAILURE = 'UPDATE_TAG_FAILURE';
export const UPDATE_TAG_CLEAR   = 'UPDATE_TAG_CLEAR';

export const CREATE_TAG_BEGIN   = 'CREATE_TAG_BEGIN';
export const CREATE_TAG_FAILURE = 'CREATE_TAG_FAILURE';
export const CREATE_TAG_CLEAR   = 'CREATE_TAG_CLEAR';

export const DELETE_TAG_BEGIN   = 'DELETE_TAG_BEGIN';
export const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
export const DELETE_TAG_FAILURE = 'DELETE_TAG_FAILURE';

export const fetchTagsBegin = () => ({
  type: FETCH_TAGS_BEGIN
});

export const fetchTagsSuccess = (tags, totalItems) => ({
  type: FETCH_TAGS_SUCCESS,
  payload: { tags, totalItems }
});

export const fetchTagsFailure = error => ({
  type: FETCH_TAGS_FAILURE,
  payload: { error }
});

export function fetchTags(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchTagsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[name_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/tags.json?page=${page}${sortString}${filterString}${queryString}`, {
      })
      .then(json => {
        dispatch(fetchTagsSuccess(json.data.tags, json.data.total_entries));
        return json.data.tags;
      })
      .catch(error => dispatch(fetchTagsFailure(error)));
  };
}

export const updateTagBegin = () => ({
  type: UPDATE_TAG_BEGIN
});

export const updateTagSuccess = (tag, allTags) => ({
  type: UPDATE_TAG_SUCCESS,
  payload: { tag, allTags }
});

export const updateTagFailure = error => ({
  type: UPDATE_TAG_FAILURE,
  payload: { error }
});

export const updateTagClear = () => ({
  type: UPDATE_TAG_CLEAR
});

export function updateTag(id, values) {
  return dispatch => {
    dispatch(updateTagBegin());
    return axios.put(`${BASE_API_URL}/tags/${id}.json`,
      JSON.stringify({tag: values}),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(updateTagSuccess(json.data, json.data.available_tags));
        return json.data;
      })
      .catch(error => dispatch(updateTagFailure(error.response.data)));
  };
}

export const createTagBegin = () => ({
  type: CREATE_TAG_BEGIN
});

export const createTagFailure = error => ({
  type: CREATE_TAG_FAILURE,
  payload: { error }
});

export const createTagClear = () => ({
  type: CREATE_TAG_CLEAR
});

export function createTags(values) {
  return dispatch => {
    dispatch(createTagBegin());
    return axios.post(`${BASE_API_URL}/tags.json`,
      JSON.stringify({ tag_list: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(createTagClear());
      })
      .catch(error => dispatch(createTagFailure(error.response.data)));
  };
}

export const deleteTagBegin = () => ({
  type: DELETE_TAG_BEGIN
});

export const deleteTagSuccess = (tag) => ({
  type: DELETE_TAG_SUCCESS,
  payload: { tag }
});

export const deleteTagFailure = error => ({
  type: DELETE_TAG_FAILURE,
  payload: { error }
});

export function deleteTag(tag) {
  return async (dispatch) => {
    dispatch(deleteTagBegin());
    await axios.delete(`${BASE_API_URL}/tags/${tag.id}.json`, {
      })
      .then(json => {
        dispatch(deleteTagSuccess(tag));
        return tag;
      })
      .catch(error => dispatch(deleteTagFailure(error)));
    dispatch(fetchTags());
  };
}



