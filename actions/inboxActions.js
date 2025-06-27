import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_INBOX_BEGIN = 'FETCH_INBOX_BEGIN';
export const FETCH_INBOX_SUCCESS = 'FETCH_INBOX_SUCCESS';
export const FETCH_INBOX_FAILURE = 'FETCH_INBOX_FAILURE';
export const FETCH_INBOX_CLEAR = 'FETCH_INBOX_CLEAR';

export const fetchInboxBegin = () => ({
  type: FETCH_INBOX_BEGIN
});

export const fetchInboxClear = () => ({
  type: FETCH_INBOX_CLEAR
});

export const fetchInboxSuccess = (threads, vendors, totalItems) => ({
  type: FETCH_INBOX_SUCCESS,
  payload: { threads, vendors, totalItems }
});

export const fetchInboxFailure = error => ({
  type: FETCH_INBOX_FAILURE,
  payload: { error }
});

export function fetchInbox(page = 1, pageSize = 10, query = null) {
  let queryString = '';
  if (query) {
    queryString =
      `&q[container_of_VendorQuote_type_messages_message_or_container_of_VendorOrder_type_messages_message_or_container_of_VendorConversation_type_messages_message_cont]=${query}`
  }
  return dispatch => {
    dispatch(fetchInboxBegin());
    return axios.get(`${BASE_API_URL}/inbox.json?page=${page}&per_page=${pageSize}${queryString}`)
      .then(json => {
        dispatch(fetchInboxSuccess(json.data.threads, json.data.vendors, json.data.total_entries));
        return json.data;
      })
      .catch(error => dispatch(fetchInboxFailure(error)));
  };
} 

export const MARK_UNREAD_BEGIN = 'MARK_UNREAD_BEGIN';
export const MARK_UNREAD_SUCCESS = 'MARK_UNREAD_SUCCESS';
export const MARK_UNREAD_FAILURE = 'MARK_UNREAD_FAILURE';
export const MARK_UNREAD_CLEAR = 'MARK_UNREAD_CLEAR';

export const markUnreadBegin = () => ({
  type: MARK_UNREAD_BEGIN
});

export const markUnreadClear = () => ({
  type: MARK_UNREAD_CLEAR
});

export const markUnreadSuccess = (messages) => ({
  type: MARK_UNREAD_SUCCESS,
  payload: { messages }
});

export const markUnreadFailure = error => ({
  type: MARK_UNREAD_FAILURE,
  payload: { error }
});

export function markUnread(containerId, containerType) {

  return dispatch => {
    dispatch(markUnreadBegin());
    return axios.put(`${BASE_API_URL}/messages/mark_as_unread.json?container_id=${containerId}&container_type=${containerType}`,
      null,
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(markUnreadSuccess(json.data.messages));
        return json.data;
      })
      .catch(error => dispatch(markUnreadFailure(error.response.data)));
  };
}