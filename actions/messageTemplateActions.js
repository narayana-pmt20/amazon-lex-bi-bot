import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_TEMPLATES_BEGIN   = 'FETCH_TEMPLATES_BEGIN';
export const FETCH_TEMPLATES_SUCCESS = 'FETCH_TEMPLATES_SUCCESS';
export const FETCH_TEMPLATES_FAILURE = 'FETCH_TEMPLATES_FAILURE';

export const FETCH_TEMPLATE_BEGIN   = 'FETCH_TEMPLATE_BEGIN';
export const FETCH_TEMPLATE_SUCCESS = 'FETCH_TEMPLATE_SUCCESS';
export const FETCH_TEMPLATE_FAILURE = 'FETCH_TEMPLATE_FAILURE';

export const UPDATE_TEMPLATE_BEGIN = 'UPDATE_TEMPLATE_BEGIN';
export const UPDATE_TEMPLATE_SUCCESS = 'UPDATE_TEMPLATE_SUCCESS';
export const UPDATE_TEMPLATE_FAILURE = 'UPDATE_TEMPLATE_FAILURE';
export const UPDATE_TEMPLATE_CLEAR = 'UPDATE_TEMPLATE_CLEAR';

export const CREATE_TEMPLATE_BEGIN   = 'CREATE_TEMPLATE_BEGIN';
export const CREATE_TEMPLATE_SUCCESS = 'CREATE_TEMPLATE_SUCCESS';
export const CREATE_TEMPLATE_FAILURE = 'CREATE_TEMPLATE_FAILURE';
export const CREATE_TEMPLATE_CLEAR = 'CREATE_TEMPLATE_CLEAR';

export const DELETE_TEMPLATE_BEGIN   = 'DELETE_TEMPLATE_BEGIN';
export const DELETE_TEMPLATE_SUCCESS = 'DELETE_TEMPLATE_SUCCESS';
export const DELETE_TEMPLATE_FAILURE = 'DELETE_TEMPLATE_FAILURE';

export const COPY_TEMPLATE_BEGIN   = 'COPY_TEMPLATE_BEGIN';
export const COPY_TEMPLATE_SUCCESS = 'COPY_TEMPLATE_SUCCESS';
export const COPY_TEMPLATE_FAILURE = 'COPY_TEMPLATE_FAILURE';
export const COPY_TEMPLATE_CLEAR = 'COPY_TEMPLATE_CLEAR';

export const SEND_TEST_EMAIL_BEGIN   = 'SEND_TEST_EMAIL_BEGIN';
export const SEND_TEST_EMAIL_SUCCESS = 'SEND_TEST_EMAIL_SUCCESS';
export const SEND_TEST_EMAIL_FAILURE = 'SEND_TEST_EMAIL_FAILURE';
export const SEND_TEST_EMAIL_CLEAR = 'SEND_TEST_EMAIL_CLEAR';

export const fetchTemplatesBegin = () => ({
  type: FETCH_TEMPLATES_BEGIN
});

export const fetchTemplatesSuccess = (message_templates, totalItems) => ({
  type: FETCH_TEMPLATES_SUCCESS,
  payload: { message_templates, totalItems }
});

export const fetchTemplatesFailure = error => ({
  type: FETCH_TEMPLATES_FAILURE,
  payload: { error }
});

export function fetchTemplates(page = 1, query='') {
  return async (dispatch) => {
    dispatch(fetchTemplatesBegin());

    const queryString = query ? `&q[name_or_subject_cont]=${query}` : '';

    try {
      const response = await axios.get(`${BASE_API_URL}/message_templates.json?page=${page}${queryString}`);
      dispatch(fetchTemplatesSuccess(response.data.message_templates, response.data.total_entries));
      return response.data.message_templates;
    } catch (error) {
      dispatch(fetchTemplatesFailure(error.response.data));
    }
  };
}

export const updateTemplateBegin = () => ({
  type: UPDATE_TEMPLATE_BEGIN
});

export const updateTemplateSuccess = (note) => ({
  type: UPDATE_TEMPLATE_SUCCESS,
  payload: { note }
});

export const updateTemplateFailure = error => ({
  type: UPDATE_TEMPLATE_FAILURE,
  payload: { error }
});

