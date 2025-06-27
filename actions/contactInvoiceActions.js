import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CONTACT_INVOICES_BEGIN   = 'FETCH_CONTACT_INVOICES_BEGIN';
export const FETCH_CONTACT_INVOICES_SUCCESS = 'FETCH_CONTACT_INVOICES_SUCCESS';
export const FETCH_CONTACT_INVOICES_FAILURE = 'FETCH_CONTACT_INVOICES_FAILURE';

export const fetchContactInvoicesBegin = () => ({
  type: FETCH_CONTACT_INVOICES_BEGIN
});

export const fetchContactInvoicesSuccess = (invoices, totalItems) => ({
  type: FETCH_CONTACT_INVOICES_SUCCESS,
  payload: { invoices, totalItems }
});

export const fetchContactInvoicesFailure = error => ({
  type: FETCH_CONTACT_INVOICES_FAILURE,
  payload: { error }
});

export function fetchContactInvoices(page = 1, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchContactInvoicesBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[subscribable_of_ProductSubscription_type_subscriber_of_Contact_type_email_or_subscribable_of_ProductSubscription_type_subscriber_of_Contact_type_first_name_or_subscribable_of_ProductSubscription_type_subscriber_of_Contact_type_last_name_or_stripe_number_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/contact_invoices.json?page=${page}${sortString}${queryString}${filterString}`, {
      })
      .then(json => {
        dispatch(fetchContactInvoicesSuccess(json.data.invoices, json.data.total_entries));
        return json.data.invoices;
      })
      .catch(error => dispatch(fetchContactInvoicesFailure(error)));
  };
}

export async function fetchInvoiceUrl(id) {
  let json = await axios.get(`${BASE_API_URL}/contact_invoices/${id}.json`, {
  })
  return json.data.url;
}

