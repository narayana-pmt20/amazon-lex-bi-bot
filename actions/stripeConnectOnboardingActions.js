import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const STRIPE_CONNECT_ONBOARDING_BEGIN = 'STRIPE_CONNECT_ONBOARDING_BEGIN';
export const STRIPE_CONNECT_ONBOARDING_SUCCESS = 'STRIPE_CONNECT_ONBOARDING_SUCCESS';
export const STRIPE_CONNECT_ONBOARDING_FAILURE = 'STRIPE_CONNECT_ONBOARDING_FAILURE';
export const STRIPE_CONNECT_ONBOARDING_CLEAR = 'STRIPE_CONNECT_ONBOARDING_CLEAR';

export const stripeConnectOnboardingBegin = () => ({
  type: STRIPE_CONNECT_ONBOARDING_BEGIN
});

export const stripeConnectOnboardingSuccess = (stripe_account_connect) => ({
  type: STRIPE_CONNECT_ONBOARDING_SUCCESS,
  payload: { stripe_account_connect }
});

export const stripeConnectOnboardingFailure = error => ({
  type: STRIPE_CONNECT_ONBOARDING_FAILURE,
  payload: { error }
});

export const stripeConnectOnboardingClear = () => ({
  type: STRIPE_CONNECT_ONBOARDING_CLEAR
});

export function createStripeConnectOnboarding(type = null) {
  return dispatch => {
    dispatch(stripeConnectOnboardingBegin(type));
    return axios.post(`${BASE_API_URL}/user_stripe_connect_onboarding.json`,
      JSON.stringify({ type }),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(stripeConnectOnboardingSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(stripeConnectOnboardingFailure(error.response.data)));
  };
}
