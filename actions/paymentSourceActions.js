import _ from 'lodash';
import { fetchContact } from './contactActions';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const UPDATE_PAYMENT_SOURCE_BEGIN   = 'UPDATE_PAYMENT_SOURCE_BEGIN';
export const UPDATE_PAYMENT_SOURCE_SUCCESS = 'UPDATE_PAYMENT_SOURCE_SUCCESS';
export const UPDATE_PAYMENT_SOURCE_FAILURE = 'UPDATE_PAYMENT_SOURCE_FAILURE';
export const UPDATE_PAYMENT_SOURCE_CLEAR = 'UPDATE_PAYMENT_SOURCE_CLEAR';

export const DELETE_PAYMENT_SOURCE_BEGIN   = 'DELETE_PAYMENT_SOURCE_BEGIN';
export const DELETE_PAYMENT_SOURCE_SUCCESS = 'DELETE_PAYMENT_SOURCE_SUCCESS';
export const DELETE_PAYMENT_SOURCE_FAILURE = 'DELETE_PAYMENT_SOURCE_FAILURE';

export const updatePaymentSourceBegin = () => ({
  type: UPDATE_PAYMENT_SOURCE_BEGIN
});

export const updatePaymentSourceSuccess = (paymentSource) => ({
  type: UPDATE_PAYMENT_SOURCE_SUCCESS,
  payload: { paymentSource }
});

export const updatePaymentSourceFailure = error => ({
  type: UPDATE_PAYMENT_SOURCE_FAILURE,
  payload: { error }
});

export const updatePaymentSourceClear = () => ({
  type: UPDATE_PAYMENT_SOURCE_CLEAR
});

export function updatePaymentSource(contactId, id, values) {
  return dispatch => {
    dispatch(updatePaymentSourceBegin());
    return axios.put(`${BASE_API_URL}/contacts/${contactId}/payment_sources/${id}.json`, 
      JSON.stringify({payment_source: values}),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updatePaymentSourceSuccess(json.data));
        dispatch(fetchContact(contactId));
        return json.data;
      })
      .catch(error => dispatch(updatePaymentSourceFailure(error.response.data)));
  };
}

export const deletePaymentSourceBegin = () => ({
  type: DELETE_PAYMENT_SOURCE_BEGIN
});

export const deletePaymentSourceSuccess = (source) => ({
  type: DELETE_PAYMENT_SOURCE_SUCCESS,
  payload: { source }
});

export const deletePaymentSourceFailure = error => ({
  type: DELETE_PAYMENT_SOURCE_FAILURE,
  payload: { error }
});

export function deletePaymentSource(contactId, source) {
  return async (dispatch) => {
    dispatch(deletePaymentSourceBegin());
    await axios.delete(`${BASE_API_URL}/contacts/${contactId}/payment_sources/${source.id}.json`, {
      })
      .then(json => {
        dispatch(deletePaymentSourceSuccess(source));
        dispatch(fetchContact(contactId));
        return source;
      })
      .catch(error => dispatch(deletePaymentSourceFailure(error)));
  };
}
