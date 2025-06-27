import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_DOMAINS_BEGIN = 'FETCH_DOMAINS_BEGIN';
export const FETCH_DOMAINS_SUCCESS = 'FETCH_DOMAINS_SUCCESS';
export const FETCH_DOMAINS_FAILURE = 'FETCH_DOMAINS_FAILURE';
export const FETCH_DOMAINS_CLEAR = 'FETCH_DOMAINS_CLEAR';

export const FETCH_DOMAIN_BEGIN = 'FETCH_DOMAIN_BEGIN';
export const FETCH_DOMAIN_SUCCESS = 'FETCH_DOMAIN_SUCCESS';
export const FETCH_DOMAIN_FAILURE = 'FETCH_DOMAIN_FAILURE';
export const FETCH_DOMAIN_CLEAR = 'FETCH_DOMAIN_CLEAR';

export const CREATE_DOMAIN_BEGIN = 'CREATE_DOMAIN_BEGIN';
export const CREATE_DOMAIN_SUCCESS = 'CREATE_DOMAIN_SUCCESS';
export const CREATE_DOMAIN_FAILURE = 'CREATE_DOMAIN_FAILURE';
export const CREATE_DOMAIN_CLEAR = 'CREATE_DOMAIN_CLEAR';

export const DELETE_DOMAIN_BEGIN = 'DELETE_DOMAIN_BEGIN';
export const DELETE_DOMAIN_SUCCESS = 'DELETE_DOMAIN_SUCCESS';
export const DELETE_DOMAIN_FAILURE = 'DELETE_DOMAIN_FAILURE';
export const DELETE_DOMAIN_CLEAR = 'DELETE_DOMAIN_CLEAR';


export const UPDATE_DOMAIN_BEGIN = 'UPDATE_DOMAIN_BEGIN';
export const UPDATE_DOMAIN_SUCCESS = 'UPDATE_DOMAIN_SUCCESS';
export const UPDATE_DOMAIN_FAILURE = 'UPDATE_DOMAIN_FAILURE';

// Fetch domains action
export const fetchDomainsBegin = () => ({
  type: FETCH_DOMAINS_BEGIN
});

export const fetchDomainsSuccess = (domains) => ({
  type: FETCH_DOMAINS_SUCCESS,
  payload: { domains }
});

export const fetchDomainsFailure = error => ({
  type: FETCH_DOMAINS_FAILURE,
  payload: { error }
});

export const fetchDomainsClear = () => ({
  type: FETCH_DOMAINS_CLEAR
});

export const fetchDomainBegin = () => ({
  type: FETCH_DOMAIN_BEGIN
});

export const fetchDomainSuccess = (domain) => ({
  type: FETCH_DOMAIN_SUCCESS,
  payload: { domain }
});

export const fetchDomainFailure = error => ({
  type: FETCH_DOMAIN_FAILURE,
  payload: { error }
});

export const fetchDomainClear = () => ({
  type: FETCH_DOMAIN_CLEAR
});

export function fetchDomains() {
  return dispatch => {
    dispatch(fetchDomainsBegin());
    return axios.get(`${BASE_API_URL}/domains.json`)
      .then(json => {
        dispatch(fetchDomainsSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(fetchDomainsFailure(error));
      });
  };
}

export function fetchDomain(id, params = {}) {
  return dispatch => {
    dispatch(fetchDomainBegin());
    return axios.get(`${BASE_API_URL}/domains/${id}.json`, {
      params
    })
      .then(json => {
        dispatch(fetchDomainSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(fetchDomainFailure(error));
      });
  };
}

export const createDomainBegin = () => ({
  type: CREATE_DOMAIN_BEGIN
});

export const createDomainSuccess = (domain) => ({
  type: CREATE_DOMAIN_SUCCESS,
  payload: { domain }
});

export const createDomainFailure = error => ({
  type: CREATE_DOMAIN_FAILURE,
  payload: { error }
});

export const createDomainClear = () => ({
  type: CREATE_DOMAIN_CLEAR
});

export function createDomain(DomainData) {
  return dispatch => {
    dispatch(createDomainBegin());
    return axios.post(`${BASE_API_URL}/domains.json`, DomainData, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(json => {
        dispatch(createDomainSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createDomainFailure(error.response.data));
      });
  };
}

// Delete domain action
export const deleteDomainBegin = () => ({
  type: DELETE_DOMAIN_BEGIN
});

export const deleteDomainSuccess = (domain_id) => ({
  type: DELETE_DOMAIN_SUCCESS,
  payload: { domain_id }
});

export const deleteDomainFailure = error => ({
  type: DELETE_DOMAIN_FAILURE,
  payload: { error }
});

export const deleteDomainClear = () => ({
  type: DELETE_DOMAIN_CLEAR
});

export function deleteDomain(DomainId) {
  return dispatch => {
    dispatch(deleteDomainBegin());
    return axios.delete(`${BASE_API_URL}/domains/${DomainId}.json`)
      .then(() => {
        dispatch(deleteDomainSuccess(DomainId));
      })
      .catch(error => {
        dispatch(deleteDomainFailure(error.response.data));
      });
  };
}


export const updateDomainBegin = () => ({
  type: UPDATE_DOMAIN_BEGIN
});

export const updateDomainSuccess = (domain) => ({
  type: UPDATE_DOMAIN_SUCCESS,
  payload: { domain }
});

export const updateDomainFailure = error => ({
  type: UPDATE_DOMAIN_FAILURE,
  payload: { error }
});

export function updateDomain(domainId, updates) {
  return dispatch => {
    dispatch(updateDomainBegin());
    return axios.put(`${BASE_API_URL}/domains/${domainId}`, {domain: updates})
      .then(response => {
        dispatch(updateDomainSuccess(response.data));
        return response.data;
      })
      .catch(error => {
        dispatch(updateDomainFailure(error));
      });
  };
}

