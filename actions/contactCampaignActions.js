import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_CONTACT_CAMPAIGN_BEGIN = 'CREATE_CONTACT_CAMPAIGN_BEGIN';
export const CREATE_CONTACT_CAMPAIGN_SUCCESS = 'CREATE_CONTACT_CAMPAIGN_SUCCESS';
export const CREATE_CONTACT_CAMPAIGN_FAILURE = 'CREATE_CONTACT_CAMPAIGN_FAILURE';
export const CREATE_CONTACT_CAMPAIGN_CLEAR = 'CREATE_CONTACT_CAMPAIGN_CLEAR';

export const UPDATE_CONTACT_CAMPAIGN_BEGIN = 'UPDATE_CONTACT_CAMPAIGN_BEGIN';
export const UPDATE_CONTACT_CAMPAIGN_SUCCESS = 'UPDATE_CONTACT_CAMPAIGN_SUCCESS';
export const UPDATE_CONTACT_CAMPAIGN_FAILURE = 'UPDATE_CONTACT_CAMPAIGN_FAILURE';
export const UPDATE_CONTACT_CAMPAIGN_CLEAR = 'UPDATE_CONTACT_CAMPAIGN_CLEAR';

export const CREATE_PAYMENT_BEGIN = 'CREATE_PAYMENT_BEGIN';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE';
export const CREATE_PAYMENT_CLEAR = 'CREATE_PAYMENT_CLEAR';

export const CANCEL_CONTACT_CAMPAIGN_BEGIN   = 'CANCEL_CONTACT_CAMPAIGN_BEGIN';
export const CANCEL_CONTACT_CAMPAIGN_SUCCESS = 'CANCEL_CONTACT_CAMPAIGN_SUCCESS';
export const CANCEL_CONTACT_CAMPAIGN_FAILURE = 'CANCEL_CONTACT_CAMPAIGN_FAILURE';
export const CANCEL_CONTACT_CAMPAIGN_CLEAR = 'CANCEL_CONTACT_CAMPAIGN_CLEAR';

export const FETCH_SETUP_BEGIN = 'FETCH_SETUP_BEGIN';
export const FETCH_SETUP_SUCCESS = 'FETCH_SETUP_SUCCESS';
export const FETCH_SETUP_FAILURE = 'FETCH_SETUP_FAILURE';
export const FETCH_SETUP_CLEAR = 'FETCH_SETUP_CLEAR';

export const FETCH_CAMPAIGN_BEGIN = 'FETCH_CAMPAIGN_BEGIN';
export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS';
export const FETCH_CAMPAIGN_FAILURE = 'FETCH_CAMPAIGN_FAILURE';

export const createContactCampaignBegin = () => ({
  type: CREATE_CONTACT_CAMPAIGN_BEGIN
});

export const createContactCampaignSuccess = (campaign) => ({
  type: CREATE_CONTACT_CAMPAIGN_SUCCESS,
  payload: { campaign }
});

export const createContactCampaignFailure = error => ({
  type: CREATE_CONTACT_CAMPAIGN_FAILURE,
  payload: { error }
});

export const createContactCampaignClear = () => ({
  type: CREATE_CONTACT_CAMPAIGN_CLEAR
});

export function createContactCampaign(values) {
  return dispatch => {
    dispatch(createContactCampaignBegin());
    return axios.post(`${BASE_API_URL}/contact_campaigns.json`,
      JSON.stringify({ contact_campaign: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createContactCampaignSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(createContactCampaignFailure(error.response.data))
      });
  };
}

export const updateContactCampaignBegin = () => ({
  type: UPDATE_CONTACT_CAMPAIGN_BEGIN
});

export const updateContactCampaignSuccess = (campaign) => ({
  type: UPDATE_CONTACT_CAMPAIGN_SUCCESS,
  payload: { campaign }
});

export const updateContactCampaignFailure = error => ({
  type: UPDATE_CONTACT_CAMPAIGN_FAILURE,
  payload: { error }
});

export const updateContactCampaignClear = () => ({
  type: UPDATE_CONTACT_CAMPAIGN_CLEAR
});

export function updateContactCampaign(id, values) {
  return dispatch => {
    dispatch(updateContactCampaignBegin());
    return axios.put(`${BASE_API_URL}/contact_campaigns/${id}.json`,
      JSON.stringify(values.op ? values : { contact_campaign: values }),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(updateContactCampaignSuccess(json.data));
        return json.data;
      })
      .catch(error => {
        dispatch(updateContactCampaignFailure(error.response.data))
      });
  };
}

