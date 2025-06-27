import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_EMAIL_MESSAGE_BEGIN = 'CREATE_EMAIL_MESSAGE_BEGIN';
export const CREATE_EMAIL_MESSAGE_SUCCESS = 'CREATE_EMAIL_MESSAGE_SUCCESS';
export const CREATE_EMAIL_MESSAGE_FAILURE = 'CREATE_EMAIL_MESSAGE_FAILURE';
export const CREATE_EMAIL_MESSAGE_CLEAR = 'CREATE_EMAIL_MESSAGE_CLEAR';

export const FETCH_EMAIL_MESSAGES_BEGIN = 'FETCH_EMAIL_MESSAGES_BEGIN';
export const FETCH_EMAIL_MESSAGES_SUCCESS = 'FETCH_EMAIL_MESSAGES_SUCCESS';
export const FETCH_EMAIL_MESSAGES_FAILURE = 'FETCH_EMAIL_MESSAGES_FAILURE';
export const FETCH_EMAIL_MESSAGES_CLEAR = 'FETCH_EMAIL_MESSAGES_CLEAR';

export const DELETE_EMAIL_MESSAGE_BEGIN = 'DELETE_EMAIL_MESSAGE_BEGIN';
export const DELETE_EMAIL_MESSAGE_SUCCESS = 'DELETE_EMAIL_MESSAGE_SUCCESS';
export const DELETE_EMAIL_MESSAGE_FAILURE = 'DELETE_EMAIL_MESSAGE_FAILURE';
export const DELETE_EMAIL_MESSAGE_CLEAR = 'DELETE_EMAIL_MESSAGE_CLEAR';

export const UPDATE_EMAIL_READ_STATUS_BEGIN = 'UPDATE_EMAIL_READ_STATUS_BEGIN';
export const UPDATE_EMAIL_READ_STATUS_SUCCESS = 'UPDATE_EMAIL_READ_STATUS_SUCCESS';
export const UPDATE_EMAIL_READ_STATUS_FAILURE = 'UPDATE_EMAIL_READ_STATUS_FAILURE';
export const PROCESS_EMAIL_MESSAGE_UPDATE = 'PROCESS_EMAIL_MESSAGE_UPDATE';

export const PROCESS_INCOMING_EMAIL_MESSAGE = 'PROCESS_INCOMING_EMAIL_MESSAGE';

export const createEmailMessageBegin = () => ({
  type: CREATE_EMAIL_MESSAGE_BEGIN,
});

export const createEmailMessageSuccess = (email_message) => ({
  type: CREATE_EMAIL_MESSAGE_SUCCESS,
  payload: { email_message },
});

export const createEmailMessageFailure = (error) => ({
  type: CREATE_EMAIL_MESSAGE_FAILURE,
  payload: { error },
});

export const createEmailMessageClear = () => ({
  type: CREATE_EMAIL_MESSAGE_CLEAR,
});

export function createEmailMessage(values) {
  return (dispatch) => {
    dispatch(createEmailMessageBegin());
    return axios.post(`${BASE_API_URL}/email/messages.json`,
      JSON.stringify({ email_message: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then((json) => {
        dispatch(createEmailMessageSuccess(json.data));
        return json.data;
      })
      .catch((error) => {
        dispatch(createEmailMessageFailure(error.response.data));
      });
  };
}

export const fetchEmailMessagesBegin = () => ({
  type: FETCH_EMAIL_MESSAGES_BEGIN,
});

export const fetchEmailMessagesSuccess = (email_messages, currentPage, totalPages) => ({
  type: FETCH_EMAIL_MESSAGES_SUCCESS,
  payload: { email_messages, currentPage, totalPages },
});

export const fetchEmailMessagesFailure = (error) => ({
  type: FETCH_EMAIL_MESSAGES_FAILURE,
  payload: { error },
});

export const fetchEmailMessagesClear = () => ({
  type: FETCH_EMAIL_MESSAGES_CLEAR,
});

export function fetchEmailMessages(contact, page = 1, perPage = 10) {
  return (dispatch) => {
    dispatch(fetchEmailMessagesBegin());
    return axios.get(`${BASE_API_URL}/email/messages.json`, {
      params: { contact, page, per_page: perPage }
    })
      .then((json) => {
        dispatch(fetchEmailMessagesSuccess(json.data.email_messages, json.data.current_page, json.data.total_pages));
        return json.data;
      })
      .catch((error) => dispatch(fetchEmailMessagesFailure(error)));
  };
}

export const deleteEmailMessageBegin = () => ({
  type: DELETE_EMAIL_MESSAGE_BEGIN,
});

export const deleteEmailMessageSuccess = (externalThreadId, emailMessageId) => ({
  type: DELETE_EMAIL_MESSAGE_SUCCESS,
  payload: { externalThreadId, emailMessageId },
});

export const deleteEmailMessageFailure = (error) => ({
  type: DELETE_EMAIL_MESSAGE_FAILURE,
  payload: { error },
});

export const deleteEmailMessageClear = () => ({
  type: DELETE_EMAIL_MESSAGE_CLEAR,
});

export function deleteEmailMessage(externalThreadId, emailId) {
  return (dispatch) => {
    dispatch(deleteEmailMessageBegin());
    return axios.delete(`${BASE_API_URL}/email/messages/${emailId}.json`)
      .then(() => {
        dispatch(deleteEmailMessageSuccess(externalThreadId, emailId));
      })
      .catch((error) => {
        dispatch(deleteEmailMessageFailure(error.response.data));
      });
  };
}

export const updateEmailReadStatusBegin = () => ({
  type: UPDATE_EMAIL_READ_STATUS_BEGIN,
});

export const updateEmailReadStatusSuccess = (emailMessage) => ({
  type: UPDATE_EMAIL_READ_STATUS_SUCCESS,
  payload: { emailMessage },
});

export const updateEmailReadStatusFailure = (error) => ({
  type: UPDATE_EMAIL_READ_STATUS_FAILURE,
  payload: { error },
});

export const updateEmailReadStatus = (emailMessageId, status) => {
  return (dispatch) => {
    dispatch(updateEmailReadStatusBegin());
    return fetch(`${BASE_API_URL}/email/messages/${emailMessageId}/read_status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_message: { read: status } }),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(updateEmailReadStatusSuccess(json));
        })
      .catch((error) => dispatch(updateEmailReadStatusFailure(error)));
  };
};

export const processIncomingEmailMessage = (emailMessage) => ({
  type: PROCESS_INCOMING_EMAIL_MESSAGE,
  payload: {
    email_message: emailMessage,
  },
});

export const processEmailMessageDelete = (externalThreadId, emailMessageId) => ({
  type: DELETE_EMAIL_MESSAGE_SUCCESS,
  payload: {
    externalThreadId,
    emailMessageId,
    isPusherEvent: true,
  },
});

export const processEmailMessageUpdate = (emailMessage) => ({
  type: PROCESS_EMAIL_MESSAGE_UPDATE,
  payload: {
    emailMessage,
    isPusherEvent: true,
  },
});
