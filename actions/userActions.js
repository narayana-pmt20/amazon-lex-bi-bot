import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_USERS_BEGIN   = 'FETCH_USERS_BEGIN';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const UPDATE_USER_BEGIN   = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const UPDATE_USER_CLEAR   = 'UPDATE_USER_CLEAR';

export const CREATE_USER_BEGIN   = 'CREATE_USER_BEGIN';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const CREATE_USER_CLEAR   = 'CREATE_USER_CLEAR';

export const DELETE_USER_BEGIN   = 'DELETE_USER_BEGIN';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const RESEND_INVITATION_BEGIN   = 'RESEND_INVITATION_BEGIN';
export const RESEND_INVITATION_SUCCESS = 'RESEND_INVITATION_SUCCESS';
export const RESEND_INVITATION_FAILURE = 'RESEND_INVITATION_FAILURE';

export const fetchUsersBegin = () => ({
  type: FETCH_USERS_BEGIN
});

export const fetchUsersSuccess = (users, totalItems) => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users, totalItems }
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error }
});

export function fetchUsers(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchUsersBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[first_name_or_last_name_or_email_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/users.json?page=${page}${sortString}${filterString}${queryString}`)
      .then(json => {
        dispatch(fetchUsersSuccess(json.data.users, json.data.total_entries));
        return json.data.users;
      })
      .catch(error => dispatch(fetchUsersFailure(error)));
  };
}

export const updateUserBegin = () => ({
  type: UPDATE_USER_BEGIN
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user }
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: { error }
});

export const updateUserClear = () => ({
  type: UPDATE_USER_CLEAR
});

export function updateUser(id, values) {
  return dispatch => {
    dispatch(updateUserBegin());
    return axios.put(`${BASE_API_URL}/users/${id}.json`,
      JSON.stringify({user: values}),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(updateUserSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateUserFailure(error.response.data)));
  };
}

export const createUserBegin = () => ({
  type: CREATE_USER_BEGIN
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: { user }
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: { error }
});

export const createUserClear = () => ({
  type: CREATE_USER_CLEAR
});

export function createUser(values) {
  return dispatch => {
    dispatch(createUserBegin());
    return axios.post(`${BASE_API_URL}/users.json`,
      JSON.stringify({ user: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(createUserSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createUserFailure(error.response.data)));
  };
}

export const deleteUserBegin = () => ({
  type: DELETE_USER_BEGIN
});

export const deleteUserSuccess = (user) => ({
  type: DELETE_USER_SUCCESS,
  payload: { user }
});

export const deleteUserFailure = error => ({
  type: DELETE_USER_FAILURE,
  payload: { error }
});

export function deleteUser(id) {
  return dispatch => {
    dispatch(deleteUserBegin());
    return axios.delete(`${BASE_API_URL}/users/${id}.json`)
      .then(json => {
        dispatch(deleteUserSuccess({ id }));
        return json.data;
      })
      .catch(error => dispatch(deleteUserFailure(error.response.data)));
  };
}

export const resendInvitationBegin = () => ({
  type: RESEND_INVITATION_BEGIN
});

export const resendInvitationSuccess = () => ({
  type: RESEND_INVITATION_SUCCESS
});

export const resendInvitationFailure = error => ({
  type: RESEND_INVITATION_FAILURE,
  payload: { error }
});

export function resendInvitation(userId) {
  return dispatch => {
    dispatch(resendInvitationBegin());
    return axios.post(`${BASE_API_URL}/users/${userId}/invitations.json`)
      .then(() => {
        dispatch(resendInvitationSuccess());
        return true;
      })
      .catch(error => {
        dispatch(resendInvitationFailure(error.response.data));
        return false;
      });
  };
} 