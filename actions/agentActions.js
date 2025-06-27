import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_AGENTS_BEGIN   = 'FETCH_AGENTS_BEGIN';
export const FETCH_AGENTS_SUCCESS = 'FETCH_AGENTS_SUCCESS';
export const FETCH_AGENTS_FAILURE = 'FETCH_AGENTS_FAILURE';

export const FETCH_AGENT_BEGIN   = 'FETCH_AGENT_BEGIN';
export const FETCH_AGENT_SUCCESS = 'FETCH_AGENT_SUCCESS';
export const FETCH_AGENT_FAILURE = 'FETCH_AGENT_FAILURE';

export const CREATE_AGENT_BEGIN   = 'CREATE_AGENT_BEGIN';
export const CREATE_AGENT_SUCCESS = 'CREATE_AGENT_SUCCESS';
export const CREATE_AGENT_FAILURE = 'CREATE_AGENT_FAILURE';
export const CREATE_AGENT_CLEAR = 'CREATE_AGENT_CLEAR';

export const UPDATE_AGENT_BEGIN   = 'UPDATE_AGENT_BEGIN';
export const UPDATE_AGENT_SUCCESS = 'UPDATE_AGENT_SUCCESS';
export const UPDATE_AGENT_FAILURE = 'UPDATE_AGENT_FAILURE';
export const UPDATE_AGENT_CLEAR = 'UPDATE_AGENT_CLEAR';

export const DELETE_AGENT_BEGIN   = 'DELETE_AGENT_BEGIN';
export const DELETE_AGENT_SUCCESS = 'DELETE_AGENT_SUCCESS';
export const DELETE_AGENT_FAILURE = 'DELETE_AGENT_FAILURE';

export const fetchAgentsBegin = () => ({
  type: FETCH_AGENTS_BEGIN
});

export const fetchAgentsSuccess = (agents, agent_subscriptions, available_credits, total_credits, totalItems) => ({
  type: FETCH_AGENTS_SUCCESS,
  payload: { agents, agent_subscriptions, available_credits, total_credits, totalItems }
});

export const fetchAgentsFailure = error => ({
  type: FETCH_AGENTS_FAILURE,
  payload: { error }
});

export function fetchAgents(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchAgentsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[name_or_email_or_phonenumber_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/agents.json?page=${page}${sortString}${filterString}${queryString}`, {
      })
      .then(json => {
        dispatch(fetchAgentsSuccess(json.data.agents, json.data.agent_subscriptions, json.data.available_credits, json.data.total_credits, json.data.total_entries));
        return json.data.agents;
      })
      .catch(error => dispatch(fetchAgentsFailure(error)));
  };
}

export const createAgentBegin = () => ({
  type: CREATE_AGENT_BEGIN
});

export const createAgentSuccess = (agent) => ({
  type: CREATE_AGENT_SUCCESS,
  payload: { agent }
});

export const createAgentFailure = error => ({
  type: CREATE_AGENT_FAILURE,
  payload: { error }
});

export const createAgentClear = () => ({
  type: CREATE_AGENT_CLEAR
});

export function createAgent(values) {
  return dispatch => {
    dispatch(createAgentBegin());
    let agent = createAgentFromValues(values);
    return axios.post(`${BASE_API_URL}/agents.json`, 
      JSON.stringify({agent: agent}),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(createAgentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createAgentFailure(error.response.data)));
  };
}

export const updateAgentBegin = () => ({
  type: UPDATE_AGENT_BEGIN
});

export const updateAgentSuccess = (agent) => ({
  type: UPDATE_AGENT_SUCCESS,
  payload: { agent }
});

export const updateAgentFailure = error => ({
  type: UPDATE_AGENT_FAILURE,
  payload: { error }
});

export const updateAgentClear = () => ({
  type: UPDATE_AGENT_CLEAR
});

export function updateAgent(id, values, programs = false) {
  return dispatch => {
    dispatch(updateAgentBegin());
    const params = programs ? values : {agent: createAgentFromValues(values)};
    return axios.put(`${BASE_API_URL}/agents/${id}.json`, 
      JSON.stringify(params),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updateAgentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateAgentFailure(error.response.data)));
  };
}

export const fetchAgentBegin = () => ({
  type: FETCH_AGENT_BEGIN
});

export const fetchAgentSuccess = (agent) => ({
  type: FETCH_AGENT_SUCCESS,
  payload: { agent }
});

export const fetchAgentFailure = error => ({
  type: FETCH_AGENT_FAILURE,
  payload: { error }
});

export function fetchAgent(id) {
  return dispatch => {
    dispatch(fetchAgentBegin());
    return axios.get(`${BASE_API_URL}/agents/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchAgentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchAgentFailure(error.response.data)));
  };
}

export const deleteAgentBegin = () => ({
  type: DELETE_AGENT_BEGIN
});

export const deleteAgentSuccess = (agent) => ({
  type: DELETE_AGENT_SUCCESS,
  payload: { agent }
});

export const deleteAgentFailure = error => ({
  type: DELETE_AGENT_FAILURE,
  payload: { error }
});

export function deleteAgent(agent) {
  return async (dispatch) => {
    dispatch(deleteAgentBegin());
    await axios.delete(`${BASE_API_URL}/agents/${agent.id}.json`, {
      })
      .then(json => {
        dispatch(deleteAgentSuccess(agent));
        return agent;
      })
      .catch(error => dispatch(deleteAgentFailure(error)));
    dispatch(fetchAgents());
  };
}

function createAgentFromValues(values) {
  let result = _.pick(values, ['first_name', 'last_name', 'email', 'phone', 'state', 'notes', 'password', 'password_confirmation']);
  let address = _.pick(values, ['address1', 'address2', 'city', 'region', 'postal_code', 'country']);
  if (_.isEmpty(address) == false) {
    result.address_attributes = address;
    if (values.address_id !== undefined) {
      result.address_attributes.id = values.address_id
    }
  }
  return result;
}