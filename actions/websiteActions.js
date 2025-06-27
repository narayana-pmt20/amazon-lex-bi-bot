import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_WEBSITES_BEGIN   = 'FETCH_WEBSITES_BEGIN';
export const FETCH_WEBSITES_SUCCESS = 'FETCH_WEBSITES_SUCCESS';
export const FETCH_WEBSITES_FAILURE = 'FETCH_WEBSITES_FAILURE';

export const FETCH_WEBSITE_BEGIN   = 'FETCH_WEBSITE_BEGIN';
export const FETCH_WEBSITE_SUCCESS = 'FETCH_WEBSITE_SUCCESS';
export const FETCH_WEBSITE_FAILURE = 'FETCH_WEBSITE_FAILURE';
export const FETCH_WEBSITE_CLEAR = 'FETCH_WEBSITE_CLEAR';

export const CREATE_WEBSITE_BEGIN   = 'CREATE_WEBSITE_BEGIN';
export const CREATE_WEBSITE_SUCCESS = 'CREATE_WEBSITE_SUCCESS';
export const CREATE_WEBSITE_FAILURE = 'CREATE_WEBSITE_FAILURE';
export const CREATE_WEBSITE_CLEAR = 'CREATE_WEBSITE_CLEAR';

export const UPDATE_WEBSITE_BEGIN   = 'UPDATE_WEBSITE_BEGIN';
export const UPDATE_WEBSITE_SUCCESS = 'UPDATE_WEBSITE_SUCCESS';
export const UPDATE_WEBSITE_FAILURE = 'UPDATE_WEBSITE_FAILURE';
export const UPDATE_WEBSITE_CLEAR = 'UPDATE_WEBSITE_CLEAR';

export const SET_DOMAIN_BEGIN   = 'SET_DOMAIN_BEGIN';
export const SET_DOMAIN_SUCCESS = 'SET_DOMAIN_SUCCESS';
export const SET_DOMAIN_FAILURE = 'SET_DOMAIN_FAILURE';
export const SET_DOMAIN_CLEAR = 'SET_DOMAIN_CLEAR';

export const CREATE_SITE_MERGE_REQUEST_BEGIN   = 'CREATE_SITE_MERGE_REQUEST_BEGIN';
export const CREATE_SITE_MERGE_REQUEST_SUCCESS = 'CREATE_SITE_MERGE_REQUEST_SUCCESS';
export const CREATE_SITE_MERGE_REQUEST_FAILURE = 'CREATE_SITE_MERGE_REQUEST_FAILURE';
export const CREATE_SITE_MERGE_REQUEST_CLEAR = 'CREATE_SITE_MERGE_REQUEST_CLEAR';

export const REMOVE_DOMAIN_BEGIN   = 'REMOVE_DOMAIN_BEGIN';
export const REMOVE_DOMAIN_SUCCESS = 'REMOVE_DOMAIN_SUCCESS';
export const REMOVE_DOMAIN_FAILURE = 'REMOVE_DOMAIN_FAILURE';
export const REMOVE_DOMAIN_CLEAR = 'REMOVE_DOMAIN_CLEAR';

export const fetchWebsitesBegin = () => ({
  type: FETCH_WEBSITES_BEGIN
});

export const fetchWebsitesSuccess = (websites) => ({
  type: FETCH_WEBSITES_SUCCESS,
  payload: { websites }
});

export const fetchWebsitesFailure = error => ({
  type: FETCH_WEBSITES_FAILURE,
  payload: { error }
});

export function fetchWebsites() {
  return dispatch => {
    dispatch(fetchWebsitesBegin());
    return axios.get(`${BASE_API_URL}/websites.json`, {
      })
      .then(json => {
        dispatch(fetchWebsitesSuccess(json.data.websites));
        return json.data.websites;
      })
      .catch(error => dispatch(fetchWebsitesFailure(error)));
  };
}

export const createWebsiteBegin = () => ({
  type: CREATE_WEBSITE_BEGIN
});

export const createWebsiteSuccess = (website) => ({
  type: CREATE_WEBSITE_SUCCESS,
  payload: { website }
});

export const createWebsiteFailure = error => ({
  type: CREATE_WEBSITE_FAILURE,
  payload: { error }
});

export const createWebsiteClear = () => ({
  type: CREATE_WEBSITE_CLEAR
});

