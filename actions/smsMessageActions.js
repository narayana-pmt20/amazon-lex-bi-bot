import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_SMS_MESSAGE_BEGIN = 'CREATE_SMS_MESSAGE_BEGIN';
export const CREATE_SMS_MESSAGE_SUCCESS = 'CREATE_SMS_MESSAGE_SUCCESS';
export const CREATE_SMS_MESSAGE_FAILURE = 'CREATE_SMS_MESSAGE_FAILURE';
export const CREATE_SMS_MESSAGE_CLEAR = 'CREATE_SMS_MESSAGE_CLEAR';

export const UPDATE_SMS_MESSAGE_BEGIN = 'UPDATE_SMS_MESSAGE_BEGIN';
export const UPDATE_SMS_MESSAGE_SUCCESS = 'UPDATE_SMS_MESSAGE_SUCCESS';
export const UPDATE_SMS_MESSAGE_FAILURE = 'UPDATE_SMS_MESSAGE_FAILURE';
export const UPDATE_SMS_MESSAGE_CLEAR = 'UPDATE_SMS_MESSAGE_CLEAR';

export const DELETE_SMS_MESSAGE_BEGIN = 'DELETE_SMS_MESSAGE_BEGIN';
export const DELETE_SMS_MESSAGE_SUCCESS = 'DELETE_SMS_MESSAGE_SUCCESS';
export const DELETE_SMS_MESSAGE_FAILURE = 'DELETE_SMS_MESSAGE_FAILURE';
export const DELETE_SMS_MESSAGE_CLEAR = 'DELETE_SMS_MESSAGE_CLEAR';

export const PROCESS_INCOMING_SMS_MESSAGE = 'PROCESS_INCOMING_SMS_MESSAGE';

export const UPDATE_MESSAGE_STATE = 'UPDATE_MESSAGE_STATE';

export const createSmsMessageBegin = () => ({
  type: CREATE_SMS_MESSAGE_BEGIN,
});

export const createSmsMessageSuccess = (sms_message) => ({
  type: CREATE_SMS_MESSAGE_SUCCESS,
  payload: { sms_message },
});

export const createSmsMessageFailure = (error) => ({
  type: CREATE_SMS_MESSAGE_FAILURE,
  payload: { error },
});

export const createSmsMessageClear = () => ({
  type: CREATE_SMS_MESSAGE_CLEAR,
});

export function createSmsMessage(values) {
  return (dispatch) => {
    dispatch(createSmsMessageBegin());

    return axios.post(
      `${BASE_API_URL}/sms_messages`,
      JSON.stringify({ contact_id: values.contact_id, message: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((response) => {
      const smsMessage = response.data;
        dispatch(createSmsMessageSuccess(smsMessage));
    })
    .catch((error) => {
      dispatch(createSmsMessageFailure(error.response?.data));
    });
  };
}

export const updateSmsMessageBegin = () => ({
  type: UPDATE_SMS_MESSAGE_BEGIN,
});

export const updateSmsMessageSuccess = (sms_message) => ({
  type: UPDATE_SMS_MESSAGE_SUCCESS,
  payload: { sms_message },
});

export const updateSmsMessageFailure = (error) => ({
  type: UPDATE_SMS_MESSAGE_FAILURE,
  payload: { error },
});

export const updateSmsMessageClear = () => ({
  type: UPDATE_SMS_MESSAGE_CLEAR,
});

export function updateSmsMessage(id, values) {
  return (dispatch) => {
    dispatch(updateSmsMessageBegin());

    return axios.put(
      `${BASE_API_URL}/sms_messages/${id}.json`,
      JSON.stringify({ contact_id: values.contact_id, message: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((response) => {
      const smsMessage = response.data;
        dispatch(updateSmsMessageSuccess(smsMessage));
    })
    .catch((error) => {
      dispatch(updateSmsMessageFailure(error.response?.data));
    });
  };
}

export const deleteSmsMessageBegin = () => ({
  type: DELETE_SMS_MESSAGE_BEGIN,
});

export const deleteSmsMessageSuccess = (smsMessageId) => ({
  type: DELETE_SMS_MESSAGE_SUCCESS,
  payload: { smsMessageId },
});

export const deleteSmsMessageFailure = (error) => ({
  type: DELETE_SMS_MESSAGE_FAILURE,
  payload: { error },
});

export const deleteSmsMessageClear = () => ({
  type: DELETE_SMS_MESSAGE_CLEAR,
});

export function deleteSmsMessage(smsMessageId) {
  return (dispatch) => {
    dispatch(deleteSmsMessageBegin());
    
    return axios.delete(`${BASE_API_URL}/sms_messages/${smsMessageId}`)
      .then(() => {
        dispatch(deleteSmsMessageSuccess(smsMessageId));
        
        dispatch({
          type: DELETE_SMS_MESSAGE_SUCCESS,
          payload: { smsMessageId },
        });

      })
      .catch((error) => {
        dispatch(deleteSmsMessageFailure(error.response.data));
      });
  };
}

export const processIncomingSmsMessage = (incomingSmsMessage) => ({
  type: PROCESS_INCOMING_SMS_MESSAGE,
  payload: { incomingSmsMessage },
});

export const updateMessageState = (messageUpdate) => ({
  type: UPDATE_MESSAGE_STATE,
  payload: { messageUpdate },
});