import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_TERMS_BEGIN   = 'FETCH_TERMS_BEGIN';
export const FETCH_TERMS_SUCCESS = 'FETCH_TERMS_SUCCESS';
export const FETCH_TERMS_FAILURE = 'FETCH_TERMS_FAILURE';

export const CREATE_TERM_BEGIN   = 'CREATE_TERM_BEGIN';
export const CREATE_TERM_SUCCESS = 'CREATE_TERM_SUCCESS';
export const CREATE_TERM_FAILURE = 'CREATE_TERM_FAILURE';
export const CREATE_TERM_CLEAR = 'CREATE_TERM_CLEAR';

export const fetchTermsBegin = () => ({
  type: FETCH_TERMS_BEGIN
});

export const fetchTermsSuccess = (programs) => ({
  type: FETCH_TERMS_SUCCESS,
  payload: { programs }
});

export const fetchTermsFailure = error => ({
  type: FETCH_TERMS_FAILURE,
  payload: { error }
});

export function fetchTerms() {
  return dispatch => {
    dispatch(fetchTermsBegin());
    return axios.get(`${BASE_API_URL}/terms_acceptances.json`, {
      })
      .then(json => {
        dispatch(fetchTermsSuccess(json.data.programs));
        return json.data.programs;
      })
      .catch(error => dispatch(fetchTermsFailure(error)));
  };
}

export const createTermBegin = () => ({
  type: CREATE_TERM_BEGIN
});

export const createTermSuccess = () => ({
  type: CREATE_TERM_SUCCESS,
});

export const createTermFailure = error => ({
  type: CREATE_TERM_FAILURE,
  payload: { error }
});

export const createTermClear = () => ({
  type: CREATE_TERM_CLEAR
});

export function createTerm(program) {
  return dispatch => {
    dispatch(createTermBegin());
    return axios.post(`${BASE_API_URL}/terms_acceptances.json`, 
      JSON.stringify({ franchise_id: program.id}),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(createTermSuccess());
        return json.data;
      })
      .catch(error => dispatch(createTermFailure(error.response.data)));
  };
}

