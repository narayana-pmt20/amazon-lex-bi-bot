import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_BOOST_SECTION_BEGIN   = 'CREATE_BOOST_SECTION_BEGIN';
export const CREATE_BOOST_SECTION_SUCCESS = 'CREATE_BOOST_SECTION_SUCCESS';
export const CREATE_BOOST_SECTION_FAILURE = 'CREATE_BOOST_SECTION_FAILURE';
export const CREATE_BOOST_SECTION_CLEAR = 'CREATE_BOOST_SECTION_CLEAR';

export const UPDATE_BOOST_SECTION_BEGIN   = 'UPDATE_BOOST_SECTION_BEGIN';
export const UPDATE_BOOST_SECTION_SUCCESS = 'UPDATE_BOOST_SECTION_SUCCESS';
export const UPDATE_BOOST_SECTION_FAILURE = 'UPDATE_BOOST_SECTION_FAILURE';
export const UPDATE_BOOST_SECTION_CLEAR = 'UPDATE_BOOST_SECTION_CLEAR';

export const createBoostSectionBegin = () => ({
  type: CREATE_BOOST_SECTION_BEGIN
});

export const createBoostSectionSuccess = (boostSection) => ({
  type: CREATE_BOOST_SECTION_SUCCESS,
  payload: { boostSection }
});

export const createBoostSectionFailure = error => ({
  type: CREATE_BOOST_SECTION_FAILURE,
  payload: { error }
});

export const createBoostSectionClear = () => ({
  type: CREATE_BOOST_SECTION_CLEAR
});

export function createBoostSection(values) {
  return dispatch => {
    dispatch(createBoostSectionBegin());
    return axios.post(`${BASE_API_URL}/boost_sections.json`, 
        JSON.stringify({boost_section: values}),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createBoostSectionSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createBoostSectionFailure(error.response.data))
      });
  };
}

export const updateBoostSectionBegin = () => ({
  type: UPDATE_BOOST_SECTION_BEGIN
});

export const updateBoostSectionSuccess = (boostSection) => ({
  type: UPDATE_BOOST_SECTION_SUCCESS,
  payload: { boostSection }
});

export const updateBoostSectionFailure = error => ({
  type: UPDATE_BOOST_SECTION_FAILURE,
  payload: { error }
});

export const updateBoostSectionClear = () => ({
  type: UPDATE_BOOST_SECTION_CLEAR
});

export function updateBoostSection(id, values) {
  return dispatch => {
    dispatch(updateBoostSectionBegin());
    return axios.put(`${BASE_API_URL}/boost_sections/${id}.json`, 
      JSON.stringify({boost_section: values}),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateBoostSectionSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateBoostSectionFailure(error.response.data)));
  };
}
