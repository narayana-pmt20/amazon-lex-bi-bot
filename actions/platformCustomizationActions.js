import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_PLATFORM_CUSTOMIZATION_BEGIN = 'FETCH_PLATFORM_CUSTOMIZATION_BEGIN';
export const FETCH_PLATFORM_CUSTOMIZATION_SUCCESS = 'FETCH_PLATFORM_CUSTOMIZATION_SUCCESS';
export const FETCH_PLATFORM_CUSTOMIZATION_FAILURE = 'FETCH_PLATFORM_CUSTOMIZATION_FAILURE';

export const UPDATE_PLATFORM_CUSTOMIZATION_BEGIN = 'UPDATE_PLATFORM_CUSTOMIZATION_BEGIN';
export const UPDATE_PLATFORM_CUSTOMIZATION_SUCCESS = 'UPDATE_PLATFORM_CUSTOMIZATION_SUCCESS';
export const UPDATE_PLATFORM_CUSTOMIZATION_FAILURE = 'UPDATE_PLATFORM_CUSTOMIZATION_FAILURE';
export const UPDATE_PLATFORM_CUSTOMIZATION_CLEAR = 'UPDATE_PLATFORM_CUSTOMIZATION_CLEAR';

export const fetchPlatformCustomizationBegin = () => ({
  type: FETCH_PLATFORM_CUSTOMIZATION_BEGIN
});

export const fetchPlatformCustomizationSuccess = (platformCustomization) => ({
  type: FETCH_PLATFORM_CUSTOMIZATION_SUCCESS,
  payload: { platformCustomization }
});

export const fetchPlatformCustomizationFailure = error => ({
  type: FETCH_PLATFORM_CUSTOMIZATION_FAILURE,
  payload: { error }
});

export function fetchPlatformCustomization() {
  return dispatch => {
    dispatch(fetchPlatformCustomizationBegin());
    return axios.get(`${BASE_API_URL}/platform_customization.json`, {
    })
      .then(json => {
        dispatch(fetchPlatformCustomizationSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchPlatformCustomizationFailure(error)));
  };
}


export const updatePlatformCustomizationBegin = () => ({
  type: UPDATE_PLATFORM_CUSTOMIZATION_BEGIN
});

export const updatePlatformCustomizationSuccess = (platformCustomization) => ({
  type: UPDATE_PLATFORM_CUSTOMIZATION_SUCCESS,
  payload: { platformCustomization }
});

export const updatePlatformCustomizationFailure = error => ({
  type: UPDATE_PLATFORM_CUSTOMIZATION_FAILURE,
  payload: { error }
});

export const updatePlatformCustomizationClear = () => ({
  type: UPDATE_PLATFORM_CUSTOMIZATION_CLEAR
});

export function updatePlatformCustomization(values) {
  return dispatch => {
    dispatch(updatePlatformCustomizationBegin());
    return axios.put(`${BASE_API_URL}/platform_customization.json`, 
      JSON.stringify({platform_customization: values}),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updatePlatformCustomizationSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updatePlatformCustomizationFailure(error.response.data)));
  };
}
