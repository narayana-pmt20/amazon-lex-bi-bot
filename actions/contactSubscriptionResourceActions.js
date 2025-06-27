import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const UPDATE_RESOURCE_BEGIN   = 'UPDATE_RESOURCE_BEGIN';
export const UPDATE_RESOURCE_SUCCESS = 'UPDATE_RESOURCE_SUCCESS';
export const UPDATE_RESOURCE_FAILURE = 'UPDATE_RESOURCE_FAILURE';
export const UPDATE_RESOURCE_CLEAR = 'UPDATE_RESOURCE_CLEAR';
export const UPDATE_RESOURCE_KEYWORDS_BEGIN   = 'UPDATE_RESOURCE_KEYWORDS_BEGIN';
export const UPDATE_RESOURCE_KEYWORDS_SUCCESS = 'UPDATE_RESOURCE_KEYWORDS_SUCCESS';
export const UPDATE_RESOURCE_KEYWORDS_FAILURE = 'UPDATE_RESOURCE_KEYWORDS_FAILURE';
export const UPDATE_RESOURCE_KEYWORDS_CLEAR = 'UPDATE_RESOURCE_KEYWORDS_CLEAR';


export const updateResourceBegin = () => ({
  type: UPDATE_RESOURCE_BEGIN
});

export const updateResourceSuccess = (resource) => ({
  type: UPDATE_RESOURCE_SUCCESS,
  payload: { resource }
});

export const updateResourceFailure = error => ({
  type: UPDATE_RESOURCE_FAILURE,
  payload: { error }
});

export const updateResourceClear = () => ({
  type: UPDATE_RESOURCE_CLEAR
});

export const updateResourceKeywordsBegin = () => ({
  type: UPDATE_RESOURCE_KEYWORDS_BEGIN
});

export const updateResourceKeywordsSuccess = (resource) => ({
  type: UPDATE_RESOURCE_KEYWORDS_SUCCESS,
  payload: { resource }
});

export const updateResourceKeywordsFailure = error => ({
  type: UPDATE_RESOURCE_KEYWORDS_FAILURE,
  payload: { error }
});

export const updateResourceKeywordsClear = () => ({
  type: UPDATE_RESOURCE_KEYWORDS_CLEAR
});

export function updateResource(subscriptionId, values) {
  return dispatch => {
    dispatch(updateResourceBegin());
    return axios.put(`${BASE_API_URL}/contact_subscriptions/${subscriptionId}/resource.json`, 
      JSON.stringify({resource: createResourceFromValues(values)}),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateResourceSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateResourceFailure(error.response.data)));
  };
}

export function updateResourceKeywords(subscriptionId, values) {
  return dispatch => {
    dispatch(updateResourceKeywordsBegin());
    return axios.put(`${BASE_API_URL}/contact_subscriptions/${subscriptionId}/resource.json`, 
      JSON.stringify({resource: createResourceFromValues(values)}),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateResourceKeywordsSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateResourceKeywordsFailure(error.response.data)));
  };
}

function createResourceFromValues(values) {
  return values;
}
