import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_PAYOUT_ACCOUNT_BEGIN = 'FETCH_PAYOUT_ACCOUNT_BEGIN';
export const FETCH_PAYOUT_ACCOUNT_SUCCESS = 'FETCH_PAYOUT_ACCOUNT_SUCCESS';
export const FETCH_PAYOUT_ACCOUNT_FAILURE = 'FETCH_PAYOUT_ACCOUNT_FAILURE';

export const CREATE_PAYOUT_ACCOUNT_BEGIN = 'CREATE_PAYOUT_ACCOUNT_BEGIN';
export const CREATE_PAYOUT_ACCOUNT_SUCCESS = 'CREATE_PAYOUT_ACCOUNT_SUCCESS';
export const CREATE_PAYOUT_ACCOUNT_FAILURE = 'CREATE_PAYOUT_ACCOUNT_FAILURE';
export const CREATE_PAYOUT_ACCOUNT_CLEAR = 'CREATE_PAYOUT_ACCOUNT_CLEAR';

export const DELETE_PAYOUT_ACCOUNT_BEGIN = 'DELETE_PAYOUT_ACCOUNT_BEGIN';
export const DELETE_PAYOUT_ACCOUNT_SUCCESS = 'DELETE_PAYOUT_ACCOUNT_SUCCESS';
export const DELETE_PAYOUT_ACCOUNT_FAILURE = 'DELETE_PAYOUT_ACCOUNT_FAILURE';
export const DELETE_PAYOUT_ACCOUNT_CLEAR = 'DELETE_PAYOUT_ACCOUNT_CLEAR';

export const UPDATE_PAYOUT_ACCOUNT_BEGIN = 'UPDATE_PAYOUT_ACCOUNT_BEGIN';
export const UPDATE_PAYOUT_ACCOUNT_SUCCESS = 'UPDATE_PAYOUT_ACCOUNT_SUCCESS';
export const UPDATE_PAYOUT_ACCOUNT_FAILURE = 'UPDATE_PAYOUT_ACCOUNT_FAILURE';
export const UPDATE_PAYOUT_ACCOUNT_CLEAR = 'UPDATE_PAYOUT_ACCOUNT_CLEAR';

export const VERIFY_PAYOUT_ACCOUNT_BEGIN = 'VERIFY_PAYOUT_ACCOUNT_BEGIN';
export const VERIFY_PAYOUT_ACCOUNT_SUCCESS = 'VERIFY_PAYOUT_ACCOUNT_SUCCESS';
export const VERIFY_PAYOUT_ACCOUNT_FAILURE = 'VERIFY_PAYOUT_ACCOUNT_FAILURE';
export const VERIFY_PAYOUT_ACCOUNT_CLEAR = 'VERIFY_PAYOUT_ACCOUNT_CLEAR';

export const UPDATE_PAYOUT_ENTITY_BEGIN = 'UPDATE_PAYOUT_ENTITY_BEGIN';
export const UPDATE_PAYOUT_ENTITY_SUCCESS = 'UPDATE_PAYOUT_ENTITY_SUCCESS';
export const UPDATE_PAYOUT_ENTITY_FAILURE = 'UPDATE_PAYOUT_ENTITY_FAILURE';
export const UPDATE_PAYOUT_ENTITY_CLEAR = 'UPDATE_PAYOUT_ENTITY_CLEAR';

export const CREATE_ACCOUNT_PERSON_BEGIN = 'CREATE_ACCOUNT_PERSON_BEGIN';
export const CREATE_ACCOUNT_PERSON_SUCCESS = 'CREATE_ACCOUNT_PERSON_SUCCESS';
export const CREATE_ACCOUNT_PERSON_FAILURE = 'CREATE_ACCOUNT_PERSON_FAILURE';
export const CREATE_ACCOUNT_PERSON_CLEAR = 'CREATE_ACCOUNT_PERSON_CLEAR';

export const deletePayoutAccountBegin = () => ({
  type: DELETE_PAYOUT_ACCOUNT_BEGIN
});

export const deletePayoutAccountSuccess = (payout_account) => ({
  type: DELETE_PAYOUT_ACCOUNT_SUCCESS,
  payload: { payout_account }
});

export const deletePayoutAccountFailure = error => ({
  type: DELETE_PAYOUT_ACCOUNT_FAILURE,
  payload: { error }
});

export const deletePayoutAccountClear = () => ({
  type: DELETE_PAYOUT_ACCOUNT_CLEAR
});

