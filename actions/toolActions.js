import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_TOOLS_BEGIN   = 'FETCH_TOOLS_BEGIN';
export const FETCH_TOOLS_SUCCESS = 'FETCH_TOOLS_SUCCESS';
export const FETCH_TOOLS_FAILURE = 'FETCH_TOOLS_FAILURE';

export const fetchToolsBegin = () => ({
  type: FETCH_TOOLS_BEGIN
});

export const fetchToolsSuccess = (tools) => ({
  type: FETCH_TOOLS_SUCCESS,
  payload: { tools }
});

export const fetchToolsFailure = error => ({
  type: FETCH_TOOLS_FAILURE,
  payload: { error }
});

export function fetchTools() {
  return dispatch => {
    dispatch(fetchToolsBegin());
    return axios.get(`${BASE_API_URL}/tools.json`, {
      })
      .then(json => {
        dispatch(fetchToolsSuccess(json.data.tools));
        return json.data.tools;
      })
      .catch(error => dispatch(fetchToolsFailure(error)));
  };
}
