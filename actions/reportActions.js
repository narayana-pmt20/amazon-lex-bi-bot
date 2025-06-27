import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_REPORTS_BEGIN   = 'FETCH_REPORTS_BEGIN';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_FAILURE = 'FETCH_REPORTS_FAILURE';

export const FETCH_REPORT_BEGIN   = 'FETCH_REPORT_BEGIN';
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS';
export const FETCH_REPORT_FAILURE = 'FETCH_REPORT_FAILURE';

export const CREATE_REPORT_BEGIN   = 'CREATE_REPORT_BEGIN';
export const CREATE_REPORT_SUCCESS = 'CREATE_REPORT_SUCCESS';
export const CREATE_REPORT_FAILURE = 'CREATE_REPORT_FAILURE';
export const CREATE_REPORT_CLEAR = 'CREATE_REPORT_CLEAR';

export const UPDATE_REPORT_BEGIN   = 'UPDATE_REPORT_BEGIN';
export const UPDATE_REPORT_SUCCESS = 'UPDATE_REPORT_SUCCESS';
export const UPDATE_REPORT_FAILURE = 'UPDATE_REPORT_FAILURE';
export const UPDATE_REPORT_CLEAR = 'UPDATE_REPORT_CLEAR';

export const fetchReportsBegin = () => ({
  type: FETCH_REPORTS_BEGIN
});

export const fetchReportsSuccess = (reports, totalItems, availableCredits) => ({
  type: FETCH_REPORTS_SUCCESS,
  payload: { reports, totalItems, availableCredits }
});

export const fetchReportsFailure = error => ({
  type: FETCH_REPORTS_FAILURE,
  payload: { error }
});

export function fetchReports(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchReportsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[contact_first_name_or_external_url_or_business_name_or_business_phone_number_or_website_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/snapshot_reports.json?page=${page}${sortString}${filterString}${queryString}`, {
      })
      .then(json => {
        dispatch(fetchReportsSuccess(json.data.reports, json.data.total_entries, json.data.available_credits));
        return json.data.reports;
      })
      .catch(error => dispatch(fetchReportsFailure(error)));
  };
}

export const createReportBegin = () => ({
  type: CREATE_REPORT_BEGIN
});

export const createReportSuccess = (report) => ({
  type: CREATE_REPORT_SUCCESS,
  payload: { report }
});

export const createReportFailure = error => ({
  type: CREATE_REPORT_FAILURE,
  payload: { error }
});

export const createReportClear = () => ({
  type: CREATE_REPORT_CLEAR
});

export function createReport(values) {
  return dispatch => {
    dispatch(createReportBegin());
    let report = createReportFromValues(values);
    return axios.post(`${BASE_API_URL}/snapshot_reports.json`, 
      JSON.stringify({snapshot_report: report}),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(createReportSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createReportFailure(error.response.data)));
  };
}

export const fetchReportBegin = () => ({
  type: FETCH_REPORT_BEGIN
});

export const fetchReportSuccess = (report) => ({
  type: FETCH_REPORT_SUCCESS,
  payload: { report }
});

export const fetchReportFailure = error => ({
  type: FETCH_REPORT_FAILURE,
  payload: { error }
});

export function fetchReport(id) {
  return dispatch => {
    dispatch(fetchReportBegin());
    return axios.get(`${BASE_API_URL}/snapshot_reports/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchReportSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchReportFailure(error.response.data)));
  };
}

export const updateReportBegin = () => ({
  type: UPDATE_REPORT_BEGIN
});

export const updateReportSuccess = (report) => ({
  type: UPDATE_REPORT_SUCCESS,
  payload: { report }
});

export const updateReportFailure = error => ({
  type: UPDATE_REPORT_FAILURE,
  payload: { error }
});

export const updateReportClear = () => ({
  type: UPDATE_REPORT_CLEAR
});

export function updateReport(id, values) {
  return dispatch => {
    dispatch(updateReportBegin());
    let report = createReportFromValues(values);
    return axios.put(`${BASE_API_URL}/snapshot_reports/${id}.json`, 
      JSON.stringify({snapshot_report: report}),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updateReportSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateReportFailure(error.response.data)));
  };
}

function createReportFromValues(values) {
  let result = _.pick(values, ['contact_id', 'external_url', 'business_name', 'business_phone_number', 'website', 'keywords']);
  let address = _.pick(values, ['id','address1', 'address2', 'city', 'region', 'postal_code', 'country']);
  if (_.isEmpty(address) == false) {
    result.address_attributes = address;
    if (values.address_id !== undefined) {
      result.address_attributes.id = values.address_id
    }
  }
  return result;
}