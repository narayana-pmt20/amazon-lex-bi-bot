import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_SAATCHI_AGENCY_BEGIN = 'FETCH_SAATCHI_AGENCY_BEGIN';
export const FETCH_SAATCHI_AGENCY_SUCCESS = 'FETCH_SAATCHI_AGENCY_SUCCESS';
export const FETCH_SAATCHI_AGENCY_FAILURE = 'FETCH_SAATCHI_AGENCY_FAILURE';
export const FETCH_SAATCHI_AGENCY_CLEAR = 'FETCH_SAATCHI_AGENCY_CLEAR';

export const UPDATE_SAATCHI_AGENCY_BEGIN = 'UPDATE_SAATCHI_AGENCY_BEGIN';
export const UPDATE_SAATCHI_AGENCY_SUCCESS = 'UPDATE_SAATCHI_AGENCY_SUCCESS';
export const UPDATE_SAATCHI_AGENCY_FAILURE = 'UPDATE_SAATCHI_AGENCY_FAILURE';
export const UPDATE_SAATCHI_AGENCY_CLEAR = 'UPDATE_SAATCHI_AGENCY_CLEAR';

export const fetchSaatchiAgencyBegin = () => ({
  type: FETCH_SAATCHI_AGENCY_BEGIN
});

export const fetchSaatchiAgencySuccess = (agency) => ({
  type: FETCH_SAATCHI_AGENCY_SUCCESS,
  payload: { agency }
});

export const fetchSaatchiAgencyFailure = error => ({
  type: FETCH_SAATCHI_AGENCY_FAILURE,
  payload: { error }
});

export const fetchSaatchiAgencyClear = () => ({
  type: FETCH_SAATCHI_AGENCY_CLEAR
});

export function fetchSaatchiAgency() {
  return dispatch => {
    dispatch(fetchSaatchiAgencyBegin());
    return axios.get(`${BASE_API_URL}/saatchi_agency.json?`, {
    })
      .then(json => {
        dispatch(fetchSaatchiAgencySuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchSaatchiAgencyFailure(error)));
  };
}

export const updateSaatchiAgencyBegin = () => ({
  type: UPDATE_SAATCHI_AGENCY_BEGIN
});

export const updateSaatchiAgencySuccess = (agency) => ({
  type: UPDATE_SAATCHI_AGENCY_SUCCESS,
  payload: { agency }
});

export const updateSaatchiAgencyFailure = error => ({
  type: UPDATE_SAATCHI_AGENCY_FAILURE,
  payload: { error }
});

export const updateSaatchiAgencyClear = () => ({
  type: UPDATE_SAATCHI_AGENCY_CLEAR
});

export function updateSaatchiAgency(data) {
  return dispatch => {
    dispatch(updateSaatchiAgencyBegin());
    return axios.put(`${BASE_API_URL}/saatchi_agency.json`,
      { saatchi_agency: data },
    )
      .then(json => {
        dispatch(updateSaatchiAgencySuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateSaatchiAgencyFailure(error.response.data)));
  };
}