export function createWebsite(values, slug) {
  return dispatch => {
    dispatch(createWebsiteBegin());
    return axios.post(`${BASE_API_URL}/websites.json`, 
        JSON.stringify({ website: values, franchise_id: slug }),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createWebsiteSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createWebsiteFailure(error.response.data))
      });
  };
}

export const fetchWebsiteBegin = () => ({
  type: FETCH_WEBSITE_BEGIN
});

export const fetchWebsiteSuccess = (website) => ({
  type: FETCH_WEBSITE_SUCCESS,
  payload: { website }
});

export const fetchWebsiteFailure = error => ({
  type: FETCH_WEBSITE_FAILURE,
  payload: { error }
});

export function fetchWebsite(id) {
  return dispatch => {
    dispatch(fetchWebsiteBegin());
    return axios.get(`${BASE_API_URL}/websites/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchWebsiteSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchWebsiteFailure(error)));
  };
}

export const fetchWebsiteClear = () => ({
  type: FETCH_WEBSITE_CLEAR
});

export const updateWebsiteBegin = () => ({
  type: UPDATE_WEBSITE_BEGIN
});

export const updateWebsiteSuccess = (website) => ({
  type: UPDATE_WEBSITE_SUCCESS,
  payload: { website }
});

export const updateWebsiteFailure = error => ({
  type: UPDATE_WEBSITE_FAILURE,
  payload: { error }
});

export const updateWebsiteClear = () => ({
  type: UPDATE_WEBSITE_CLEAR
});

export function updateWebsite(id, values) {
  return dispatch => {
    dispatch(updateWebsiteBegin());
    return axios.put(`${BASE_API_URL}/websites/${id}.json`, 
      JSON.stringify({website: values}),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateWebsiteSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateWebsiteFailure(error.response.data)));
  };
}

export async function validateWebsite(subdomain) {
  let json = await axios.post(`${BASE_API_URL}/website_validations.json`, 
    JSON.stringify({ subdomain }),
    { headers: { 'Content-Type': 'application/json' }})
  return json.data;
}

export const setDomainBegin = () => ({
  type: SET_DOMAIN_BEGIN
});

export const setDomainSuccess = () => ({
  type: SET_DOMAIN_SUCCESS,
  payload: { }
});

export const setDomainFailure = error => ({
  type: SET_DOMAIN_FAILURE,
  payload: { error }
});

export const setDomainClear = () => ({
  type: SET_DOMAIN_CLEAR
});

export function setDomain(websiteId, domain) {
  return dispatch => {
    dispatch(setDomainBegin());
    return axios.post(`${BASE_API_URL}/websites/${websiteId}/domain.json`, 
        JSON.stringify({ custom_domain: domain }),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(setDomainSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(setDomainFailure(error.response.data))
      });
  };
}

export const removeDomainBegin = () => ({
  type: REMOVE_DOMAIN_BEGIN
});

export const removeDomainSuccess = () => ({
  type: REMOVE_DOMAIN_SUCCESS,
  payload: {  }
});

export const removeDomainFailure = error => ({
  type: REMOVE_DOMAIN_FAILURE,
  payload: { error }
});

export function removeDomain(websiteId) {
  return async (dispatch) => {
    dispatch(removeDomainBegin());
    await axios.delete(`${BASE_API_URL}/websites/${websiteId}/domain.json`, {
      })
      .then(json => {
        dispatch(removeDomainSuccess());
        return contact;
      })
      .catch(error => dispatch(removeDomainFailure(error)));
  };
}

export const removeDomainClear = () => ({
  type: REMOVE_DOMAIN_CLEAR
});

export const createSiteMergeRequestBegin = () => ({
  type: CREATE_SITE_MERGE_REQUEST_BEGIN
});

export const createSiteMergeRequestSuccess = (siteMergeRequest) => ({
  type: CREATE_SITE_MERGE_REQUEST_SUCCESS,
  payload: { siteMergeRequest }
});

export const createSiteMergeRequestFailure = error => ({
  type: CREATE_SITE_MERGE_REQUEST_FAILURE,
  payload: { error }
});

export const createSiteMergeRequestClear = () => ({
  type: CREATE_SITE_MERGE_REQUEST_CLEAR
});

export function createSiteMergeRequestPurchase(values) {
  return dispatch => {
    dispatch(createSiteMergeRequestBegin());
    return axios.post(`${BASE_API_URL}/site_merge_request_purchases.json`, 
        JSON.stringify({ site_merge_request: values }),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createSiteMergeRequestSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createSiteMergeRequestFailure(error.response.data))
      });
  };
}