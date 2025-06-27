import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_DASHBOARD_BEGIN   = 'FETCH_DASHBOARD_BEGIN';
export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
export const FETCH_DASHBOARD_FAILURE = 'FETCH_DASHBOARD_FAILURE';

export const fetchDashboardBegin = () => ({
  type: FETCH_DASHBOARD_BEGIN
});

export const fetchDashboardSuccess = (dashboard) => ({
  type: FETCH_DASHBOARD_SUCCESS,
  payload: { dashboard }
});

export const fetchDashboardFailure = error => ({
  type: FETCH_DASHBOARD_FAILURE,
  payload: { error }
});

export function fetchDashboard() {
  return dispatch => {
    dispatch(fetchDashboardBegin());
    return axios.get(`${BASE_API_URL}/dashboard.json`, {
      })
      .then(json => {
        dispatch(fetchDashboardSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchDashboardFailure(error)));
  };
}

