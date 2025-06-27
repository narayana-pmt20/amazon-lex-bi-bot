import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_AWARDS_BEGIN   = 'FETCH_AWARDS_BEGIN';
export const FETCH_AWARDS_SUCCESS = 'FETCH_AWARDS_SUCCESS';
export const FETCH_AWARDS_FAILURE = 'FETCH_AWARDS_FAILURE';
export const CREATE_AWARD_BEGIN   = 'CREATE_AWARD_BEGIN';
export const CREATE_AWARD_SUCCESS = 'CREATE_AWARD_SUCCESS';
export const CREATE_AWARD_FAILURE = 'CREATE_AWARD_FAILURE';
export const CREATE_AWARD_CLEAR = 'CREATE_AWARD_CLEAR';

export const fetchAwardsBegin = () => ({
  type: FETCH_AWARDS_BEGIN
});

export const fetchAwardsSuccess = (awards, totalItems ) => ({
  type: FETCH_AWARDS_SUCCESS,
  payload: { awards, totalItems }
});

export const fetchAwardsFailure = error => ({
  type: FETCH_AWARDS_FAILURE,
  payload: { error }
});

export function fetchAwards(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchAwardsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[first_name_or_last_name_or_email_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/five_diamond_club_awards.json?page=${page}${sortString}${filterString}${queryString}`, {
      })
      .then(json => {
        dispatch(fetchAwardsSuccess(json.data.awards, json.data.total_entries));
        return json.data.awards;
      })
      .catch(error => dispatch(fetchAwardsFailure(error)));
  };
}

export const createAwardBegin = () => ({
  type: CREATE_AWARD_BEGIN
});

export const createAwardSuccess = (award) => ({
  type: CREATE_AWARD_SUCCESS,
  payload: { award }
});

export const createAwardFailure = error => ({
  type: CREATE_AWARD_FAILURE,
  payload: { error }
});

export const createAwardClear = () => ({
  type: CREATE_AWARD_CLEAR
});

export function createAward(data) {
  return dispatch => {
    dispatch(createAwardBegin());
    return axios.post(`${BASE_API_URL}/five_diamond_club_awards.json`, 
        data,
      )
      .then(json => {
        dispatch(createAwardSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createAwardFailure(error.response.data)));
  };
}