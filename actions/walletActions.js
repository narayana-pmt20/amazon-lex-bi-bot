import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_WALLET_BEGIN   = 'FETCH_WALLET_BEGIN';
export const FETCH_WALLET_SUCCESS = 'FETCH_WALLET_SUCCESS';
export const FETCH_WALLET_FAILURE = 'FETCH_WALLET_FAILURE';

export const UPDATE_WALLET_BEGIN   = 'UPDATE_WALLET_BEGIN';
export const UPDATE_WALLET_SUCCESS = 'UPDATE_WALLET_SUCCESS';
export const UPDATE_WALLET_FAILURE = 'UPDATE_WALLET_FAILURE';
export const UPDATE_WALLET_CLEAR = 'UPDATE_WALLET_CLEAR';

export const fetchWalletBegin = () => ({
  type: FETCH_WALLET_BEGIN
});

export const fetchWalletSuccess = (wallet) => ({
  type: FETCH_WALLET_SUCCESS,
  payload: { wallet }
});

export const fetchWalletFailure = error => ({
  type: FETCH_WALLET_FAILURE,
  payload: { error }
});

export function fetchWallet() {
  return dispatch => {
    dispatch(fetchWalletBegin());
    return axios.get(`${BASE_API_URL}/wallet.json`, {
      })
      .then(json => {
        dispatch(fetchWalletSuccess(json.data));
      })
      .catch(error => dispatch(fetchWalletFailure(error)));
  };
}

export const updateWalletBegin = () => ({
  type: UPDATE_WALLET_BEGIN
});

export const updateWalletSuccess = (wallet) => ({
  type: UPDATE_WALLET_SUCCESS,
  payload: { wallet }
});

export const updateWalletFailure = error => ({
  type: UPDATE_WALLET_FAILURE,
  payload: { error }
});

export const updateWalletClear = () => ({
  type: UPDATE_WALLET_CLEAR
});

export function updateWallet(values) {
  return dispatch => {
    dispatch(updateWalletBegin());
    return axios.put(`${BASE_API_URL}/wallet.json`, 
      JSON.stringify({ wallet: values }),
      { headers: { 'Content-Type': 'application/json' }}
      )
      .then(json => {
        dispatch(updateWalletSuccess(json.data));
      })
      .catch(error => dispatch(updateWalletFailure(error.response)));
  };
}

