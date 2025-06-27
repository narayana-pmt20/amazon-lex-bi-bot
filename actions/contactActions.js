import _ from 'lodash';
import { buildSortString, buildFilterString } from '../util/api';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_CONTACTS_BEGIN   = 'FETCH_CONTACTS_BEGIN';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';

export const FETCH_AUTOCOMPLETE_CONTACTS_BEGIN   = 'FETCH_AUTOCOMPLETE_CONTACTS_BEGIN';
export const FETCH_AUTOCOMPLETE_CONTACTS_SUCCESS = 'FETCH_AUTOCOMPLETE_CONTACTS_SUCCESS';
export const FETCH_AUTOCOMPLETE_CONTACTS_FAILURE = 'FETCH_AUTOCOMPLETE_CONTACTS_FAILURE';

export const FETCH_CONTACT_BEGIN   = 'FETCH_CONTACT_BEGIN';
export const FETCH_CONTACT_SUCCESS = 'FETCH_CONTACT_SUCCESS';
export const FETCH_CONTACT_FAILURE = 'FETCH_CONTACT_FAILURE';
export const FETCH_CONTACT_CLEAR = 'FETCH_CONTACT_CLEAR';

export const CREATE_CONTACT_BEGIN   = 'CREATE_CONTACT_BEGIN';
export const CREATE_CONTACT_SUCCESS = 'CREATE_CONTACT_SUCCESS';
export const CREATE_CONTACT_FAILURE = 'CREATE_CONTACT_FAILURE';
export const CREATE_CONTACT_CLEAR = 'CREATE_CONTACT_CLEAR';

export const UPDATE_CONTACT_BEGIN   = 'UPDATE_CONTACT_BEGIN';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const UPDATE_CONTACT_FAILURE = 'UPDATE_CONTACT_FAILURE';
export const UPDATE_CONTACT_CLEAR = 'UPDATE_CONTACT_CLEAR';

export const DELETE_CONTACT_BEGIN   = 'DELETE_CONTACT_BEGIN';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAILURE = 'DELETE_CONTACT_FAILURE';

export const fetchContactsBegin = () => ({
  type: FETCH_CONTACTS_BEGIN
});

export const fetchContactsSuccess = (contacts, availableProducts, availableAgents, totalItems) => ({
  type: FETCH_CONTACTS_SUCCESS,
  payload: { 
    contacts: contacts.map(contact => ({
      ...contact,
      payment_sources: contact.payment_sources || []
    })), 
    availableProducts, 
    availableAgents, 
    totalItems 
  }
});

export const fetchContactsFailure = error => ({
  type: FETCH_CONTACTS_FAILURE,
  payload: { error }
});

