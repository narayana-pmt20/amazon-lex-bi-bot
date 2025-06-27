import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_SNAPSHOTS_BEGIN   = 'FETCH_SNAPSHOTS_BEGIN';
export const FETCH_SNAPSHOTS_SUCCESS = 'FETCH_SNAPSHOTS_SUCCESS';
export const FETCH_SNAPSHOTS_FAILURE = 'FETCH_SNAPSHOTS_FAILURE';

export const fetchSnapshotsBegin = () => ({
  type: FETCH_SNAPSHOTS_BEGIN
});

export const fetchSnapshotsSuccess = (snapshots, totalItems, overview ) => ({
  type: FETCH_SNAPSHOTS_SUCCESS,
  payload: { snapshots, totalItems, overview }
});

export const fetchSnapshotsFailure = error => ({
  type: FETCH_SNAPSHOTS_FAILURE,
  payload: { error }
});

export function fetchSnapshots(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchSnapshotsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[name_or_company_name_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/viv_order_snapshots.json?page=${page}${sortString}${filterString}${queryString}`, {
      })
      .then(json => {
        dispatch(fetchSnapshotsSuccess(json.data.snapshots, json.data.total_entries, json.data.overview));
        return json.data.snapshots;
      })
      .catch(error => dispatch(fetchSnapshotsFailure(error)));
  };
}