export const updateTemplateClear = () => ({
  type: UPDATE_TEMPLATE_CLEAR
});

export function updateTemplate(id, values) {
  return async (dispatch) => {
    dispatch(updateTemplateBegin());
    try {
      const response = await axios.put(
        `${BASE_API_URL}/message_templates/${id}.json`,
        JSON.stringify({ message_template: values }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      dispatch(updateTemplateSuccess(response.data));
      return response.data;
    } catch (error) {
      console.log('Got error', error.response.data);
      dispatch(updateTemplateFailure(error.response.data));
    }
  };
}

export const copyTemplateBegin = () => ({
  type: COPY_TEMPLATE_BEGIN
});

export const copyTemplateSuccess = (template) => ({
  type: COPY_TEMPLATE_SUCCESS,
  payload: { template }
});

export const copyTemplateFailure = error => ({
  type: COPY_TEMPLATE_FAILURE,
  payload: { error }
});

export function copyTemplate(template) {
  return async (dispatch) => {
    dispatch(copyTemplateBegin());
    try {
      const response = await axios.post(`${BASE_API_URL}/message_templates/${template.id}/copy.json`);
      dispatch(copyTemplateSuccess(response.data));
      return response.data;
    }
    catch (error) {
      dispatch(copyTemplateFailure(error.response.data));
    }
  }
}


export const sendTestEmailBegin = () => ({
  type: SEND_TEST_EMAIL_BEGIN
});

export const sendTestEmailSuccess = (template) => ({
  type: SEND_TEST_EMAIL_SUCCESS,
  payload: { template }
});

export const sendTestEmailFailure = error => ({
  type: SEND_TEST_EMAIL_FAILURE,
  payload: { error }
});

export const sendTestEmailClear = () => ({
  type: SEND_TEST_EMAIL_CLEAR
});

export function sendTestEmail(data) {
  return async (dispatch) => {
    dispatch(sendTestEmailBegin());
    try {
      const response = await axios.post(`${BASE_API_URL}/message_template_previews.json`, data);
      dispatch(sendTestEmailSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(sendTestEmailFailure(error.response.data));
    }
  };
}

export const createTemplateBegin = () => ({
  type: CREATE_TEMPLATE_BEGIN
});

export const createTemplateSuccess = (template) => ({
  type: CREATE_TEMPLATE_SUCCESS,
  payload: { template }
});

export const createTemplateFailure = error => ({
  type: CREATE_TEMPLATE_FAILURE,
  payload: { error }
});

export const createTemplateClear = () => ({
  type: CREATE_TEMPLATE_CLEAR
});

export function createTemplate(data) {
  return async (dispatch) => {
    dispatch(createTemplateBegin());
    try {
      const response = await axios.post(`${BASE_API_URL}/message_templates.json`, data);
      dispatch(createTemplateSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(createTemplateFailure(error.response.data));
    }
  };
}

export const fetchTemplateBegin = () => ({
  type: FETCH_TEMPLATE_BEGIN
});

export const fetchTemplateSuccess = (template) => ({
  type: FETCH_TEMPLATE_SUCCESS,
  payload: { template }
});

export const fetchTemplateFailure = error => ({
  type: FETCH_TEMPLATE_FAILURE,
  payload: { error }
});

export function fetchTemplate(id) {
  return async (dispatch) => {
    dispatch(fetchTemplateBegin());
    try {
      const response = await axios.get(`${BASE_API_URL}/message_templates/${id}.json`);
      dispatch(fetchTemplateSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(fetchTemplateFailure(error.response.data));
    }
  };
}

export const deleteTemplateBegin = () => ({
  type: DELETE_TEMPLATE_BEGIN
});

export const deleteTemplateSuccess = (template) => ({
  type: DELETE_TEMPLATE_SUCCESS,
  payload: { template }
});

export const deleteTemplateFailure = error => ({
  type: DELETE_TEMPLATE_FAILURE,
  payload: { error }
});

export function deleteTemplate(template) {
  return async (dispatch) => {
    try {
      dispatch(deleteTemplateBegin());
      await axios.delete(`${BASE_API_URL}/message_templates/${template.id}.json`);
      dispatch(deleteTemplateSuccess(template));
    } catch (error) {
      dispatch(deleteTemplateFailure(error.response.data));
    }
  };
}
