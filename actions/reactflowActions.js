export const SET_CURRENT_WORKFLOW = 'SET_CURRENT_WORKFLOW';
export const TOGGLE_ADD_STEP_OPTIONS = 'TOGGLE_ADD_STEP_OPTIONS';
export const SET_SELECTED_STEP = 'SET_SELECTED_STEP';
export const RESET = 'RESET';
export const SET_ACTIVE_NODE = 'SET_ACTIVE_NODE';
export const SET_ACTIVE_EDGE = 'SET_ACTIVE_EDGE';

export const setCurrentWorkflow = (workflow) => ({
  type: SET_CURRENT_WORKFLOW,
  payload: workflow
});

export const toggleAddStepOptions = () => ({
  type: TOGGLE_ADD_STEP_OPTIONS
});

export const setSelectedStep = (step) => ({
  type: SET_SELECTED_STEP,
  payload: step
});

export const resetReactflowState = () => ({
  type: RESET,
});

export const setActiveNode = (node) => ({
  type: SET_ACTIVE_NODE,
  payload: node,
})

export const setActiveEdge = (edge) => ({
  type: SET_ACTIVE_EDGE,
  payload: edge,
})