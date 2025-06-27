import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CONTACT_SUBSCRIPTION_BEGIN   = 'FETCH_CONTACT_SUBSCRIPTION_BEGIN';
export const FETCH_CONTACT_SUBSCRIPTION_SUCCESS = 'FETCH_CONTACT_SUBSCRIPTION_SUCCESS';
export const FETCH_CONTACT_SUBSCRIPTION_FAILURE = 'FETCH_CONTACT_SUBSCRIPTION_FAILURE';
export const FETCH_CONTACT_SUBSCRIPTION_CLEAR = 'FETCH_CONTACT_SUBSCRIPTION_CLEAR';

export const UPDATE_CONTACT_SUBSCRIPTION_BEGIN   = 'UPDATE_CONTACT_SUBSCRIPTION_BEGIN';
export const UPDATE_CONTACT_SUBSCRIPTION_SUCCESS = 'UPDATE_CONTACT_SUBSCRIPTION_SUCCESS';
export const UPDATE_CONTACT_SUBSCRIPTION_FAILURE = 'UPDATE_CONTACT_SUBSCRIPTION_FAILURE';
export const UPDATE_CONTACT_SUBSCRIPTION_CLEAR = 'UPDATE_CONTACT_SUBSCRIPTION_CLEAR';

export const CREATE_CONTACT_SUBSCRIPTION_BEGIN   = 'CREATE_CONTACT_SUBSCRIPTION_BEGIN';
export const CREATE_CONTACT_SUBSCRIPTION_SUCCESS = 'CREATE_CONTACT_SUBSCRIPTION_SUCCESS';
export const CREATE_CONTACT_SUBSCRIPTION_FAILURE = 'CREATE_CONTACT_SUBSCRIPTION_FAILURE';
export const CREATE_CONTACT_SUBSCRIPTION_CLEAR = 'CREATE_CONTACT_SUBSCRIPTION_CLEAR';

export const CANCEL_CONTACT_SUBSCRIPTION_BEGIN   = 'CANCEL_CONTACT_SUBSCRIPTION_BEGIN';
export const CANCEL_CONTACT_SUBSCRIPTION_SUCCESS = 'CANCEL_CONTACT_SUBSCRIPTION_SUCCESS';
export const CANCEL_CONTACT_SUBSCRIPTION_FAILURE = 'CANCEL_CONTACT_SUBSCRIPTION_FAILURE';
export const CANCEL_CONTACT_SUBSCRIPTION_CLEAR = 'CANCEL_CONTACT_SUBSCRIPTION_CLEAR';

export const UPDATE_MARKUP_BEGIN   = 'UPDATE_MARKUP_BEGIN';
export const UPDATE_MARKUP_SUCCESS = 'UPDATE_MARKUP_SUCCESS';
export const UPDATE_MARKUP_FAILURE = 'UPDATE_MARKUP_FAILURE';
export const UPDATE_MARKUP_CLEAR = 'UPDATE_MARKUP_CLEAR';

export const CREATE_PAYMENT_BEGIN   = 'CREATE_PAYMENT_BEGIN';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE';
export const CREATE_PAYMENT_CLEAR = 'CREATE_PAYMENT_CLEAR';

export const FETCH_SETUP_BEGIN   = 'FETCH_SETUP_BEGIN';
export const FETCH_SETUP_SUCCESS = 'FETCH_SETUP_SUCCESS';
export const FETCH_SETUP_FAILURE = 'FETCH_SETUP_FAILURE';
export const FETCH_SETUP_CLEAR = 'FETCH_SETUP_CLEAR';

export const UPDATE_PAYMENT_OPTIONS_BEGIN   = 'UPDATE_PAYMENT_OPTIONS_BEGIN';
export const UPDATE_PAYMENT_OPTIONS_SUCCESS = 'UPDATE_PAYMENT_OPTIONS_SUCCESS';
export const UPDATE_PAYMENT_OPTIONS_FAILURE = 'UPDATE_PAYMENT_OPTIONS_FAILURE';
export const UPDATE_PAYMENT_OPTIONS_CLEAR = 'UPDATE_PAYMENT_OPTIONS_CLEAR';

