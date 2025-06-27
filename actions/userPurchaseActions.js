import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_USER_PURCHASE_BEGIN = 'CREATE_USER_PURCHASE_BEGIN';
export const CREATE_USER_PURCHASE_SUCCESS = 'CREATE_USER_PURCHASE_SUCCESS';
export const CREATE_USER_PURCHASE_FAILURE = 'CREATE_USER_PURCHASE_FAILURE';
export const CREATE_USER_PURCHASE_CLEAR = 'CREATE_USER_PURCHASE_CLEAR';

export const UPDATE_USER_PURCHASE_BEGIN = 'UPDATE_USER_PURCHASE_BEGIN';
export const UPDATE_USER_PURCHASE_SUCCESS = 'UPDATE_USER_PURCHASE_SUCCESS';
export const UPDATE_USER_PURCHASE_FAILURE = 'UPDATE_USER_PURCHASE_FAILURE';
export const UPDATE_USER_PURCHASE_CLEAR = 'UPDATE_USER_PURCHASE_CLEAR';

export const CREATE_PAYMENT_BEGIN   = 'CREATE_PAYMENT_BEGIN';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE';
export const CREATE_PAYMENT_CLEAR = 'CREATE_PAYMENT_CLEAR';

export const FETCH_PURCHASE_BEGIN   = 'FETCH_PURCHASE_BEGIN';
export const FETCH_PURCHASE_SUCCESS = 'FETCH_PURCHASE_SUCCESS';
export const FETCH_PURCHASE_FAILURE = 'FETCH_PURCHASE_FAILURE';
export const FETCH_PURCHASE_CLEAR   = 'FETCH_PURCHASE_CLEAR';

export const createUserPurchaseBegin = () => ({
  type: CREATE_USER_PURCHASE_BEGIN
});

export const createUserPurchaseSuccess = (purchase) => ({
  type: CREATE_USER_PURCHASE_SUCCESS,
  payload: { purchase }
});

export const createUserPurchaseFailure = error => ({
  type: CREATE_USER_PURCHASE_FAILURE,
  payload: { error }
});

export const createUserPurchaseClear = () => ({
  type: CREATE_USER_PURCHASE_CLEAR
});

export function createUserPurchase(values) {
  return dispatch => {
    dispatch(createUserPurchaseBegin());
    return axios.post(`${BASE_API_URL}/user_purchases.json`,
      JSON.stringify({ purchase: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createUserPurchaseSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createUserPurchaseFailure(error.response.data))
      });
  };
}

export const updateUserPurchaseBegin = () => ({
  type: UPDATE_USER_PURCHASE_BEGIN
});

export const updateUserPurchaseSuccess = (purchase) => ({
  type: UPDATE_USER_PURCHASE_SUCCESS,
  payload: { purchase }
});

export const updateUserPurchaseFailure = error => ({
  type: UPDATE_USER_PURCHASE_FAILURE,
  payload: { error }
});

export const updateUserPurchaseClear = () => ({
  type: UPDATE_USER_PURCHASE_CLEAR
});

export function updateUserPurchase(id, values) {
  return dispatch => {
    dispatch(updateUserPurchaseBegin());
    return axios.put(`${BASE_API_URL}/user_purchases/${id}.json`,
      JSON.stringify({ purchase: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateUserPurchaseSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateUserPurchaseFailure(error.response.data))
      });
  };
}

export const createPaymentBegin = () => ({
  type: CREATE_PAYMENT_BEGIN
});

export const createPaymentSuccess = (markup) => ({
  type: CREATE_PAYMENT_SUCCESS,
  payload: { markup }
});

export const createPaymentFailure = error => ({
  type: CREATE_PAYMENT_FAILURE,
  payload: { error }
});

export const createPaymentClear = () => ({
  type: CREATE_PAYMENT_CLEAR
});

export function createPayment(id, values) {
  return dispatch => {
    dispatch(createPaymentBegin());
    return axios.post(`${BASE_API_URL}/user_purchases/${id}/payment.json`, 
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createPaymentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createPaymentFailure(error.response.data)));
  };
}

export const fetchPurchaseBegin = () => ({
  type: FETCH_PURCHASE_BEGIN
});

export const fetchPurchaseSuccess = (purchase) => ({
  type: FETCH_PURCHASE_SUCCESS,
  payload: { purchase }
});

export const fetchPurchaseFailure = error => ({
  type: FETCH_PURCHASE_FAILURE,
  payload: { error }
});

export function fetchPurchase(id) {
  return dispatch => {
    dispatch(fetchPurchaseBegin());
    return axios.get(`${BASE_API_URL}/user_purchases/${id}.json?`, {
      })
      .then(json => {
        dispatch(fetchPurchaseSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchPurchaseFailure(error)));
  };
}

export const fetchPurchaseClear = () => ({
  type: FETCH_PURCHASE_CLEAR
});
