import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_INVOICE_CONFIGURATION_BEGIN = 'FETCH_INVOICE_CONFIGURATION_BEGIN';
export const FETCH_INVOICE_CONFIGURATION_SUCCESS = 'FETCH_INVOICE_CONFIGURATION_SUCCESS';
export const FETCH_INVOICE_CONFIGURATION_FAILURE = 'FETCH_INVOICE_CONFIGURATION_FAILURE';

export const UPDATE_INVOICE_CONFIGURATION_BEGIN = 'UPDATE_INVOICE_CONFIGURATION_BEGIN';
export const UPDATE_INVOICE_CONFIGURATION_SUCCESS = 'UPDATE_INVOICE_CONFIGURATION_SUCCESS';
export const UPDATE_INVOICE_CONFIGURATION_FAILURE = 'UPDATE_INVOICE_CONFIGURATION_FAILURE';
export const UPDATE_INVOICE_CONFIGURATION_CLEAR = 'UPDATE_INVOICE_CONFIGURATION_CLEAR';

export const fetchInvoiceConfigurationBegin = () => ({
  type: FETCH_INVOICE_CONFIGURATION_BEGIN
});

export const fetchInvoiceConfigurationSuccess = (invoice_configuration) => ({
  type: FETCH_INVOICE_CONFIGURATION_SUCCESS,
  payload: { invoice_configuration }
});

export const fetchInvoiceConfigurationFailure = error => ({
  type: FETCH_INVOICE_CONFIGURATION_FAILURE,
  payload: { error }
});

export function fetchInvoiceConfiguration() {
  return dispatch => {
    dispatch(fetchInvoiceConfigurationBegin());
    return axios.get(`${BASE_API_URL}/invoice_configuration.json`, {
    })
      .then(json => {
        dispatch(fetchInvoiceConfigurationSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchInvoiceConfigurationFailure(error)));
  };
}


export const updateInvoiceConfigurationBegin = () => ({
  type: UPDATE_INVOICE_CONFIGURATION_BEGIN
});

export const updateInvoiceConfigurationSuccess = (invoice_configuration) => ({
  type: UPDATE_INVOICE_CONFIGURATION_SUCCESS,
  payload: { invoice_configuration }
});

export const updateInvoiceConfigurationFailure = error => ({
  type: UPDATE_INVOICE_CONFIGURATION_FAILURE,
  payload: { error }
});

export const updateInvoiceConfigurationClear = () => ({
  type: UPDATE_INVOICE_CONFIGURATION_CLEAR
});

export function updateInvoiceConfiguration(values) {
  return dispatch => {
    dispatch(updateInvoiceConfigurationBegin());
    return axios.put(`${BASE_API_URL}/invoice_configuration.json`, 
      JSON.stringify({invoice_configuration: createInvoiceConfigurationFromValues(values)}),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updateInvoiceConfigurationSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateInvoiceConfigurationFailure(error.response.data)));
  };
}

function createInvoiceConfigurationFromValues(values) {
  let result = _.pick(values, ['name', 'email', 'phone', 'additional_info', 'terms_link', 'terms_text', 'terms_display_text', 'email_signature']);
  return result;
}