export const createPaymentBegin = () => ({
  type: CREATE_PAYMENT_BEGIN
});

export const createPaymentSuccess = (markup) => ({
  type: CREATE_PAYMENT_SUCCESS,
  payload: { markup }
});

export const createPaymentFailure = error => ({
  type: CREATE_PAYMENT_FAILURE,
  payload: { error }
});

export const createPaymentClear = () => ({
  type: CREATE_PAYMENT_CLEAR
});

export function createPayment(id, values) {
  return dispatch => {
    dispatch(createPaymentBegin());
    return axios.post(`${BASE_API_URL}/contact_campaigns/${id}/payment.json`,
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createPaymentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createPaymentFailure(error.response.data)));
  };
}

export const fetchSetupBegin = () => ({
  type: FETCH_SETUP_BEGIN
});

export const fetchSetupSuccess = (setup) => ({
  type: FETCH_SETUP_SUCCESS,
  payload: { setup }
});

export const fetchSetupFailure = error => ({
  type: FETCH_SETUP_FAILURE,
  payload: { error }
});

export function fetchSetup(slug) {
  return dispatch => {
    dispatch(fetchSetupBegin());
    return axios.get(`${BASE_API_URL}/contact_campaign_setup.json?slug=${slug}`, {
    })
      .then(json => {
        dispatch(fetchSetupSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchSetupFailure(error)));
  };
}

export const fetchSetupClear = () => ({
  type: FETCH_SETUP_CLEAR
});

export const fetchCampaignBegin = () => ({
  type: FETCH_CAMPAIGN_BEGIN
});

export const fetchCampaignSuccess = (campaign) => ({
  type: FETCH_CAMPAIGN_SUCCESS,
  payload: { campaign }
});

export const fetchCampaignFailure = error => ({
  type: FETCH_CAMPAIGN_FAILURE,
  payload: { error }
});

export function fetchCampaign(id) {
  return dispatch => {
    dispatch(fetchCampaignBegin());
    return axios.get(`${BASE_API_URL}/contact_campaigns/${id}.json?`, {
    })
      .then(json => {
        dispatch(fetchCampaignSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchCampaignFailure(error)));
  };
}

export const cancelContactCampaignBegin = () => ({
  type: CANCEL_CONTACT_CAMPAIGN_BEGIN
});

export const cancelContactCampaignSuccess = (campaign) => ({
  type: CANCEL_CONTACT_CAMPAIGN_SUCCESS,
  payload: { campaign }
});

export const cancelContactCampaignFailure = error => ({
  type: CANCEL_CONTACT_CAMPAIGN_FAILURE,
  payload: { error }
});

export function cancelContactCampaign(campaign, cancelation_reason) {
  return async (dispatch) => {
    dispatch(cancelContactCampaignBegin());
    await axios.delete(`${BASE_API_URL}/contact_campaigns/${campaign.id}.json`, {
      data: { cancelation_reason }
      })
      .then(json => {
        dispatch(cancelContactCampaignSuccess(campaign));
        return campaign;
      })
      .catch(error => dispatch(cancelContactCampaignFailure(error)));
  };
}

export const cancelContactCampaignClear = () => ({
  type: CANCEL_CONTACT_CAMPAIGN_CLEAR
});
