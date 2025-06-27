import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CONTACT_MESSAGES_BEGIN = 'FETCH_CONTACT_MESSAGES_BEGIN';
export const FETCH_CONTACT_MESSAGES_SUCCESS = 'FETCH_CONTACT_MESSAGES_SUCCESS';
export const FETCH_CONTACT_MESSAGES_FAILURE = 'FETCH_CONTACT_MESSAGES_FAILURE';
export const FETCH_CONTACT_MESSAGES_CLEAR = 'FETCH_CONTACT_MESSAGES_CLEAR';

export const fetchContactMessagesBegin = () => ({
  type: FETCH_CONTACT_MESSAGES_BEGIN,
});

export const fetchContactMessagesSuccess = (messages, currentPage, totalPages) => ({
  type: FETCH_CONTACT_MESSAGES_SUCCESS,
  payload: { messages, currentPage, totalPages },
});

export const fetchContactMessagesFailure = (error) => ({
  type: FETCH_CONTACT_MESSAGES_FAILURE,
  payload: { error },
});


export const fetchContactMessagesClear = () => ({
  type: FETCH_CONTACT_MESSAGES_CLEAR,
});

export function fetchContactMessages(contactId, page = 1, perPage = 20) {
  return (dispatch) => {
    dispatch(fetchContactMessagesBegin());
    return axios
      .get(`${BASE_API_URL}/contacts/${contactId}/contact_messages`, {
        params: { contact_id: contactId, page, per_page: perPage },
        headers: { Accept: 'application/json'},
      })
      .then((response) => {
        const { messages, current_page, total_pages } = response.data;
        console.log(response.data)
        dispatch(fetchContactMessagesSuccess(messages, current_page, total_pages));
      })
      .catch((error) => {
        dispatch(fetchContactMessagesFailure(error.response.data));
      });
  };
}