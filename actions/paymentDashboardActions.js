import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_PAYMENT_DASHBOARD_BEGIN   = 'FETCH_PAYMENT_DASHBOARD_BEGIN';
export const FETCH_PAYMENT_DASHBOARD_SUCCESS = 'FETCH_PAYMENT_DASHBOARD_SUCCESS';
export const FETCH_PAYMENT_DASHBOARD_FAILURE = 'FETCH_PAYMENT_DASHBOARD_FAILURE';

export const fetchPaymentDashboardBegin = () => ({
  type: FETCH_PAYMENT_DASHBOARD_BEGIN
});

export const fetchPaymentDashboardSuccess = (paymentDashboard) => ({
  type: FETCH_PAYMENT_DASHBOARD_SUCCESS,
  payload: { paymentDashboard }
});

export const fetchPaymentDashboardFailure = error => ({
  type: FETCH_PAYMENT_DASHBOARD_FAILURE,
  payload: { error }
});

export function fetchPaymentDashboard(start_date, end_date) {
  return dispatch => {
    dispatch(fetchPaymentDashboardBegin());
    let dateRange = `start_date=${start_date}&end_date=${end_date}`
    return axios.get(`${BASE_API_URL}/payment_dashboards.json?${dateRange}`, {
      })
      .then(json => {
        dispatch(fetchPaymentDashboardSuccess(json.data));
      })
      .catch(error => dispatch(fetchPaymentDashboardFailure(error)));
  };
}

