import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_DOCUMENTS_BEGIN   = 'FETCH_DOCUMENTS_BEGIN';
export const FETCH_DOCUMENTS_SUCCESS = 'FETCH_DOCUMENTS_SUCCESS';
export const FETCH_DOCUMENTS_FAILURE = 'FETCH_DOCUMENTS_FAILURE';

export const FETCH_DOCUMENT_BEGIN   = 'FETCH_DOCUMENT_BEGIN';
export const FETCH_DOCUMENT_SUCCESS = 'FETCH_DOCUMENT_SUCCESS';
export const FETCH_DOCUMENT_FAILURE = 'FETCH_DOCUMENT_FAILURE';

export const CREATE_DOCUMENT_BEGIN   = 'CREATE_DOCUMENT_BEGIN';
export const CREATE_DOCUMENT_SUCCESS = 'CREATE_DOCUMENT_SUCCESS';
export const CREATE_DOCUMENT_FAILURE = 'CREATE_DOCUMENT_FAILURE';
export const CREATE_DOCUMENT_CLEAR = 'CREATE_DOCUMENT_CLEAR';

export const DELETE_DOCUMENT_BEGIN   = 'DELETE_DOCUMENT_BEGIN';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAILURE = 'DELETE_DOCUMENT_FAILURE';

export const fetchDocumentsBegin = () => ({
  type: FETCH_DOCUMENTS_BEGIN
});

export const fetchDocumentsSuccess = (documents, totalItems) => ({
  type: FETCH_DOCUMENTS_SUCCESS,
  payload: { documents, totalItems }
});

export const fetchDocumentsFailure = error => ({
  type: FETCH_DOCUMENTS_FAILURE,
  payload: { error }
});

export function fetchDocuments(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchDocumentsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[file_blob_filename_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/documents.json?page=${page}${sortString}${filterString}${queryString}`, {
      })
      .then(json => {
        dispatch(fetchDocumentsSuccess(json.data.documents, json.data.total_entries));
        return json.data.documents;
      })
      .catch(error => dispatch(fetchDocumentsFailure(error)));
  };
}

export const createDocumentBegin = () => ({
  type: CREATE_DOCUMENT_BEGIN
});

export const createDocumentSuccess = (document) => ({
  type: CREATE_DOCUMENT_SUCCESS,
  payload: { document }
});

export const createDocumentFailure = error => ({
  type: CREATE_DOCUMENT_FAILURE,
  payload: { error }
});

export const createDocumentClear = () => ({
  type: CREATE_DOCUMENT_CLEAR
});

export function createDocument(data) {
  return dispatch => {
    dispatch(createDocumentBegin());
    return axios.post(`${BASE_API_URL}/documents.json`, 
        data,
      )
      .then(json => {
        dispatch(createDocumentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createDocumentFailure(error.response.data)));
  };
}

export const fetchDocumentBegin = () => ({
  type: FETCH_DOCUMENT_BEGIN
});

export const fetchDocumentSuccess = (document) => ({
  type: FETCH_DOCUMENT_SUCCESS,
  payload: { document }
});

export const fetchDocumentFailure = error => ({
  type: FETCH_DOCUMENT_FAILURE,
  payload: { error }
});

export function fetchDocument(id) {
  return dispatch => {
    dispatch(fetchDocumentBegin());
    return axios.get(`${BASE_API_URL}/documents/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchDocumentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchDocumentFailure(error.response.data)));
  };
}

export async function fetchDocumentUrl(id) {
  let json = await axios.get(`${BASE_API_URL}/documents/${id}.json`, {
  })
  return json.data.url;
}

export const deleteDocumentBegin = () => ({
  type: DELETE_DOCUMENT_BEGIN
});

export const deleteDocumentSuccess = (document) => ({
  type: DELETE_DOCUMENT_SUCCESS,
  payload: { document }
});

export const deleteDocumentFailure = error => ({
  type: DELETE_DOCUMENT_FAILURE,
  payload: { error }
});

export function deleteDocument(document) {
  return async (dispatch) => {
    dispatch(deleteDocumentBegin());
    await axios.delete(`${BASE_API_URL}/documents/${document.id}.json`, {
      })
      .then(json => {
        dispatch(deleteDocumentSuccess(document));
        return document;
      })
      .catch(error => dispatch(deleteDocumentFailure(error)));
    dispatch(fetchDocuments());
  };
}

