import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_STRIPE_ACCOUNT_BEGIN = 'FETCH_STRIPE_ACCOUNT_BEGIN';
export const FETCH_STRIPE_ACCOUNT_SUCCESS = 'FETCH_STRIPE_ACCOUNT_SUCCESS';
export const FETCH_STRIPE_ACCOUNT_FAILURE = 'FETCH_STRIPE_ACCOUNT_FAILURE';

export const CREATE_STRIPE_ACCOUNT_BEGIN   = 'CREATE_STRIPE_ACCOUNT_BEGIN';
export const CREATE_STRIPE_ACCOUNT_SUCCESS = 'CREATE_STRIPE_ACCOUNT_SUCCESS';
export const CREATE_STRIPE_ACCOUNT_FAILURE = 'CREATE_STRIPE_ACCOUNT_FAILURE';
export const CREATE_STRIPE_ACCOUNT_CLEAR = 'CREATE_STRIPE_ACCOUNT_CLEAR';
export const UPDATE_STRIPE_PLATFORM_PAYMENT = 'UPDATE_STRIPE_PLATFORM_PAYMENT';

export const fetchStripeAccountBegin = () => ({
  type: FETCH_STRIPE_ACCOUNT_BEGIN
});

export const updateStripePlatformPayment = (platformPayment) => ({
  type: UPDATE_STRIPE_PLATFORM_PAYMENT,
  payload: { platformPayment }
});

export const fetchStripeAccountSuccess = (stripe_account) => ({
  type: FETCH_STRIPE_ACCOUNT_SUCCESS,
  payload: { stripe_account }
});

export const fetchStripeAccountFailure = error => ({
  type: FETCH_STRIPE_ACCOUNT_FAILURE,
  payload: { error }
});

export function fetchStripeAccount() {
  return dispatch => {
    dispatch(fetchStripeAccountBegin());
    return axios.get(`${BASE_API_URL}/stripe_account.json`, {
    })
      .then(json => {
        dispatch(fetchStripeAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(fetchStripeAccountFailure(error))
      });
  };
}

export const createStripeAccountBegin = () => ({
  type: CREATE_STRIPE_ACCOUNT_BEGIN
});

export const createStripeAccountSuccess = (stripe_account) => ({
  type: CREATE_STRIPE_ACCOUNT_SUCCESS,
  payload: { stripe_account }
});

export const createStripeAccountFailure = error => ({
  type: CREATE_STRIPE_ACCOUNT_FAILURE,
  payload: { error }
});

export const createStripeAccountClear = () => ({
  type: CREATE_STRIPE_ACCOUNT_CLEAR
});

export function createStripeAccount() {
  return dispatch => {
    dispatch(createStripeAccountBegin());
    return axios.post(`${BASE_API_URL}/stripe_account.json`, 
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createStripeAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createStripeAccountFailure(error.response.data))
      });
  };
}
