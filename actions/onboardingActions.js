import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const UPDATE_ONBOARDING_BEGIN = 'UPDATE_ONBOARDING_BEGIN';
export const UPDATE_ONBOARDING_SUCCESS = 'UPDATE_ONBOARDING_SUCCESS';
export const UPDATE_ONBOARDING_FAILURE = 'UPDATE_ONBOARDING_FAILURE';
export const UPDATE_ONBOARDING_CLEAR = 'UPDATE_ONBOARDING_CLEAR';

export const updateOnboardingBegin = () => ({
  type: UPDATE_ONBOARDING_BEGIN
});

export const updateOnboardingSuccess = (onboarding) => ({
  type: UPDATE_ONBOARDING_SUCCESS,
  payload: { onboarding }
});

export const updateOnboardingFailure = error => ({
  type: UPDATE_ONBOARDING_FAILURE,
  payload: { error }
});

export const updateOnboardingClear = () => ({
  type: UPDATE_ONBOARDING_CLEAR
});

export function updateOnboarding(id, value) {
  return dispatch => {
    dispatch(updateOnboardingBegin());
    return axios.put(`${BASE_API_URL}/onboardings/${id}.json`, JSON.stringify({ onboarding: value }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateOnboardingSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateOnboardingFailure(error))
      });
  };
}