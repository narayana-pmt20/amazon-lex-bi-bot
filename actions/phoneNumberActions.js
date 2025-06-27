import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_PHONE_NUMBERS_BEGIN   = 'FETCH_PHONE_NUMBERS_BEGIN';
export const FETCH_PHONE_NUMBERS_SUCCESS = 'FETCH_PHONE_NUMBERS_SUCCESS';
export const FETCH_PHONE_NUMBERS_FAILURE = 'FETCH_PHONE_NUMBERS_FAILURE';

export const CREATE_PHONE_NUMBER_BEGIN   = 'CREATE_PHONE_NUMBER_BEGIN';
export const CREATE_PHONE_NUMBER_SUCCESS = 'CREATE_PHONE_NUMBER_SUCCESS';
export const CREATE_PHONE_NUMBER_FAILURE = 'CREATE_PHONE_NUMBER_FAILURE';
export const CREATE_PHONE_NUMBER_CLEAR = 'CREATE_PHONE_NUMBER_CLEAR';

export const FETCH_PHONE_NUMBER_BEGIN   = 'FETCH_PHONE_NUMBER_BEGIN';
export const FETCH_PHONE_NUMBER_SUCCESS = 'FETCH_PHONE_NUMBER_SUCCESS';
export const FETCH_PHONE_NUMBER_FAILURE = 'FETCH_PHONE_NUMBER_FAILURE';

export const UPDATE_PHONE_NUMBER_BEGIN   = 'UPDATE_PHONE_NUMBER_BEGIN';
export const UPDATE_PHONE_NUMBER_SUCCESS = 'UPDATE_PHONE_NUMBER_SUCCESS';
export const UPDATE_PHONE_NUMBER_FAILURE = 'UPDATE_PHONE_NUMBER_FAILURE';
export const UPDATE_PHONE_NUMBER_CLEAR = 'UPDATE_PHONE_NUMBER_CLEAR';

export const DELETE_PHONE_NUMBER_BEGIN   = 'DELETE_PHONE_NUMBER_BEGIN';
export const DELETE_PHONE_NUMBER_SUCCESS = 'DELETE_PHONE_NUMBER_SUCCESS';
export const DELETE_PHONE_NUMBER_FAILURE = 'DELETE_PHONE_NUMBER_FAILURE';
export const DELETE_PHONE_NUMBER_CLEAR = 'DELETE_PHONE_NUMBER_CLEAR';

export const FETCH_AVAILABLE_NUMBERS_BEGIN = 'FETCH_AVAILABLE_NUMBERS_BEGIN';
export const FETCH_AVAILABLE_NUMBERS_SUCCESS = 'FETCH_AVAILABLE_NUMBERS_SUCCESS';
export const FETCH_AVAILABLE_NUMBERS_FAILURE = 'FETCH_AVAILABLE_NUMBERS_FAILURE';
export const FETCH_AVAILABLE_NUMBERS_CLEAR = 'FETCH_AVAILABLE_NUMBERS_CLEAR';

export const fetchPhoneNumbersBegin = () => ({
  type: FETCH_PHONE_NUMBERS_BEGIN
});

export const fetchPhoneNumbersSuccess = (phoneNumbers, totalItems) => ({
  type: FETCH_PHONE_NUMBERS_SUCCESS,
  payload: { phoneNumbers, totalItems }
});

export const fetchPhoneNumbersFailure = error => ({
  type: FETCH_PHONE_NUMBERS_FAILURE,
  payload: { error }
});

export function fetchPhoneNumbers(page = 1, query='') {
  return async (dispatch) => {
    dispatch(fetchPhoneNumbersBegin());

    const queryString = query ? `&q[phone_number_cont]=${query}` : '';

    try {
      const response = await axios.get(`${BASE_API_URL}/phone_numbers.json?page=${page}${queryString}`);
      dispatch(fetchPhoneNumbersSuccess(response.data.phone_numbers, response.data.total_entries));
    } catch (error) {
      dispatch(fetchPhoneNumbersFailure(error.response.data));
    }
  };
};

export const createPhoneNumberBegin = () => ({
  type: CREATE_PHONE_NUMBER_BEGIN
});

export const createPhoneNumberSuccess = (phoneNumber) => ({
  type: CREATE_PHONE_NUMBER_SUCCESS,
  payload: { phoneNumber }
});

export const createPhoneNumberFailure = error => ({
  type: CREATE_PHONE_NUMBER_FAILURE,
  payload: { error }
});

