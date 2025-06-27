import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CONTACT_DOCUMENTS_BEGIN   = 'FETCH_CONTACT_DOCUMENTS_BEGIN';
export const FETCH_CONTACT_DOCUMENTS_SUCCESS = 'FETCH_CONTACT_DOCUMENTS_SUCCESS';
export const FETCH_CONTACT_DOCUMENTS_FAILURE = 'FETCH_CONTACT_DOCUMENTS_FAILURE';

export const FETCH_CONTACT_DOCUMENT_BEGIN   = 'FETCH_CONTACT_DOCUMENT_BEGIN';
export const FETCH_CONTACT_DOCUMENT_SUCCESS = 'FETCH_CONTACT_DOCUMENT_SUCCESS';
export const FETCH_CONTACT_DOCUMENT_FAILURE = 'FETCH_CONTACT_DOCUMENT_FAILURE';

export const CREATE_CONTACT_DOCUMENT_BEGIN   = 'CREATE_CONTACT_DOCUMENT_BEGIN';
export const CREATE_CONTACT_DOCUMENT_SUCCESS = 'CREATE_CONTACT_DOCUMENT_SUCCESS';
export const CREATE_CONTACT_DOCUMENT_FAILURE = 'CREATE_CONTACT_DOCUMENT_FAILURE';
export const CREATE_CONTACT_DOCUMENT_CLEAR   = 'CREATE_CONTACT_DOCUMENT_CLEAR';

export const UPDATE_CONTACT_DOCUMENT_BEGIN   = 'UPDATE_CONTACT_DOCUMENT_BEGIN';
export const UPDATE_CONTACT_DOCUMENT_SUCCESS = 'UPDATE_CONTACT_DOCUMENT_SUCCESS';
export const UPDATE_CONTACT_DOCUMENT_FAILURE = 'UPDATE_CONTACT_DOCUMENT_FAILURE';
export const UPDATE_CONTACT_DOCUMENT_CLEAR   = 'UPDATE_CONTACT_DOCUMENT_CLEAR';

export const DELETE_CONTACT_DOCUMENT_BEGIN   = 'DELETE_CONTACT_DOCUMENT_BEGIN';
export const DELETE_CONTACT_DOCUMENT_SUCCESS = 'DELETE_CONTACT_DOCUMENT_SUCCESS';
export const DELETE_CONTACT_DOCUMENT_FAILURE = 'DELETE_CONTACT_DOCUMENT_FAILURE';

// Fetch Documents
export const fetchContactDocumentsBegin = () => ({
  type: FETCH_CONTACT_DOCUMENTS_BEGIN
});

export const fetchContactDocumentsSuccess = (documents, totalItems) => ({
  type: FETCH_CONTACT_DOCUMENTS_SUCCESS,
  payload: { documents, totalItems }
});

export const fetchContactDocumentsFailure = error => ({
  type: FETCH_CONTACT_DOCUMENTS_FAILURE,
  payload: { error }
});

export function fetchContactDocuments(contactId, page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchContactDocumentsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[file_blob_filename_or_description_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/contacts/${contactId}/documents.json?page=${page}${sortString}${filterString}${queryString}`)
      .then(json => {
        dispatch(fetchContactDocumentsSuccess(json.data.documents, json.data.total_entries));
        return json.data.documents;
      })
      .catch(error => dispatch(fetchContactDocumentsFailure(error)));
  };
}

// Fetch Single Document
export const fetchContactDocumentBegin = () => ({
  type: FETCH_CONTACT_DOCUMENT_BEGIN
});

export const fetchContactDocumentSuccess = (document) => ({
  type: FETCH_CONTACT_DOCUMENT_SUCCESS,
  payload: { document }
});

export const fetchContactDocumentFailure = error => ({
  type: FETCH_CONTACT_DOCUMENT_FAILURE,
  payload: { error }
});

export function fetchContactDocument(contactId, id) {
  return dispatch => {
    dispatch(fetchContactDocumentBegin());
    return axios.get(`${BASE_API_URL}/contacts/${contactId}/documents/${id}.json`)
      .then(json => {
        dispatch(fetchContactDocumentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchContactDocumentFailure(error)));
  };
}

// Create Document
export const createContactDocumentBegin = () => ({
  type: CREATE_CONTACT_DOCUMENT_BEGIN
});

export const createContactDocumentSuccess = (document) => ({
  type: CREATE_CONTACT_DOCUMENT_SUCCESS,
  payload: { document }
});

export const createContactDocumentFailure = error => ({
  type: CREATE_CONTACT_DOCUMENT_FAILURE,
  payload: { error }
});

export const createContactDocumentClear = () => ({
  type: CREATE_CONTACT_DOCUMENT_CLEAR
});

export function createContactDocument(contactId, data) {
  return dispatch => {
    dispatch(createContactDocumentBegin());
    return axios.post(`${BASE_API_URL}/contacts/${contactId}/documents.json`, data)
      .then(json => {
        dispatch(createContactDocumentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createContactDocumentFailure(error.response.data)));
  };
}

// Update Document
export const updateContactDocumentBegin = () => ({
  type: UPDATE_CONTACT_DOCUMENT_BEGIN
});

export const updateContactDocumentSuccess = (document) => ({
  type: UPDATE_CONTACT_DOCUMENT_SUCCESS,
  payload: { document }
});

export const updateContactDocumentFailure = error => ({
  type: UPDATE_CONTACT_DOCUMENT_FAILURE,
  payload: { error }
});

export function updateContactDocument(contactId, id, data) {
  return dispatch => {
    dispatch(updateContactDocumentBegin());
    const document = { document: data };
    return axios.put(`${BASE_API_URL}/contacts/${contactId}/documents/${id}.json`, document)
      .then(json => {
        dispatch(updateContactDocumentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateContactDocumentFailure(error.response.data)));
  };
}

export const updateContactDocumentClear = () => ({
  type: UPDATE_CONTACT_DOCUMENT_CLEAR
});

// Delete Document
export const deleteContactDocumentBegin = () => ({
  type: DELETE_CONTACT_DOCUMENT_BEGIN
});

export const deleteContactDocumentSuccess = (document) => ({
  type: DELETE_CONTACT_DOCUMENT_SUCCESS,
  payload: { document }
});

export const deleteContactDocumentFailure = error => ({
  type: DELETE_CONTACT_DOCUMENT_FAILURE,
  payload: { error }
});

export function deleteContactDocument(contactId, document) {
  return async (dispatch) => {
    dispatch(deleteContactDocumentBegin());
    await axios.delete(`${BASE_API_URL}/contacts/${contactId}/documents/${document.id}.json`)
      .then(json => {
        dispatch(deleteContactDocumentSuccess(document));
        return document;
      })
      .catch(error => dispatch(deleteContactDocumentFailure(error)));
    dispatch(fetchContactDocuments(contactId));
  };
} 