export const UPDATE_CONTACT_SUBSCRIPTION_BOOKING_BEGIN   = 'UPDATE_CONTACT_SUBSCRIPTION_BOOKING_BEGIN';
export const UPDATE_CONTACT_SUBSCRIPTION_BOOKING_SUCCESS = 'UPDATE_CONTACT_SUBSCRIPTION_BOOKING_SUCCESS';
export const UPDATE_CONTACT_SUBSCRIPTION_BOOKING_FAILURE = 'UPDATE_CONTACT_SUBSCRIPTION_BOOKING_FAILURE';
export const UPDATE_CONTACT_SUBSCRIPTION_BOOKING_CLEAR = 'UPDATE_CONTACT_SUBSCRIPTION_BOOKING_CLEAR';

export const fetchContactSubscriptionBegin = () => ({
  type: FETCH_CONTACT_SUBSCRIPTION_BEGIN
});

export const fetchContactSubscriptionSuccess = (subscription) => ({
  type: FETCH_CONTACT_SUBSCRIPTION_SUCCESS,
  payload: { subscription }
});

export const fetchContactSubscriptionFailure = error => ({
  type: FETCH_CONTACT_SUBSCRIPTION_FAILURE,
  payload: { error }
});

export const fetchContactSubscriptionClear = () => ({
  type: FETCH_CONTACT_SUBSCRIPTION_CLEAR
});

