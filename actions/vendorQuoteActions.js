import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_VENDOR_QUOTE_BEGIN = 'CREATE_VENDOR_QUOTE_BEGIN';
export const CREATE_VENDOR_QUOTE_SUCCESS = 'CREATE_VENDOR_QUOTE_SUCCESS';
export const CREATE_VENDOR_QUOTE_FAILURE = 'CREATE_VENDOR_QUOTE_FAILURE';
export const CREATE_VENDOR_QUOTE_CLEAR = 'CREATE_VENDOR_QUOTE_CLEAR';
export const CANCEL_VENDOR_QUOTE_BEGIN = 'CANCEL_VENDOR_QUOTE_BEGIN';
export const CANCEL_VENDOR_QUOTE_SUCCESS = 'CANCEL_VENDOR_QUOTE_SUCCESS';
export const CANCEL_VENDOR_QUOTE_FAILURE = 'CANCEL_VENDOR_QUOTE_FAILURE';
export const CANCEL_VENDOR_QUOTE_CLEAR = 'CANCEL_VENDOR_QUOTE_CLEAR';

export const createQuoteBegin = () => ({
  type: CREATE_VENDOR_QUOTE_BEGIN
});

export const createQuoteSuccess = (quote) => ({
  type: CREATE_VENDOR_QUOTE_SUCCESS,
  payload: { quote }
});

export const createQuoteFailure = error => ({
  type: CREATE_VENDOR_QUOTE_FAILURE,
  payload: { error }
});

export const createQuoteClear = () => ({
  type: CREATE_VENDOR_QUOTE_CLEAR
});

export const cancelQuoteBegin = () => ({
  type: CANCEL_VENDOR_QUOTE_BEGIN
});

export const cancelQuoteSuccess = (quote) => ({
  type: CANCEL_VENDOR_QUOTE_SUCCESS,
  payload: { quote }
});

export const cancelQuoteFailure = error => ({
  type: CANCEL_VENDOR_QUOTE_FAILURE,
  payload: { error }
});

export const cancelQuoteClear = () => ({
  type: CANCEL_VENDOR_QUOTE_CLEAR
});

export function createQuote(values) {
  return dispatch => {
    dispatch(createQuoteBegin());
    return axios.post(`${BASE_API_URL}/contact_vendor_quotes.json`,
      JSON.stringify({ quote: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createQuoteSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createQuoteFailure(error.response.data))
      });
  };
}

export function cancelQuote(id) {
  return dispatch => {
    dispatch(cancelQuoteBegin());
    return axios.delete(`${BASE_API_URL}/contact_vendor_quotes/${id}`, 
    {
      headers: { 'Content-Type': 'application/json', 'Accept': '*/*' }
    })
      .then(json => {
        dispatch(cancelQuoteSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(cancelQuoteFailure(error.response.data))
      });
  };
}
