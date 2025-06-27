import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_WORKFLOW_TRIGGER_BEGIN   = 'CREATE_WORKFLOW_TRIGGER_BEGIN';
export const CREATE_WORKFLOW_TRIGGER_SUCCESS = 'CREATE_WORKFLOW_TRIGGER_SUCCESS';
export const CREATE_WORKFLOW_TRIGGER_FAILURE = 'CREATE_WORKFLOW_TRIGGER_FAILURE';
export const CREATE_WORKFLOW_TRIGGER_CLEAR   = 'UPDATE_WORKFLOW_TRIGGER_CLEAR';

export const UPDATE_WORKFLOW_TRIGGER_BEGIN   = 'UPDATE_WORKFLOW_TRIGGER_BEGIN';
export const UPDATE_WORKFLOW_TRIGGER_SUCCESS = 'UPDATE_WORKFLOW_TRIGGER_SUCCESS';
export const UPDATE_WORKFLOW_TRIGGER_FAILURE = 'UPDATE_WORKFLOW_TRIGGER_FAILURE';
export const UPDATE_WORKFLOW_TRIGGER_CLEAR   = 'UPDATE_WORKFLOW_TRIGGER_CLEAR';

export const updateWorkflowTriggerBegin = () => ({
  type: UPDATE_WORKFLOW_TRIGGER_BEGIN
});

export const updateWorkflowTriggerSuccess = (workflow) => ({
  type: UPDATE_WORKFLOW_TRIGGER_SUCCESS,
  payload: { workflow }
});

export const updateWorkflowTriggerFailure = error => ({
  type: UPDATE_WORKFLOW_TRIGGER_FAILURE,
  payload: { error }
});

export const updateWorkflowTriggerClear = () => ({
  type: UPDATE_WORKFLOW_TRIGGER_CLEAR
});

export function updateWorkflowTrigger(workflowId, triggerId, values) {
  return dispatch => {
    dispatch(updateWorkflowTriggerBegin());
    return axios.put(`${BASE_API_URL}/workflows/${workflowId}/workflow_triggers/${triggerId}.json`, 
      JSON.stringify({ workflow_trigger: values }),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updateWorkflowTriggerSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateWorkflowTriggerFailure(error.response)));
  };
}


export const createWorkflowTriggerBegin = () => ({
  type: CREATE_WORKFLOW_TRIGGER_BEGIN
});

export const createWorkflowTriggerSuccess = (workflow_trigger) => ({
  type: CREATE_WORKFLOW_TRIGGER_SUCCESS,
  payload: { workflow_trigger }
});

export const createWorkflowTriggerFailure = error => ({
  type: CREATE_WORKFLOW_TRIGGER_FAILURE,
  payload: { error }
});

export const createWorkflowTriggerClear = () => ({
  type: CREATE_WORKFLOW_TRIGGER_CLEAR
});

export function createWorkflowTrigger(workflowId, values) {
  return async (dispatch) => {
    dispatch(createWorkflowTriggerBegin());
    try {
      const response = await axios.post(`${BASE_API_URL}/workflows/${workflowId}/workflow_triggers.json`,
        JSON.stringify({ workflow_trigger: values }),
        { headers: { 'Content-Type': 'application/json' }}
      );
      dispatch(createWorkflowTriggerSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(createWorkflowTriggerFailure(error.response.data));
    }
  };
}
