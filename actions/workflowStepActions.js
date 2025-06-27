import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_WORKFLOW_STEP_BEGIN = 'CREATE_WORKFLOW_STEP_BEGIN';
export const CREATE_WORKFLOW_STEP_SUCCESS = 'CREATE_WORKFLOW_STEP_SUCCESS';
export const CREATE_WORKFLOW_STEP_FAILURE = 'CREATE_WORKFLOW_STEP_FAILURE';

export const UPDATE_WORKFLOW_STEP_BEGIN = 'UPDATE_WORKFLOW_STEP_BEGIN';
export const UPDATE_WORKFLOW_STEP_SUCCESS = 'UPDATE_WORKFLOW_STEP_SUCCESS';
export const UPDATE_WORKFLOW_STEP_FAILURE = 'UPDATE_WORKFLOW_STEP_FAILURE';

export const DELETE_WORKFLOW_STEP_BEGIN = 'DELETE_WORKFLOW_STEP_BEGIN';
export const DELETE_WORKFLOW_STEP_SUCCESS = 'DELETE_WORKFLOW_STEP_SUCCESS';
export const DELETE_WORKFLOW_STEP_FAILURE = 'DELETE_WORKFLOW_STEP_FAILURE';

export const CLEAR_WORKFLOW_STEP_ERROR = 'CLEAR_WORKFLOW_STEP_ERROR';

export const createWorkflowStepBegin = () => ({ 
  type: CREATE_WORKFLOW_STEP_BEGIN 
});

export const createWorkflowStepSuccess = (workflowStep) => ({
  type: CREATE_WORKFLOW_STEP_SUCCESS,
  payload: { workflowStep }
});
export const createWorkflowStepFailure = (error) => ({
  type: CREATE_WORKFLOW_STEP_FAILURE,
  payload: { error }
});

export const createWorkflowStep = (workflowId, stepData) => async (dispatch) => {
  dispatch(createWorkflowStepBegin());
  try {
    const response = await axios.post(
      `${BASE_API_URL}/workflows/${workflowId}/workflow_steps`,
      { workflow_step: stepData },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    dispatch(createWorkflowStepSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(createWorkflowStepFailure(error.response?.data?.error || error.message));
    throw error;
  }
};

export const updateWorkflowStepBegin = () => ({ 
  type: UPDATE_WORKFLOW_STEP_BEGIN 
});

export const updateWorkflowStepSuccess = (workflowStep) => ({
  type: UPDATE_WORKFLOW_STEP_SUCCESS,
  payload: { workflowStep }
});

export const updateWorkflowStepFailure = (error) => ({
  type: UPDATE_WORKFLOW_STEP_FAILURE,
  payload: { error }
});

export const updateWorkflowStep = (workflowId, stepId, stepData) => async (dispatch) => {
  dispatch(updateWorkflowStepBegin());
  try {
    const response = await axios.put(
      `${BASE_API_URL}/workflows/${workflowId}/workflow_steps/${stepId}`,
      { workflow_step: stepData },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    dispatch(updateWorkflowStepSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(updateWorkflowStepFailure(error.response?.data || error.message));
    throw error;
  }
};

export const deleteWorkflowStepBegin = () => ({ 
  type: DELETE_WORKFLOW_STEP_BEGIN 
});

export const deleteWorkflowStepSuccess = (stepId) => ({
  type: DELETE_WORKFLOW_STEP_SUCCESS,
  payload: { stepId }
});

export const deleteWorkflowStepFailure = (error) => ({
  type: DELETE_WORKFLOW_STEP_FAILURE,
  payload: { error }
});

export const deleteWorkflowStep = (workflowId, stepId) => async (dispatch) => {
  dispatch(deleteWorkflowStepBegin());
  try {
    await axios.delete(
      `${BASE_API_URL}/workflows/${workflowId}/workflow_steps/${stepId}`,
      { headers: { 'Accept': 'application/json' } }
    );
    dispatch(deleteWorkflowStepSuccess(stepId));
  } catch (error) {
    dispatch(deleteWorkflowStepFailure(error.response?.data || error.message));
    throw error;
  }
};


export const clearWorkflowStepError = () => ({
  type: CLEAR_WORKFLOW_STEP_ERROR
});