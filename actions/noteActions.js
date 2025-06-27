import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';


export const FETCH_NOTES_BEGIN = 'FETCH_NOTES_BEGIN';
export const FETCH_NOTES_SUCCESS = 'FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'FETCH_NOTES_FAILURE';

export const CREATE_NOTE_BEGIN = 'CREATE_NOTE_BEGIN';
export const CREATE_NOTE_SUCCESS = 'CREATE_NOTE_SUCCESS';
export const CREATE_NOTE_FAILURE = 'CREATE_NOTE_FAILURE';
export const CREATE_NOTE_CLEAR = 'CREATE_NOTE_CLEAR';

export const UPDATE_NOTE_BEGIN = 'UPDATE_NOTE_BEGIN';
export const UPDATE_NOTE_SUCCESS = 'UPDATE_NOTE_SUCCESS';
export const UPDATE_NOTE_FAILURE = 'UPDATE_NOTE_FAILURE';
export const UPDATE_NOTE_CLEAR = 'UPDATE_NOTE_CLEAR';

export const DELETE_NOTE_BEGIN = 'DELETE_NOTE_BEGIN';
export const DELETE_NOTE_SUCCESS = 'DELETE_NOTE_SUCCESS';
export const DELETE_NOTE_FAILURE = 'DELETE_NOTE_FAILURE';
export const DELETE_NOTE_CLEAR = 'DELETE_NOTE_CLEAR';

export const fetchNotesBegin = () => ({
  type: FETCH_NOTES_BEGIN
});

export const fetchNotesSuccess = (notes, totalItems) => ({
  type: FETCH_NOTES_SUCCESS,
  payload: { notes, totalItems }
});

export const fetchNotesFailure = error => ({
  type: FETCH_NOTES_FAILURE,
  payload: { error }
});

export function fetchNotes(contact_id, page = 1, pageSize = 10, query) {
  return dispatch => {
    dispatch(fetchNotesBegin());
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[content_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/contacts/${contact_id}/notes.json?page=${page}&per_page=${pageSize}${queryString}`)
      .then(json => {
        dispatch(fetchNotesSuccess(json.data.notes, json.data.total_entries));

        return json.data.notes;
      })
      .catch(error => dispatch(fetchNotesFailure(error)));
  };
}

export const createNoteBegin = () => ({
  type: CREATE_NOTE_BEGIN
});

export const createNoteSuccess = (note) => ({
  type: CREATE_NOTE_SUCCESS,
  payload: { note }
});

export const createNoteFailure = error => ({
  type: CREATE_NOTE_FAILURE,
  payload: { error }
});

export const createNoteClear = () => ({
  type: CREATE_NOTE_CLEAR
});

export function createNote(contact_id, values) {
  return dispatch => {
    dispatch(createNoteBegin());
    return axios.post(`${BASE_API_URL}/contacts/${contact_id}/notes.json`,
      JSON.stringify({ note: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(createNoteSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createNoteFailure(error.response.data)));
  };
}

export const updateNoteBegin = () => ({
  type: UPDATE_NOTE_BEGIN
});

export const updateNoteSuccess = (note) => ({
  type: UPDATE_NOTE_SUCCESS,
  payload: { note }
});

export const updateNoteFailure = error => ({
  type: UPDATE_NOTE_FAILURE,
  payload: { error }
});

export const updateNoteClear = () => ({
  type: UPDATE_NOTE_CLEAR
});

export function updateNote(contact_id, id, values) {
  return dispatch => {
    dispatch(updateNoteBegin());
    return axios.put(`${BASE_API_URL}/contacts/${contact_id}/notes/${id}.json`,
      JSON.stringify({ note: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateNoteSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateNoteFailure(error))
      });
  };
}

export const deleteNoteBegin = () => ({
  type: DELETE_NOTE_BEGIN
});

export const deleteNoteSuccess = (note) => ({
  type: DELETE_NOTE_SUCCESS,
  payload: { note }
});

export const deleteNoteFailure = error => ({
  type: DELETE_NOTE_FAILURE,
  payload: { error }
});

export const deleteNoteClear = () => ({
  type: DELETE_NOTE_CLEAR
});

export function deleteNote(contact_id, id) {
  return dispatch => {
    dispatch(deleteNoteBegin());
    return axios.delete(`${BASE_API_URL}/contacts/${contact_id}/notes/${id}.json`, {
      })
      .then(json => {
        dispatch(deleteNoteSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(deleteNoteFailure(error)));
  };
}