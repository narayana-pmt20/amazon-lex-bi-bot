import _ from 'lodash';
import { fetchProfile } from './profileActions';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const UPDATE_USER_PAYMENT_SOURCE_BEGIN   = 'UPDATE_USER_PAYMENT_SOURCE_BEGIN';
export const UPDATE_USER_PAYMENT_SOURCE_SUCCESS = 'UPDATE_USER_PAYMENT_SOURCE_SUCCESS';
export const UPDATE_USER_PAYMENT_SOURCE_FAILURE = 'UPDATE_USER_PAYMENT_SOURCE_FAILURE';
export const UPDATE_USER_PAYMENT_SOURCE_CLEAR = 'UPDATE_USER_PAYMENT_SOURCE_CLEAR';

export const updateUserPaymentSourceBegin = () => ({
  type: UPDATE_USER_PAYMENT_SOURCE_BEGIN
});

export const updateUserPaymentSourceSuccess = (paymentSource) => ({
  type: UPDATE_USER_PAYMENT_SOURCE_SUCCESS,
  payload: { paymentSource }
});

export const updateUserPaymentSourceFailure = error => ({
  type: UPDATE_USER_PAYMENT_SOURCE_FAILURE,
  payload: { error }
});

export const updateUserPaymentSourceClear = () => ({
  type: UPDATE_USER_PAYMENT_SOURCE_CLEAR
});

export function updateUserPaymentSource(intent) {
  return dispatch => {
    dispatch(updateUserPaymentSourceBegin());
    return axios.put(`${BASE_API_URL}/user_payment_source.json`, 
      JSON.stringify({stripeIntent: intent}),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateUserPaymentSourceSuccess(json.data));
        dispatch(fetchProfile());
        return json.data;
      })
      .catch(error => dispatch(updateUserPaymentSourceFailure(error.response.data)));
  };
}