export const createPhoneNumberClear = error => ({
  type: CREATE_PHONE_NUMBER_CLEAR,
});

export function createPhoneNumber(values) {
  return dispatch => {
    dispatch(createPhoneNumberBegin());
    let phoneNumber = { phone_number: values };
    return axios.post(`${BASE_API_URL}/phone_numbers.json`,
        JSON.stringify(phoneNumber),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createPhoneNumberSuccess(json.data));
      })
      .catch(error => {
        dispatch(createPhoneNumberFailure(error.response.data.error));
      });
  };
};

export const fetchPhoneNumberBegin = () => ({
  type: FETCH_PHONE_NUMBER_BEGIN
});

export const fetchPhoneNumberSuccess = (phoneNumber) => ({
  type: FETCH_PHONE_NUMBER_SUCCESS,
  payload: { phoneNumber }
});

export const fetchPhoneNumberFailure = error => ({
  type: FETCH_PHONE_NUMBER_FAILURE,
  payload: { error }
});

export function fetchPhoneNumber(id) {
  return dispatch => {
    dispatch(fetchPhoneNumberBegin());
    return axios.get(`${BASE_API_URL}/phone_numbers/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchPhoneNumberSuccess(json.data));
      })
      .catch(error => dispatch(fetchPhoneNumberFailure(error)));
  };
};

export const updatePhoneNumberBegin = () => ({
  type: UPDATE_PHONE_NUMBER_BEGIN
});

export const updatePhoneNumberSuccess = (phoneNumber) => ({
  type: UPDATE_PHONE_NUMBER_SUCCESS,
  payload: { phoneNumber }
});

export const updatePhoneNumberFailure = error => ({
  type: UPDATE_PHONE_NUMBER_FAILURE,
  payload: { error }
});

export const updatePhoneNumberClear = error => ({
  type: UPDATE_PHONE_NUMBER_CLEAR,
});

export function updatePhoneNumber(id, values) {
  return async (dispatch) => {
    dispatch(updatePhoneNumberBegin());
    return axios.put(`${BASE_API_URL}/phone_numbers/${id}.json`,
      JSON.stringify({ phone_number: values }),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updatePhoneNumberSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updatePhoneNumberFailure(error.response.data)));
  };
};

export const deletePhoneNumberBegin = () => ({
  type: DELETE_PHONE_NUMBER_BEGIN
});

export const deletePhoneNumberSuccess = () => ({
  type: DELETE_PHONE_NUMBER_SUCCESS,
});

export const deletePhoneNumberFailure = error => ({
  type: DELETE_PHONE_NUMBER_FAILURE,
  payload: { error }
});

export const deletePhoneNumberClear = error => ({
  type: DELETE_PHONE_NUMBER_CLEAR,
});


export function deletePhoneNumber(phoneNumber) {
  return async (dispatch) => {
    try {
      dispatch(deletePhoneNumberBegin());
      await axios.delete(`${BASE_API_URL}/phone_numbers/${phoneNumber.id}.json`);
      dispatch(deletePhoneNumberSuccess());
    } catch (error) {
      dispatch(deletePhoneNumberFailure(error.response.data));
    }
  };
}

export const fetchAvailableNumbersBegin = () => ({
  type: FETCH_AVAILABLE_NUMBERS_BEGIN
});

export const fetchAvailableNumbersSuccess = (phoneNumbers) => ({
  type: FETCH_AVAILABLE_NUMBERS_SUCCESS,
  payload: { phoneNumbers }
});

export const fetchAvailableNumbersFailure = (error) => ({
  type: FETCH_AVAILABLE_NUMBERS_FAILURE,
  payload: { error }
});

export const fetchAvailableNumbersClear = error => ({
  type: FETCH_AVAILABLE_NUMBERS_CLEAR,
});

export function fetchAvailableNumbers(values) {
  return async (dispatch) => {
    dispatch(fetchAvailableNumbersBegin());

    const { country_code, prefix } = values;

    return axios.get(`${BASE_API_URL}/twilio_phone_numbers.json`, {
      params: {
        'phone_number[country_code]': country_code,
        'phone_number[prefix]': prefix
      }
    })
    .then((response) => {
      dispatch(fetchAvailableNumbersSuccess(response.data.phone_numbers));
      return response.data.phone_numbers;
    })
    .catch((error) => {
      dispatch(fetchAvailableNumbersFailure(error.response?.data || "Something went wrong"));
    });
  };
}

