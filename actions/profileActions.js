import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_PROFILE_BEGIN = 'FETCH_PROFILE_BEGIN';
export const FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'FETCH_PROFILE_FAILURE';

export const UPDATE_PROFILE_BEGIN = 'UPDATE_PROFILE_BEGIN';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';
export const UPDATE_PROFILE_CLEAR = 'UPDATE_PROFILE_CLEAR';

export const SWITCH_STACK_BEGIN = 'SWITCH_STACK_BEGIN';
export const SWITCH_STACK_SUCCESS = 'SWITCH_STACK_SUCCESS';
export const SWITCH_STACK_FAILURE = 'SWITCH_STACK_FAILURE';
export const SWITCH_STACK_CLEAR = 'SWITCH_STACK_CLEAR';

export const DECREMENT_UNREAD_MESSAGES_COUNT = 'DECREMENT_UNREAD_MESSAGES_COUNT';
export const INCREMENT_UNREAD_MESSAGES_COUNT = 'INCREMENT_UNREAD_MESSAGES_COUNT';

export const UPDATE_PASSWORD_BEGIN   = 'UPDATE_PASSWORD_BEGIN';
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS';
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE';

export const fetchProfileBegin = () => ({
  type: FETCH_PROFILE_BEGIN
});

export const fetchProfileSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: { profile }
});

export const fetchProfileFailure = error => ({
  type: FETCH_PROFILE_FAILURE,
  payload: { error }
});

export function fetchProfile() {
  return dispatch => {
    dispatch(fetchProfileBegin());
    return axios
      .get(`${BASE_API_URL}/profile.json`, {})
      .then((json) => {
        dispatch(fetchProfileSuccess(json.data));
        return json.data;
      })
      .catch((error) => dispatch(fetchProfileFailure(error)));
  };
}

export const updateProfileBegin = () => ({
  type: UPDATE_PROFILE_BEGIN
});

export const updateProfileSuccess = (profile) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: { profile }
});

export const updateProfileFailure = error => ({
  type: UPDATE_PROFILE_FAILURE,
  payload: { error }
});

export const updateProfileClear = () => ({
  type: UPDATE_PROFILE_CLEAR
});

export const updatePasswordBegin = () => ({
  type: UPDATE_PASSWORD_BEGIN
});

export const updatePasswordSuccess = () => ({
  type: UPDATE_PASSWORD_SUCCESS,
});

export const updatePasswordFailure = (error) => ({
  type: UPDATE_PASSWORD_FAILURE,
  payload: { error },
});

export const updatePassword = (formData) => {
  return dispatch => {
    dispatch(updatePasswordBegin());
    return axios.put(`${BASE_API_URL}/passwords.json`, formData, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then(json => {
        dispatch(updatePasswordSuccess());
        return json.data;
      })
      .catch(error => {
        return dispatch(updatePasswordFailure(error.response.data.errors)
      )}
    );
  };
};

export function updateProfile(values) {
  return dispatch => {
    dispatch(updateProfileBegin());
    return axios.put(`${BASE_API_URL}/profile.json`,
      JSON.stringify({ profile: createProfileFromValues(values) }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(updateProfileSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateProfileFailure(error.response?.data)));
  };
}

function createProfileFromValues(values) {
  let result = _.pick(values, ['first_name', 'last_name', 'email', 'phone',
    'secondary_email', 'company', 'website', 'display_name', 'profile_photo',
    'date_of_birth', 'confirm_information', 'paypal_email', 'background_industry', 'main_function', 'preferred_activity', 'marketing_investment_time', 'joining_reason', 'referral_source']);
  let address = _.pick(values, ['address1', 'address2', 'city', 'region', 'postal_code', 'country']);
  if (_.isEmpty(address) == false) {
    result.address_attributes = address;
    if (values.address_id !== undefined) {
      result.address_attributes.id = values.address_id
    }
  }
  if (_.isEmpty(values.address_attributes) == false) {
    result.address_attributes = values.address_attributes;
  }
  return result;
}

export const switchStackBegin = () => ({
  type: SWITCH_STACK_BEGIN
});

export const switchStackSuccess = (profile) => ({
  type: SWITCH_STACK_SUCCESS,
  payload: { profile }
});

export const switchStackFailure = error => ({
  type: SWITCH_STACK_FAILURE,
  payload: { error }
});

export const switchStackClear = () => ({
  type: SWITCH_STACK_CLEAR
});

export function switchStack(stackId) {
  return dispatch => {
    dispatch(switchStackBegin());
    return axios.post(`${BASE_API_URL}/stack_switch.json`,
      JSON.stringify({ stack_id: stackId }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(switchStackSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(switchStackFailure(error)));
  };
}

export const decreaseUnreadMessagesCount = (unreadMessagesCount) => ({
  type: DECREMENT_UNREAD_MESSAGES_COUNT,
  payload: { unreadMessagesCount }
})

export const increaseUnreadMessagesCount = (unreadMessagesCount) => ({
  type: INCREMENT_UNREAD_MESSAGES_COUNT,
  payload: { unreadMessagesCount }
})