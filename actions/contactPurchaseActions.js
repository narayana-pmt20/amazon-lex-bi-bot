import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_CONTACT_PURCHASE_BEGIN = 'CREATE_CONTACT_PURCHASE_BEGIN';
export const CREATE_CONTACT_PURCHASE_SUCCESS = 'CREATE_CONTACT_PURCHASE_SUCCESS';
export const CREATE_CONTACT_PURCHASE_FAILURE = 'CREATE_CONTACT_PURCHASE_FAILURE';
export const CREATE_CONTACT_PURCHASE_CLEAR = 'CREATE_CONTACT_PURCHASE_CLEAR';

export const UPDATE_CONTACT_PURCHASE_BEGIN = 'UPDATE_CONTACT_PURCHASE_BEGIN';
export const UPDATE_CONTACT_PURCHASE_SUCCESS = 'UPDATE_CONTACT_PURCHASE_SUCCESS';
export const UPDATE_CONTACT_PURCHASE_FAILURE = 'UPDATE_CONTACT_PURCHASE_FAILURE';
export const UPDATE_CONTACT_PURCHASE_CLEAR = 'UPDATE_CONTACT_PURCHASE_CLEAR';

export const CREATE_PAYMENT_BEGIN = 'CREATE_PAYMENT_BEGIN';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE';
export const CREATE_PAYMENT_CLEAR = 'CREATE_PAYMENT_CLEAR';

export const DELETE_CONTACT_PURCHASE_BEGIN   = 'DELETE_CONTACT_PURCHASE_BEGIN';
export const DELETE_CONTACT_PURCHASE_SUCCESS = 'DELETE_CONTACT_PURCHASE_SUCCESS';
export const DELETE_CONTACT_PURCHASE_FAILURE = 'DELETE_CONTACT_PURCHASE_FAILURE';
export const DELETE_CONTACT_PURCHASE_CLEAR = 'DELETE_CONTACT_PURCHASE_CLEAR';

export const FETCH_SETUP_BEGIN = 'FETCH_SETUP_BEGIN';
export const FETCH_SETUP_SUCCESS = 'FETCH_SETUP_SUCCESS';
export const FETCH_SETUP_FAILURE = 'FETCH_SETUP_FAILURE';
export const FETCH_SETUP_CLEAR = 'FETCH_SETUP_CLEAR';

export const FETCH_PURCHASE_BEGIN = 'FETCH_PURCHASE_BEGIN';
export const FETCH_PURCHASE_SUCCESS = 'FETCH_PURCHASE_SUCCESS';
export const FETCH_PURCHASE_FAILURE = 'FETCH_PURCHASE_FAILURE';

export const createContactPurchaseBegin = () => ({
  type: CREATE_CONTACT_PURCHASE_BEGIN
});

export const createContactPurchaseSuccess = (purchase) => ({
  type: CREATE_CONTACT_PURCHASE_SUCCESS,
  payload: { purchase }
});

export const createContactPurchaseFailure = error => ({
  type: CREATE_CONTACT_PURCHASE_FAILURE,
  payload: { error }
});

export const createContactPurchaseClear = () => ({
  type: CREATE_CONTACT_PURCHASE_CLEAR
});

export function createContactPurchase(values) {
  return dispatch => {
    dispatch(createContactPurchaseBegin());
    return axios.post(`${BASE_API_URL}/contact_purchases.json`,
      JSON.stringify({ contact_purchase: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createContactPurchaseSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createContactPurchaseFailure(error.response.data))
      });
  };
}

export const updateContactPurchaseBegin = () => ({
  type: UPDATE_CONTACT_PURCHASE_BEGIN
});

export const updateContactPurchaseSuccess = (purchase) => ({
  type: UPDATE_CONTACT_PURCHASE_SUCCESS,
  payload: { purchase }
});

export const updateContactPurchaseFailure = error => ({
  type: UPDATE_CONTACT_PURCHASE_FAILURE,
  payload: { error }
});

export const updateContactPurchaseClear = () => ({
  type: UPDATE_CONTACT_PURCHASE_CLEAR
});

export function updateContactPurchase(id, values) {
  return dispatch => {
    dispatch(updateContactPurchaseBegin());
    return axios.put(`${BASE_API_URL}/contact_purchases/${id}.json`,
      JSON.stringify({ contact_purchase: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateContactPurchaseSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateContactPurchaseFailure(error.response.data))
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
    return axios.post(`${BASE_API_URL}/contact_purchases/${id}/payment.json`,
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createPaymentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createPaymentFailure(error.response.data)));
  };
}

export const fetchSetupBegin = () => ({
  type: FETCH_SETUP_BEGIN
});

export const fetchSetupSuccess = (purchaseSetup) => ({
  type: FETCH_SETUP_SUCCESS,
  payload: { purchaseSetup }
});

export const fetchSetupFailure = error => ({
  type: FETCH_SETUP_FAILURE,
  payload: { error }
});

export function fetchSetup(contact_id, slug, vendor_quote_id) {
  let url = `${BASE_API_URL}/contact_purchase_setup.json?slug=${slug}`
  if (contact_id) {
    url = url + `&contact_id=${contact_id}`
  }
  if (vendor_quote_id) {
    url = url + `&vendor_quote_id=${vendor_quote_id}`
  }


  return dispatch => {
    dispatch(fetchSetupBegin());
    return axios.get(url, {
    })
      .then(json => {
        dispatch(fetchSetupSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchSetupFailure(error)));
  };
}

export const fetchSetupClear = () => ({
  type: FETCH_SETUP_CLEAR
});

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
    return axios.get(`${BASE_API_URL}/contact_purchases/${id}.json?`, {
    })
      .then(json => {
        dispatch(fetchPurchaseSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchPurchaseFailure(error)));
  };
}

export const deleteContactPurchaseBegin = () => ({
  type: DELETE_CONTACT_PURCHASE_BEGIN
});

export const deleteContactPurchaseSuccess = (purchase) => ({
  type: DELETE_CONTACT_PURCHASE_SUCCESS,
  payload: { purchase }
});

export const deleteContactPurchaseFailure = error => ({
  type: DELETE_CONTACT_PURCHASE_FAILURE,
  payload: { error }
});

export function deleteContactPurchase(purchase) {
  return async (dispatch) => {
    dispatch(deleteContactPurchaseBegin());
    await axios.delete(`${BASE_API_URL}/contact_purchases/${purchase.id}.json`, {
      })
      .then(json => {
        dispatch(deleteContactPurchaseSuccess(purchase));
        return purchase;
      })
      .catch(error => dispatch(deleteContactPurchaseFailure(error)));
  };
}

export const deleteContactPurchaseClear = () => ({
  type: DELETE_CONTACT_PURCHASE_CLEAR
});

