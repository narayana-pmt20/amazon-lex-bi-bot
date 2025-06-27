import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CAMPAIGNS_BEGIN   = 'FETCH_CAMPAIGNS_BEGIN';
export const FETCH_CAMPAIGNS_SUCCESS = 'FETCH_CAMPAIGNS_SUCCESS';
export const FETCH_CAMPAIGNS_FAILURE = 'FETCH_CAMPAIGNS_FAILURE';

export const FETCH_CAMPAIGN_BEGIN   = 'FETCH_CAMPAIGN_BEGIN';
export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS';
export const FETCH_CAMPAIGN_FAILURE = 'FETCH_CAMPAIGN_FAILURE';
export const FETCH_CAMPAIGN_CLEAR = 'FETCH_CAMPAIGN_CLEAR';

export const CREATE_CAMPAIGN_BEGIN   = 'CREATE_CAMPAIGN_BEGIN';
export const CREATE_CAMPAIGN_SUCCESS = 'CREATE_CAMPAIGN_SUCCESS';
export const CREATE_CAMPAIGN_FAILURE = 'CREATE_CAMPAIGN_FAILURE';
export const CREATE_CAMPAIGN_CLEAR = 'CREATE_CAMPAIGN_CLEAR';

export const UPDATE_CAMPAIGN_BEGIN   = 'UPDATE_CAMPAIGN_BEGIN';
export const UPDATE_CAMPAIGN_SUCCESS = 'UPDATE_CAMPAIGN_SUCCESS';
export const UPDATE_CAMPAIGN_FAILURE = 'UPDATE_CAMPAIGN_FAILURE';
export const UPDATE_CAMPAIGN_CLEAR = 'UPDATE_CAMPAIGN_CLEAR';

export const fetchCampaignsBegin = () => ({
  type: FETCH_CAMPAIGNS_BEGIN
});

export const fetchCampaignsSuccess = (campaigns, totalItems) => ({
  type: FETCH_CAMPAIGNS_SUCCESS,
  payload: { campaigns, totalItems }
});

export const fetchCampaignsFailure = error => ({
  type: FETCH_CAMPAIGNS_FAILURE,
  payload: { error }
});

export function fetchCampaigns(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchCampaignsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[name_or_company_name_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/lead_campaigns.json?page=${page}${sortString}${filterString}${queryString}`, {
      })
      .then(json => {
        dispatch(fetchCampaignsSuccess(json.data.campaigns, json.data.total_entries));
        return json.data.campaigns;
      })
      .catch(error => dispatch(fetchCampaignsFailure(error)));
  };
}

export const createCampaignBegin = () => ({
  type: CREATE_CAMPAIGN_BEGIN
});

export const createCampaignSuccess = (campaign) => ({
  type: CREATE_CAMPAIGN_SUCCESS,
  payload: { campaign }
});

export const createCampaignFailure = error => ({
  type: CREATE_CAMPAIGN_FAILURE,
  payload: { error }
});

export const createCampaignClear = () => ({
  type: CREATE_CAMPAIGN_CLEAR
});

export function createCampaign(values) {
  return dispatch => {
    dispatch(createCampaignBegin());
    return axios.post(`${BASE_API_URL}/lead_campaigns.json`, 
      JSON.stringify({campaign: values}),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(createCampaignSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createCampaignFailure(error.response.data)));
  };
}

export const updateCampaignBegin = () => ({
  type: UPDATE_CAMPAIGN_BEGIN
});

export const updateCampaignSuccess = (campaign) => ({
  type: UPDATE_CAMPAIGN_SUCCESS,
  payload: { campaign }
});

export const updateCampaignFailure = error => ({
  type: UPDATE_CAMPAIGN_FAILURE,
  payload: { error }
});

export const updateCampaignClear = () => ({
  type: UPDATE_CAMPAIGN_CLEAR
});

export function updateCampaign(id, values) {
  return dispatch => {
    dispatch(updateCampaignBegin());
    return axios.put(`${BASE_API_URL}/lead_campaigns/${id}.json`, 
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updateCampaignSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateCampaignFailure(error.response.data)));
  };
}

export const fetchCampaignBegin = () => ({
  type: FETCH_CAMPAIGN_BEGIN
});

export const fetchCampaignSuccess = (campaign) => ({
  type: FETCH_CAMPAIGN_SUCCESS,
  payload: { campaign }
});

export const fetchCampaignFailure = error => ({
  type: FETCH_CAMPAIGN_FAILURE,
  payload: { error }
});

export function fetchCampaign(id) {
  return dispatch => {
    dispatch(fetchCampaignBegin());
    return axios.get(`${BASE_API_URL}/lead_campaigns/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchCampaignSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchCampaignFailure(error.response.data)));
  };
}

export const fetchCampaignClear = () => ({
  type: FETCH_CAMPAIGN_CLEAR
});