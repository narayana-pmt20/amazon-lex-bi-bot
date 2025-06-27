import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_WORKFLOW_BEGIN   = 'FETCH_WORKFLOW_BEGIN';
export const FETCH_WORKFLOW_SUCCESS = 'FETCH_WORKFLOW_SUCCESS';
export const FETCH_WORKFLOW_FAILURE = 'FETCH_WORKFLOW_FAILURE';

export const FETCH_WORKFLOWS_BEGIN   = 'FETCH_WORKFLOWS_BEGIN';
export const FETCH_WORKFLOWS_SUCCESS = 'FETCH_WORKFLOWS_SUCCESS';
export const FETCH_WORKFLOWS_FAILURE = 'FETCH_WORKFLOWS_FAILURE';

export const CREATE_WORKFLOW_BEGIN   = 'CREATE_WORKFLOW_BEGIN';
export const CREATE_WORKFLOW_SUCCESS = 'CREATE_WORKFLOW_SUCCESS';
export const CREATE_WORKFLOW_FAILURE = 'CREATE_WORKFLOW_FAILURE';
export const CREATE_WORKFLOW_CLEAR   = 'CREATE_WORKFLOW_CLEAR';

export const UPDATE_WORKFLOW_BEGIN   = 'UPDATE_WORKFLOW_BEGIN';
export const UPDATE_WORKFLOW_SUCCESS = 'UPDATE_WORKFLOW_SUCCESS';
export const UPDATE_WORKFLOW_FAILURE = 'UPDATE_WORKFLOW_FAILURE';
export const UPDATE_WORKFLOW_CLEAR   = 'UPDATE_WORKFLOW_CLEAR';

export const DELETE_WORKFLOW_BEGIN   = 'DELETE_WORKFLOW_BEGIN';
export const DELETE_WORKFLOW_SUCCESS = 'DELETE_WORKFLOW_SUCCESS';
export const DELETE_WORKFLOW_FAILURE = 'DELETE_WORKFLOW_FAILURE';

export const fetchWorkflowBegin = () => ({
  type: FETCH_WORKFLOW_BEGIN
});

export const fetchWorkflowSuccess = (workflow) => ({
  type: FETCH_WORKFLOW_SUCCESS,
  payload: { workflow }
});

export const fetchWorkflowFailure = error => ({
  type: FETCH_WORKFLOW_FAILURE,
  payload: { error }
});

export function fetchWorkflow(id) {
  return dispatch => {
    dispatch(fetchWorkflowBegin());
    return axios.get(`${BASE_API_URL}/workflows/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchWorkflowSuccess(json.data));
        return json.data
      })
      .catch(error => dispatch(fetchWorkflowFailure(error)));
  };
}

export const fetchWorkflowsBegin = () => ({
  type: FETCH_WORKFLOWS_BEGIN
});

export const fetchWorkflowsSuccess = (workflows, totalItems) => ({
  type: FETCH_WORKFLOWS_SUCCESS,
  payload: { workflows, totalItems }
});

export const fetchWorkflowsFailure = error => ({
  type: FETCH_WORKFLOWS_FAILURE,
  payload: { error }
});

export function fetchWorkflows(page = 1, pageSize = 10, query, state = null) {
  return dispatch => {
    dispatch(fetchWorkflowsBegin());
    let queryString = `?page=${page}&per_page=${pageSize}`;
    
    if (query) {
      queryString += `&q[name_or_description_or_creator_first_name_or_creator_last_name_cont]=${query}`;
    }
    
    if (state) {
      queryString += `&q[state_eq]=${state}`;
    }

    return axios.get(`${BASE_API_URL}/workflows.json${queryString}`)
      .then(json => {
        dispatch(fetchWorkflowsSuccess(json.data.workflows, json.data.total_entries));
      })
      .catch(error => dispatch(fetchWorkflowsFailure(error)));
  };
}

export const createWorkflowBegin = () => ({
  type: CREATE_WORKFLOW_BEGIN
});

export const createWorkflowSuccess = (workflow) => ({
  type: CREATE_WORKFLOW_SUCCESS,
  payload: { workflow }
});

export const createWorkflowFailure = error => ({
  type: CREATE_WORKFLOW_FAILURE,
  payload: { error }
});

export const createWorkflowClear = () => ({
  type: CREATE_WORKFLOW_CLEAR
});

export function createWorkflow(values) {
  return dispatch => {
    dispatch(createWorkflowBegin());
    return axios.post(`${BASE_API_URL}/workflows.json`, 
        JSON.stringify({workflow: values}),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createWorkflowSuccess(json.data));
      })
      .catch(error => {
        dispatch(createWorkflowFailure(error.response.data))
      });
  };
}


export const updateWorkflowBegin = () => ({
  type: UPDATE_WORKFLOW_BEGIN
});

export const updateWorkflowSuccess = (workflow) => ({
  type: UPDATE_WORKFLOW_SUCCESS,
  payload: { workflow }
});

export const updateWorkflowFailure = error => ({
  type: UPDATE_WORKFLOW_FAILURE,
  payload: { error }
});

export const updateWorkflowClear = () => ({
  type: UPDATE_WORKFLOW_CLEAR
});

export function updateWorkflow(id, values) {
  return dispatch => {
    dispatch(updateWorkflowBegin());
    return axios.put(`${BASE_API_URL}/workflows/${id}.json`, 
      JSON.stringify({ workflow: values }),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updateWorkflowSuccess(json.data));
      })
      .catch(error => dispatch(updateWorkflowFailure(error.response)));
  };
}

export const deleteWorkflowBegin = () => ({
  type: DELETE_WORKFLOW_BEGIN
});

export const deleteWorkflowSuccess = (workflowId) => ({
  type: DELETE_WORKFLOW_SUCCESS,
  payload: { workflowId }
});

export const deleteWorkflowFailure = error => ({
  type: DELETE_WORKFLOW_FAILURE,
  payload: { error }
});

export function deleteWorkflow(workflowId) {
  return dispatch => {
    dispatch(deleteWorkflowBegin());
    return axios.delete(`${BASE_API_URL}/workflows/${workflowId}.json`)
      .then(() => {
        dispatch(deleteWorkflowSuccess(workflowId));
      })
      .catch(error => {
        dispatch(deleteWorkflowFailure(error.response?.data || error.message));
        throw error;
      });
  };
}