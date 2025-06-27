import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_BOOST_CONFIGURATION_BEGIN = 'FETCH_BOOST_CONFIGURATION_BEGIN';
export const FETCH_BOOST_CONFIGURATION_SUCCESS = 'FETCH_BOOST_CONFIGURATION_SUCCESS';
export const FETCH_BOOST_CONFIGURATION_FAILURE = 'FETCH_BOOST_CONFIGURATION_FAILURE';

export const UPDATE_BOOST_CONFIGURATION_BEGIN = 'UPDATE_BOOST_CONFIGURATION_BEGIN';
export const UPDATE_BOOST_CONFIGURATION_SUCCESS = 'UPDATE_BOOST_CONFIGURATION_SUCCESS';
export const UPDATE_BOOST_CONFIGURATION_FAILURE = 'UPDATE_BOOST_CONFIGURATION_FAILURE';
export const UPDATE_BOOST_CONFIGURATION_CLEAR = 'UPDATE_BOOST_CONFIGURATION_CLEAR';

export const fetchBoostConfigurationBegin = () => ({
  type: FETCH_BOOST_CONFIGURATION_BEGIN
});

export const fetchBoostConfigurationSuccess = (boost_configuration) => ({
  type: FETCH_BOOST_CONFIGURATION_SUCCESS,
  payload: { boost_configuration }
});

export const fetchBoostConfigurationFailure = error => ({
  type: FETCH_BOOST_CONFIGURATION_FAILURE,
  payload: { error }
});

export function fetchBoostConfiguration(segment = null) {
  return dispatch => {
    dispatch(fetchBoostConfigurationBegin());
    const params = {};
    if (segment) {
      params.segment = segment;
    }

    return axios.get(`${BASE_API_URL}/boost_configuration.json`, { params }
      )
      .then(json => {
        dispatch(fetchBoostConfigurationSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchBoostConfigurationFailure(error)));
  };
}


export const updateBoostConfigurationBegin = () => ({
  type: UPDATE_BOOST_CONFIGURATION_BEGIN
});

export const updateBoostConfigurationSuccess = (boost_configuration) => ({
  type: UPDATE_BOOST_CONFIGURATION_SUCCESS,
  payload: { boost_configuration }
});

export const updateBoostConfigurationFailure = error => ({
  type: UPDATE_BOOST_CONFIGURATION_FAILURE,
  payload: { error }
});

export const updateBoostConfigurationClear = () => ({
  type: UPDATE_BOOST_CONFIGURATION_CLEAR
});

export function updateBoostConfiguration(values) {
  return dispatch => {
    dispatch(updateBoostConfigurationBegin());
    return axios.put(`${BASE_API_URL}/boost_configuration.json`, 
      JSON.stringify({boost_configuration: values}),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updateBoostConfigurationSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateBoostConfigurationFailure(error.response.data)));
  };
}
