import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CUSTOM_FIELDS_BEGIN   = 'FETCH_CUSTOM_FIELDS_BEGIN';
export const FETCH_CUSTOM_FIELDS_SUCCESS = 'FETCH_CUSTOM_FIELDS_SUCCESS';
export const FETCH_CUSTOM_FIELDS_FAILURE = 'FETCH_CUSTOM_FIELDS_FAILURE';

export const FETCH_CUSTOM_FIELD_BEGIN   = 'FETCH_CUSTOM_FIELD_BEGIN';
export const FETCH_CUSTOM_FIELD_SUCCESS = 'FETCH_CUSTOM_FIELD_SUCCESS';
export const FETCH_CUSTOM_FIELD_FAILURE = 'FETCH_CUSTOM_FIELD_FAILURE';
export const FETCH_CUSTOM_FIELD_CLEAR   = 'FETCH_CUSTOM_FIELD_CLEAR';

export const CREATE_CUSTOM_FIELD_BEGIN   = 'CREATE_CUSTOM_FIELD_BEGIN';
export const CREATE_CUSTOM_FIELD_SUCCESS = 'CREATE_CUSTOM_FIELD_SUCCESS';
export const CREATE_CUSTOM_FIELD_FAILURE = 'CREATE_CUSTOM_FIELD_FAILURE';
export const CREATE_CUSTOM_FIELD_CLEAR   = 'CREATE_CUSTOM_FIELD_CLEAR';

export const UPDATE_CUSTOM_FIELD_BEGIN   = 'UPDATE_CUSTOM_FIELD_BEGIN';
export const UPDATE_CUSTOM_FIELD_SUCCESS = 'UPDATE_CUSTOM_FIELD_SUCCESS';
export const UPDATE_CUSTOM_FIELD_FAILURE = 'UPDATE_CUSTOM_FIELD_FAILURE';
export const UPDATE_CUSTOM_FIELD_CLEAR   = 'UPDATE_CUSTOM_FIELD_CLEAR';

export const DELETE_CUSTOM_FIELD_BEGIN   = 'DELETE_CUSTOM_FIELD_BEGIN';
export const DELETE_CUSTOM_FIELD_SUCCESS = 'DELETE_CUSTOM_FIELD_SUCCESS';
export const DELETE_CUSTOM_FIELD_FAILURE = 'DELETE_CUSTOM_FIELD_FAILURE';


export const fetchCustomFieldsBegin = () => ({
  type: FETCH_CUSTOM_FIELDS_BEGIN
});

export const fetchCustomFieldsSuccess = (customFields, totalItems) => ({
  type: FETCH_CUSTOM_FIELDS_SUCCESS,
  payload: { customFields, totalItems }
});

export const fetchCustomFieldsFailure = error => ({
  type: FETCH_CUSTOM_FIELDS_FAILURE,
  payload: { error }
});

export function fetchCustomFields(page = 1, query='') {
  return async (dispatch) => {
    dispatch(fetchCustomFieldsBegin());

    const queryString = query ? `&q[name_cont]=${query}` : '';

    try {
      const response = await axios.get(`${BASE_API_URL}/custom_fields.json?page=${page}${queryString}`);
      dispatch(fetchCustomFieldsSuccess(response.data.custom_fields, response.data.total_entries));
    } catch (error) {
      dispatch(fetchCustomFieldsFailure(error.response.data));
    }
  };
}

export const fetchCustomFieldBegin = () => ({
  type: FETCH_CUSTOM_FIELD_BEGIN
});

export const fetchCustomFieldSuccess = (custom_field) => ({
  type: FETCH_CUSTOM_FIELD_SUCCESS,
  payload: { custom_field }
});

export const fetchCustomFieldFailure = error => ({
  type: FETCH_CUSTOM_FIELD_FAILURE,
  payload: { error }
});

export function fetchCustomField(id) {
  return dispatch => {
    dispatch(fetchCustomFieldBegin());
    return axios.get(`${BASE_API_URL}/custom_fields/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchCustomFieldSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchCustomFieldFailure(error)));
  };
}

export const fetchCustomFieldClear = () => ({
  type: FETCH_CUSTOM_FIELD_CLEAR
});

export const updateCustomFieldBegin = () => ({
  type: UPDATE_CUSTOM_FIELD_BEGIN
});

export const updateCustomFieldSuccess = (custom_field) => ({
  type: UPDATE_CUSTOM_FIELD_SUCCESS,
  payload: { custom_field }
});

export const updateCustomFieldFailure = error => ({
  type: UPDATE_CUSTOM_FIELD_FAILURE,
  payload: { error }
});

export const updateCustomFieldClear = () => ({
  type: UPDATE_CUSTOM_FIELD_CLEAR
});

export function updateCustomField(id, values) {
  return async (dispatch) => {
    dispatch(updateCustomFieldBegin());
    return axios.put(`${BASE_API_URL}/custom_fields/${id}.json`, 
      JSON.stringify({ custom_field: values }),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateCustomFieldSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateCustomFieldFailure(error.response.data)));
  };
}

export const createCustomFieldBegin = () => ({
  type: CREATE_CUSTOM_FIELD_BEGIN
});

export const createCustomFieldSuccess = (custom_field) => ({
  type: CREATE_CUSTOM_FIELD_SUCCESS,
  payload: { custom_field }
});

export const createCustomFieldFailure = error => ({
  type: CREATE_CUSTOM_FIELD_FAILURE,
  payload: { error }
});

export const createCustomFieldClear = () => ({
  type: CREATE_CUSTOM_FIELD_CLEAR
});

export function createCustomField(values) {
  return dispatch => {
    dispatch(createCustomFieldBegin());
    let custom_field = { custom_field: values };
    return axios.post(`${BASE_API_URL}/custom_fields.json`, 
        JSON.stringify(custom_field),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createCustomFieldSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createCustomFieldFailure(error.response.data))
      });
  };
}

export const deleteCustomFieldBegin = () => ({
  type: DELETE_CUSTOM_FIELD_BEGIN
});

export const deleteCustomFieldSuccess = (customField) => ({
  type: DELETE_CUSTOM_FIELD_SUCCESS,
  payload: { customField }
});

export const deleteCustomFieldFailure = error => ({
  type: DELETE_CUSTOM_FIELD_FAILURE,
  payload: { error }
});

export function deleteCustomField(customField) {
  return async (dispatch) => {
    try {
      dispatch(deleteCustomFieldBegin());
      await axios.delete(`${BASE_API_URL}/custom_fields/${customField.id}.json`);
      dispatch(deleteCustomFieldSuccess(customField));
    } catch (error) {
      dispatch(deleteCustomFieldFailure(error.response.data));
    }
  };
}