export function fetchContacts(page = 1, pageSize = 10, filters, sorter, query) {
  return dispatch => {
    dispatch(fetchContactsBegin());
    let sortString = buildSortString(sorter);
    let filterString = buildFilterString(filters);
    let queryString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[email_or_first_name_or_last_name_or_full_name_or_company_or_phone_or_product_subscriptions_product_name_or_purchases_product_name_or_campaigns_product_name_or_account_tags_name_cont]=${query}`
    }
    return axios.get(`${BASE_API_URL}/contacts.json?page=${page}&per_page=${pageSize}${sortString}${filterString}${queryString}`)
      .then(json => {
        dispatch(fetchContactsSuccess(json.data.contacts, json.data.available_products, json.data.available_agents, json.data.total_entries));
        return json.data.contacts;
      })
      .catch(error => dispatch(fetchContactsFailure(error)));
  };
}

export function exportContacts() {
  const url = `${BASE_API_URL}/contacts.csv`
  return url
}

export const fetchAutocompleteContactsBegin = () => ({
  type: FETCH_AUTOCOMPLETE_CONTACTS_BEGIN
});

export const fetchAutocompleteContactsSuccess = (contacts) => ({
  type: FETCH_AUTOCOMPLETE_CONTACTS_SUCCESS,
  payload: { contacts }
});

export const fetchAutocompleteContactsFailure = error => ({
  type: FETCH_AUTOCOMPLETE_CONTACTS_FAILURE,
  payload: { error }
});

export function fetchAutocompleteContacts(filter) {
  return dispatch => {
    dispatch(fetchAutocompleteContactsBegin());
    return axios.get(`${BASE_API_URL}/autocomplete/contacts.json?q[first_name_or_last_name_or_email_cont]=${filter}`)
      .then(json => {
        dispatch(fetchAutocompleteContactsSuccess(json.data.contacts));
        return json.data.contacts;
      })
      .catch(error => dispatch(fetchAutocompleteContactsFailure(error)));
  };
}

export const createContactBegin = () => ({
  type: CREATE_CONTACT_BEGIN
});

export const createContactSuccess = (contact) => ({
  type: CREATE_CONTACT_SUCCESS,
  payload: { contact }
});

export const createContactFailure = error => ({
  type: CREATE_CONTACT_FAILURE,
  payload: { error }
});

export const createContactClear = () => ({
  type: CREATE_CONTACT_CLEAR
});

export function createContact(values) {
  return dispatch => {
    dispatch(createContactBegin());
    let contact = createContactFromValues(values);
    return axios.post(`${BASE_API_URL}/contacts.json`, 
        JSON.stringify({contact}),
        { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(createContactSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createContactFailure(error.response.data))
      });
  };
}

export const updateContactBegin = () => ({
  type: UPDATE_CONTACT_BEGIN
});

export const updateContactSuccess = (contact) => ({
  type: UPDATE_CONTACT_SUCCESS,
  payload: { contact }
});

export const updateContactFailure = error => ({
  type: UPDATE_CONTACT_FAILURE,
  payload: { error }
});

export const updateContactClear = () => ({
  type: UPDATE_CONTACT_CLEAR
});

export function updateContact(id, values) {
  return dispatch => {
    dispatch(updateContactBegin());
    return axios.put(`${BASE_API_URL}/contacts/${id}.json`, 
      JSON.stringify({contact: createContactFromValues(values)}),
      { headers: { 'Content-Type': 'application/json' }})
      .then(json => {
        dispatch(updateContactSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateContactFailure(error.response.data)));
  };
}

export const fetchContactBegin = () => ({
  type: FETCH_CONTACT_BEGIN
});

export const fetchContactSuccess = (contact) => ({
  type: FETCH_CONTACT_SUCCESS,
  payload: { contact }
});

export const fetchContactFailure = error => ({
  type: FETCH_CONTACT_FAILURE,
  payload: { error }
});

export function fetchContact(id) {
  return dispatch => {
    dispatch(fetchContactBegin());
    return axios.get(`${BASE_API_URL}/contacts/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchContactSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchContactFailure(error)));
  };
}

export const fetchContactClear = () => ({
  type: FETCH_CONTACT_CLEAR
});

export const deleteContactBegin = () => ({
  type: DELETE_CONTACT_BEGIN
});

export const deleteContactSuccess = (contact) => ({
  type: DELETE_CONTACT_SUCCESS,
  payload: { contact }
});

export const deleteContactFailure = error => ({
  type: DELETE_CONTACT_FAILURE,
  payload: { error }
});

export function deleteContact(contact) {
  return async (dispatch) => {
    dispatch(deleteContactBegin());
    await axios.delete(`${BASE_API_URL}/contacts/${contact.id}.json`, {
      })
      .then(json => {
        dispatch(deleteContactSuccess(contact));
        dispatch(fetchContacts());
      })
      .catch(error => {
        dispatch(deleteContactFailure(error.response.data[0]))
      });
  };
}

function createContactFromValues(values) {
  let result = _.pick(values, ['first_name', 'last_name', 'email', 'phone', 'state', 'company', 'company_website', 'agent_id', 'custom_fields_attributes']);
  let address = _.pick(values, ['address1', 'address2', 'city', 'region', 'postal_code', 'country']);
  result.tag_list = values.tag_list
  if (_.isEmpty(address) == false) {
    result.address_attributes = address;
    if (values.address_id !== undefined) {
      result.address_attributes.id = values.address_id
    }
  }
  return result;

}