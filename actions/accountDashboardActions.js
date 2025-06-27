import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_ACCOUNT_DASHBOARD_BEGIN   = 'FETCH_ACCOUNT_DASHBOARD_BEGIN';
export const FETCH_ACCOUNT_DASHBOARD_SUCCESS = 'FETCH_ACCOUNT_DASHBOARD_SUCCESS';
export const FETCH_ACCOUNT_DASHBOARD_FAILURE = 'FETCH_ACCOUNT_DASHBOARD_FAILURE';

export const fetchAccountDashboardBegin = () => ({
  type: FETCH_ACCOUNT_DASHBOARD_BEGIN
});

export const fetchAccountDashboardSuccess = (accountDashboard) => ({
  type: FETCH_ACCOUNT_DASHBOARD_SUCCESS,
  payload: { accountDashboard }
});

export const fetchAccountDashboardFailure = error => ({
  type: FETCH_ACCOUNT_DASHBOARD_FAILURE,
  payload: { error }
});

export function fetchAccountDashboard() {
  return dispatch => {
    dispatch(fetchAccountDashboardBegin());
    return axios.get(`${BASE_API_URL}/account_dashboards.json`, {
      })
      .then(json => {
        dispatch(fetchAccountDashboardSuccess(json.data));
      })
      .catch(error => dispatch(fetchAccountDashboardFailure(error)));
  };
}

