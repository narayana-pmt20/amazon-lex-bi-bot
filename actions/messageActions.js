import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_MESSAGES_BEGIN = 'FETCH_MESSAGES_BEGIN';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';
export const FETCH_MESSAGES_CLEAR = 'FETCH_MESSAGES_CLEAR';

export const CREATE_MESSAGE_BEGIN = 'CREATE_MESSAGE_BEGIN';
export const CREATE_MESSAGE_SUCCESS = 'CREATE_MESSAGE_SUCCESS';
export const CREATE_MESSAGE_FAILURE = 'CREATE_MESSAGE_FAILURE';
export const CREATE_MESSAGE_CLEAR = 'CREATE_MESSAGE_CLEAR';

export const fetchMessagesBegin = () => ({
  type: FETCH_MESSAGES_BEGIN
});

export const fetchMessagesClear = () => ({
  type: FETCH_MESSAGES_CLEAR
});

export const fetchMessagesSuccess = (messages, record) => ({
  type: FETCH_MESSAGES_SUCCESS,
  payload: { messages, record }
});

export const fetchMessagesFailure = error => ({
  type: FETCH_MESSAGES_FAILURE,
  payload: { error }
});

export function fetchMessages(id, type) {
  return dispatch => {
    dispatch(fetchMessagesBegin());
    return axios.get(`${BASE_API_URL}/messages.json?container_id=${id}&container_type=${type}`)
      .then(json => {
        dispatch(fetchMessagesSuccess(json.data.messages, json.data.record));
        return json.data.messages;
      })
      .catch(error => dispatch(fetchMessagesFailure(error)));
  };
}

export const createMessageBegin = () => ({
  type: CREATE_MESSAGE_BEGIN
});

export const createMessageSuccess = (message) => ({
  type: CREATE_MESSAGE_SUCCESS,
  payload: { message }
});

export const createMessageFailure = error => ({
  type: CREATE_MESSAGE_FAILURE,
  payload: { error }
});

export const createMessageClear = () => ({
  type: CREATE_MESSAGE_CLEAR
});

export function createMessage(containerId, containerType, value) {
  return dispatch => {
    dispatch(createMessageBegin());
    return axios.post(`${BASE_API_URL}/messages.json?container_id=${containerId}&container_type=${containerType}`,
      JSON.stringify({ message: value }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(createMessageSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createMessageFailure(error.response.data)));
  };
}