export function deletePayoutAccount() {
  return dispatch => {
    dispatch(deletePayoutAccountBegin());
    return axios.delete(`${BASE_API_URL}/payout_account.json`, {
    })
      .then(json => {
        dispatch(deletePayoutAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(deletePayoutAccountFailure(error)));
  };
}

export const fetchPayoutAccountBegin = () => ({
  type: FETCH_PAYOUT_ACCOUNT_BEGIN
});

export const fetchPayoutAccountSuccess = (payout_account) => ({
  type: FETCH_PAYOUT_ACCOUNT_SUCCESS,
  payload: { payout_account }
});

export const fetchPayoutAccountFailure = error => ({
  type: FETCH_PAYOUT_ACCOUNT_FAILURE,
  payload: { error }
});

export function fetchPayoutAccount() {
  return dispatch => {
    dispatch(fetchPayoutAccountBegin());
    return axios.get(`${BASE_API_URL}/payout_account.json`, {
    })
      .then(json => {
        dispatch(fetchPayoutAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchPayoutAccountFailure(error)));
  };
}

export const createPayoutAccountBegin = () => ({
  type: CREATE_PAYOUT_ACCOUNT_BEGIN
});

export const createPayoutAccountSuccess = (payout_account) => ({
  type: CREATE_PAYOUT_ACCOUNT_SUCCESS,
  payload: { payout_account }
});

export const createPayoutAccountFailure = error => ({
  type: CREATE_PAYOUT_ACCOUNT_FAILURE,
  payload: { error }
});

export const createPayoutAccountClear = () => ({
  type: CREATE_PAYOUT_ACCOUNT_CLEAR
});

export function createPayoutAccount(values) {
  return dispatch => {
    dispatch(createPayoutAccountBegin());
    return axios.post(`${BASE_API_URL}/payout_accounts.json`,
      JSON.stringify({ payout_account: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(createPayoutAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createPayoutAccountFailure(error.response.data)));
  };
}

export const updatePayoutAccountBegin = () => ({
  type: UPDATE_PAYOUT_ACCOUNT_BEGIN
});

export const updatePayoutAccountSuccess = (payout_account) => ({
  type: UPDATE_PAYOUT_ACCOUNT_SUCCESS,
  payload: { payout_account }
});

export const updatePayoutAccountFailure = error => ({
  type: UPDATE_PAYOUT_ACCOUNT_FAILURE,
  payload: { error }
});

export const updatePayoutAccountClear = () => ({
  type: UPDATE_PAYOUT_ACCOUNT_CLEAR
});

export function updatePayoutAccount(values) {
  return dispatch => {
    dispatch(updatePayoutAccountBegin());
    return axios.put(`${BASE_API_URL}/payout_account.json`,
      JSON.stringify({ payout_account: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(updatePayoutAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updatePayoutAccountFailure(error.response.data)));
  };
}

export const verifyPayoutAccountBegin = () => ({
  type: VERIFY_PAYOUT_ACCOUNT_BEGIN
});

export const verifyPayoutAccountSuccess = (payout_account) => ({
  type: VERIFY_PAYOUT_ACCOUNT_SUCCESS,
  payload: { payout_account }
});

export const verifyPayoutAccountFailure = error => ({
  type: VERIFY_PAYOUT_ACCOUNT_FAILURE,
  payload: { error }
});

export const verifyPayoutAccountClear = () => ({
  type: VERIFY_PAYOUT_ACCOUNT_CLEAR
});

export function verifyPayoutAccount(values) {
  return dispatch => {
    dispatch(verifyPayoutAccountBegin());
    return axios.put(`${BASE_API_URL}/payout_verification.json`,
      JSON.stringify({ payout_verification: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(verifyPayoutAccountSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(verifyPayoutAccountFailure(error.response.data)));
  };
}

export const updatePayoutEntityBegin = () => ({
  type: UPDATE_PAYOUT_ENTITY_BEGIN
});

export const updatePayoutEntitySuccess = (payout_account) => ({
  type: UPDATE_PAYOUT_ENTITY_SUCCESS,
  payload: { payout_account }
});

export const updatePayoutEntityFailure = error => ({
  type: UPDATE_PAYOUT_ENTITY_FAILURE,
  payload: { error }
});

export const updatePayoutEntityClear = () => ({
  type: UPDATE_PAYOUT_ENTITY_CLEAR
});

export function updatePayoutEntity(values) {
  return dispatch => {
    dispatch(updatePayoutEntityBegin());
    return axios.put(`${BASE_API_URL}/payout_entity.json`,
      JSON.stringify({ payout_entity: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(updatePayoutEntitySuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updatePayoutEntityFailure(error.response.data)));
  };
}

export const createAccountPersonBegin = () => ({
  type: CREATE_ACCOUNT_PERSON_BEGIN
});

export const createAccountPersonSuccess = (payout_account) => ({
  type: CREATE_ACCOUNT_PERSON_SUCCESS,
  payload: { payout_account }
});

export const createAccountPersonFailure = error => ({
  type: CREATE_ACCOUNT_PERSON_FAILURE,
  payload: { error }
});

export const createAccountPersonClear = () => ({
  type: CREATE_ACCOUNT_PERSON_CLEAR
});

export function createAccountPerson(values) {
  return dispatch => {
    dispatch(createAccountPersonBegin());
    return axios.post(`${BASE_API_URL}/payout_account/persons.json`,
      JSON.stringify({ person: values }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(createAccountPersonSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createAccountPersonFailure(error.response.data)));
  };
}
