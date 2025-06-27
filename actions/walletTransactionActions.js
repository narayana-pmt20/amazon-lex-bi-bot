import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_WALLET_TRANSACTIONS_BEGIN   = 'FETCH_WALLET_TRANSACTIONS_BEGIN';
export const FETCH_WALLET_TRANSACTIONS_SUCCESS = 'FETCH_WALLET_TRANSACTIONS_SUCCESS';
export const FETCH_WALLET_TRANSACTIONS_FAILURE = 'FETCH_WALLET_TRANSACTIONS_FAILURE';
export const FETCH_WALLET_TRANSACTIONS_CLEAR   = 'FETCH_WALLET_TRANSACTIONS_CLEAR';


export const fetchWalletTransactionsBegin = () => ({
  type: FETCH_WALLET_TRANSACTIONS_BEGIN
});

export const fetchWalletTransactionsSuccess = (wallet_transactions, totalItems) => ({
  type: FETCH_WALLET_TRANSACTIONS_SUCCESS,
  payload: { wallet_transactions, totalItems }
});

export const fetchWalletTransactionsFailure = error => ({
  type: FETCH_WALLET_TRANSACTIONS_FAILURE,
  payload: { error }
});

export function fetchWalletTransactions(page = 1, pageSize = 10, query = '') {
  return dispatch => {
    dispatch(fetchWalletTransactionsBegin());
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[transaction_date_gteq]=${query}`
    }
    return axios.get(`${BASE_API_URL}/wallet_transactions.json?page=${page}&per_page=${pageSize}${queryString}`)
      .then(json => {
        dispatch(fetchWalletTransactionsSuccess(json.data.wallet_transactions, json.data.total_entries));
      })
      .catch(error => dispatch(fetchWalletTransactionsFailure(error)));
  };
}

export function exportWalletTransactions() {
  const url = `${BASE_API_URL}/wallet_transactions.csv`
  return url
}
