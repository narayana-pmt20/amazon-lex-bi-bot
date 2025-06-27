import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_PROGRAMS_BEGIN   = 'FETCH_PROGRAMS_BEGIN';
export const FETCH_PROGRAMS_SUCCESS = 'FETCH_PROGRAMS_SUCCESS';
export const FETCH_PROGRAMS_FAILURE = 'FETCH_PROGRAMS_FAILURE';

export const ACTIVATE_PROGRAM_BEGIN   = 'ACTIVATE_PROGRAM_BEGIN';
export const ACTIVATE_PROGRAM_SUCCESS = 'ACTIVATE_PROGRAM_SUCCESS';
export const ACTIVATE_PROGRAM_FAILURE = 'ACTIVATE_PROGRAM_FAILURE';
export const ACTIVATE_PROGRAM_CLEAR = 'ACTIVATE_PROGRAM_CLEAR';

export const fetchProgramsBegin = () => ({
  type: FETCH_PROGRAMS_BEGIN
});

export const fetchProgramsSuccess = (programs) => ({
  type: FETCH_PROGRAMS_SUCCESS,
  payload: { programs }
});

export const fetchProgramsFailure = error => ({
  type: FETCH_PROGRAMS_FAILURE,
  payload: { error }
});

export function fetchPrograms() {
  return dispatch => {
    dispatch(fetchProgramsBegin());
    return axios.get(`${BASE_API_URL}/programs.json`, {
      })
      .then(json => {
        dispatch(fetchProgramsSuccess(json.data.programs));
        return json.data.programs;
      })
      .catch(error => dispatch(fetchProgramsFailure(error)));
  };
}

export const activateProgramBegin = () => ({
  type: ACTIVATE_PROGRAM_BEGIN
});

export const activateProgramSuccess = () => ({
  type: ACTIVATE_PROGRAM_SUCCESS,
});

export const activateProgramFailure = error => ({
  type: ACTIVATE_PROGRAM_FAILURE,
  payload: { error }
});

export const activateProgramClear = () => ({
  type: ACTIVATE_PROGRAM_CLEAR
});

export function activateProgram(slug, values) {
  return dispatch => {
    dispatch(activateProgramBegin());
    return axios.post(`${BASE_API_URL}/programs/${slug}/activation.json`, 
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(activateProgramSuccess());
        return json.data;
      })
      .catch(error => dispatch(activateProgramFailure(error.response.data)));
  };
}