export function fetchContactSubscription(id) {
  return dispatch => {
    dispatch(fetchContactSubscriptionBegin());
    return axios.get(`${BASE_API_URL}/contact_subscriptions/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchContactSubscriptionSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchContactSubscriptionFailure(error)));
  };
}

export const updateContactSubscriptionBegin = () => ({
  type: UPDATE_CONTACT_SUBSCRIPTION_BEGIN
});

export const updateContactSubscriptionSuccess = (subscription) => ({
  type: UPDATE_CONTACT_SUBSCRIPTION_SUCCESS,
  payload: { subscription }
});

export const updateContactSubscriptionFailure = error => ({
  type: UPDATE_CONTACT_SUBSCRIPTION_FAILURE,
  payload: { error }
});

export const updateContactSubscriptionClear = () => ({
  type: UPDATE_CONTACT_SUBSCRIPTION_CLEAR
});

export function updateContactSubscription(id, values) {
  return dispatch => {
    dispatch(updateContactSubscriptionBegin());
    return axios.put(`${BASE_API_URL}/contact_subscriptions/${id}.json`, 
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateContactSubscriptionSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateContactSubscriptionFailure(error.response.data)));
  };
}

export const createContactSubscriptionBegin = () => ({
  type: CREATE_CONTACT_SUBSCRIPTION_BEGIN
});

export const createContactSubscriptionSuccess = (contact) => ({
  type: CREATE_CONTACT_SUBSCRIPTION_SUCCESS,
  payload: { contact }
});

export const createContactSubscriptionFailure = error => ({
  type: CREATE_CONTACT_SUBSCRIPTION_FAILURE,
  payload: { error }
});

export const createContactSubscriptionClear = () => ({
  type: CREATE_CONTACT_SUBSCRIPTION_CLEAR
});

export function createContactSubscription(values) {
  return dispatch => {
    dispatch(createContactSubscriptionBegin());
    return axios.post(`${BASE_API_URL}/contact_subscriptions.json`, 
        JSON.stringify({contact_subscription: values}),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createContactSubscriptionSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createContactSubscriptionFailure(error.response.data))
      });
  };
}

export const cancelContactSubscriptionBegin = () => ({
  type: CANCEL_CONTACT_SUBSCRIPTION_BEGIN
});

export const cancelContactSubscriptionSuccess = (subscription) => ({
  type: CANCEL_CONTACT_SUBSCRIPTION_SUCCESS,
  payload: { subscription }
});

export const cancelContactSubscriptionFailure = error => ({
  type: CANCEL_CONTACT_SUBSCRIPTION_FAILURE,
  payload: { error }
});

export function cancelContactSubscription(subscription, cancelation_reason) {
  return async (dispatch) => {
    dispatch(cancelContactSubscriptionBegin());
    await axios.delete(`${BASE_API_URL}/contact_subscriptions/${subscription.id}.json`, {
        data: { cancelation_reason }
      })
      .then(json => {
        dispatch(cancelContactSubscriptionSuccess(subscription));
        return subscription;
      })
      .catch(error => dispatch(cancelContactSubscriptionFailure(error)));
  };
}

export const cancelContactSubscriptionClear = () => ({
  type: CANCEL_CONTACT_SUBSCRIPTION_CLEAR
});

export const updateMarkupBegin = () => ({
  type: UPDATE_MARKUP_BEGIN
});

export const updateMarkupSuccess = (markup) => ({
  type: UPDATE_MARKUP_SUCCESS,
  payload: { markup }
});

export const updateMarkupFailure = error => ({
  type: UPDATE_MARKUP_FAILURE,
  payload: { error }
});

export const updateMarkupClear = () => ({
  type: UPDATE_MARKUP_CLEAR
});

export function updateMarkup(id, values) {
  return dispatch => {
    dispatch(updateMarkupBegin());
    return axios.put(`${BASE_API_URL}/contact_subscriptions/${id}/markup.json`, 
      JSON.stringify({ markup: values }),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateMarkupSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateMarkupFailure(error.response.data)));
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
    return axios.post(`${BASE_API_URL}/contact_subscriptions/${id}/payment.json`, 
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' }})
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

export const fetchSetupSuccess = (setup) => ({
  type: FETCH_SETUP_SUCCESS,
  payload: { setup }
});

export const fetchSetupFailure = error => ({
  type: FETCH_SETUP_FAILURE,
  payload: { error }
});

export function fetchSetup(slug, vendor_quote_id) {
  let url = `${BASE_API_URL}/contact_subscription_setup.json?slug=${slug}`
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

export const updatePaymentOptionBegin = () => ({
  type: UPDATE_PAYMENT_OPTIONS_BEGIN
});

export const updatePaymentOptionSuccess = (payment_source) => ({
  type: UPDATE_PAYMENT_OPTIONS_SUCCESS,
  payload: { payment_source }
});

export const updatePaymentOptionFailure = error => ({
  type: UPDATE_PAYMENT_OPTIONS_FAILURE,
  payload: { error }
});

export const updatePaymentOptionClear = () => ({
  type: UPDATE_PAYMENT_OPTIONS_CLEAR
});

export function updatePaymentOption(id, values) {
  return dispatch => {
    dispatch(updatePaymentOptionBegin());
    return axios.put(`${BASE_API_URL}/contact_subscriptions/${id}/payment.json`, 
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updatePaymentOptionSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updatePaymentOptionFailure(error.response.data)));
  };
}

export const updateContactSubscriptionBookingBegin = () => ({
  type: UPDATE_CONTACT_SUBSCRIPTION_BOOKING_BEGIN
});

export const updateContactSubscriptionBookingSuccess = (subscription) => ({
  type: UPDATE_CONTACT_SUBSCRIPTION_BOOKING_SUCCESS,
  payload: { subscription }
});

export const updateContactSubscriptionBookingFailure = error => ({
  type: UPDATE_CONTACT_SUBSCRIPTION_BOOKING_FAILURE,
  payload: { error }
});

export const updateContactSubscriptionBookingClear = () => ({
  type: UPDATE_CONTACT_SUBSCRIPTION_BOOKING_CLEAR
});

export function updateContactSubscriptionBooking(id, values) {
  return dispatch => {
    dispatch(updateContactSubscriptionBookingBegin());
    return axios.put(`${BASE_API_URL}/contact_subscriptions/${id}.json`,
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateContactSubscriptionBookingSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateContactSubscriptionBookingFailure(error.response.data)));
  };
};

export function setContactSubscriptionDisplayName(id, display_name) {
  return dispatch => {
    return axios.put(`${BASE_API_URL}/contact_subscriptions/${id}.json`,
      JSON.stringify({ display_name: display_name }),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        return json.data;
      })
      .catch(error => console.log(error.response.data));
  };
}
