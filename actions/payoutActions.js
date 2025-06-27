import { buildSortString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_PAYOUTS_BEGIN   = 'FETCH_PAYOUTS_BEGIN';
export const FETCH_PAYOUTS_SUCCESS = 'FETCH_PAYOUTS_SUCCESS';
export const FETCH_PAYOUTS_FAILURE = 'FETCH_PAYOUTS_FAILURE';

export const fetchPayoutsBegin = () => ({
  type: FETCH_PAYOUTS_BEGIN
});

export const fetchPayoutsSuccess = (payouts, totalItems) => ({
  type: FETCH_PAYOUTS_SUCCESS,
  payload: { payouts, totalItems }
});

export const fetchPayoutsFailure = error => ({
  type: FETCH_PAYOUTS_FAILURE,
  payload: { error }
});

export function fetchPayouts(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchPayoutsBegin());
    let sortString = buildSortString(sorter);
    return axios.get(`${BASE_API_URL}/payouts.json?page=${page}${sortString}`, {
      })
      .then(json => {
        dispatch(fetchPayoutsSuccess(json.data.payouts, json.data.total_entries));
        return json.data.payouts;
      })
      .catch(error => dispatch(fetchPayoutsFailure(error)));
  };
}

