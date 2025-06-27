import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_AGENT_SUBSCRIPTION_BEGIN = 'CREATE_AGENT_SUBSCRIPTION_BEGIN';
export const CREATE_AGENT_SUBSCRIPTION_SUCCESS = 'CREATE_AGENT_SUBSCRIPTION_SUCCESS';
export const CREATE_AGENT_SUBSCRIPTION_FAILURE = 'CREATE_AGENT_SUBSCRIPTION_FAILURE';
export const CREATE_AGENT_SUBSCRIPTION_CLEAR = 'CREATE_AGENT_SUBSCRIPTION_CLEAR';

export const UPDATE_AGENT_SUBSCRIPTION_BEGIN = 'UPDATE_AGENT_SUBSCRIPTION_BEGIN';
export const UPDATE_AGENT_SUBSCRIPTION_SUCCESS = 'UPDATE_AGENT_SUBSCRIPTION_SUCCESS';
export const UPDATE_AGENT_SUBSCRIPTION_FAILURE = 'UPDATE_AGENT_SUBSCRIPTION_FAILURE';
export const UPDATE_AGENT_SUBSCRIPTION_CLEAR = 'UPDATE_AGENT_SUBSCRIPTION_CLEAR';

export const CREATE_PAYMENT_BEGIN = 'CREATE_PAYMENT_BEGIN';
export const CREATE_PAYMENT_SUCCESS = 'CREATE_PAYMENT_SUCCESS';
export const CREATE_PAYMENT_FAILURE = 'CREATE_PAYMENT_FAILURE';
export const CREATE_PAYMENT_CLEAR = 'CREATE_PAYMENT_CLEAR';

export const FETCH_INVOICE_BEGIN = 'FETCH_INVOICE_BEGIN';
export const FETCH_INVOICE_SUCCESS = 'FETCH_INVOICE_SUCCESS';
export const FETCH_INVOICE_FAILURE = 'FETCH_INVOICE_FAILURE';

export const PURCHASE_AGENT_SUBSCRIPTION_BEGIN = 'PURCHASE_AGENT_SUBSCRIPTION_BEGIN';
export const PURCHASE_AGENT_SUBSCRIPTION_SUCCESS = 'PURCHASE_AGENT_SUBSCRIPTION_SUCCESS';
export const PURCHASE_AGENT_SUBSCRIPTION_FAILURE = 'PURCHASE_AGENT_SUBSCRIPTION_FAILURE';
export const PURCHASE_AGENT_SUBSCRIPTION_CLEAR = 'PURCHASE_AGENT_SUBSCRIPTION_CLEAR';

export const createAgentSubscriptionBegin = () => ({
  type: CREATE_AGENT_SUBSCRIPTION_BEGIN
});

export const createAgentSubscriptionSuccess = (agent_subscription) => ({
  type: CREATE_AGENT_SUBSCRIPTION_SUCCESS,
  payload: { agent_subscription }
});

export const createAgentSubscriptionFailure = error => ({
  type: CREATE_AGENT_SUBSCRIPTION_FAILURE,
  payload: { error }
});

export const createAgentSubscriptionClear = () => ({
  type: CREATE_AGENT_SUBSCRIPTION_CLEAR
});

export function createAgentSubscription({quantity, cycle_type}) {
  return dispatch => {
    dispatch(createAgentSubscriptionBegin());
    return axios.post(`${BASE_API_URL}/agent_subscription.json`,
      JSON.stringify({ agent_subscription: { quantity, cycle_type } }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(createAgentSubscriptionSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createAgentSubscriptionFailure(error.response.data)));
  };
}

export const updateAgentSubscriptionBegin = () => ({
  type: UPDATE_AGENT_SUBSCRIPTION_BEGIN
});

export const updateAgentSubscriptionSuccess = (agent_subscription) => ({
  type: UPDATE_AGENT_SUBSCRIPTION_SUCCESS,
  payload: { agent_subscription }
});

export const updateAgentSubscriptionFailure = error => ({
  type: UPDATE_AGENT_SUBSCRIPTION_FAILURE,
  payload: { error }
});

export const updateAgentSubscriptionClear = () => ({
  type: UPDATE_AGENT_SUBSCRIPTION_CLEAR
});

export function updateAgentSubscription({quantity, disable_agent_ids, cycle_type}) {
  return dispatch => {
    dispatch(updateAgentSubscriptionBegin());
    return axios.put(`${BASE_API_URL}/agent_subscription.json`,
      JSON.stringify({ agent_subscription: {quantity, disable_agent_ids, cycle_type} }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(updateAgentSubscriptionSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateAgentSubscriptionFailure(error.response.data)));
  };
}

export const createPaymentBegin = () => ({
  type: CREATE_PAYMENT_BEGIN
});

export const createPaymentSuccess = (payment_source) => ({
  type: CREATE_PAYMENT_SUCCESS,
  payload: { payment_source }
});

export const createPaymentFailure = error => ({
  type: CREATE_PAYMENT_FAILURE,
  payload: { error }
});

export const createPaymentClear = () => ({
  type: CREATE_PAYMENT_CLEAR
});

export function createPayment(values) {
  return dispatch => {
    dispatch(createPaymentBegin());
    return axios.post(`${BASE_API_URL}/agent_subscription/payment.json`,
      JSON.stringify(values),
      { headers: { 'Content-Type': 'application/json' } })
      .then(json => {
        dispatch(createPaymentSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createPaymentFailure(error.response.data)));
  };
}

export const fetchInvoiceBegin = () => ({
  type: FETCH_INVOICE_BEGIN
});

export const fetchInvoiceSuccess = (invoice) => ({
  type: FETCH_INVOICE_SUCCESS,
  payload: { invoice }
});

export const fetchInvoiceFailure = error => ({
  type: FETCH_INVOICE_FAILURE,
  payload: { error }
});

export function fetchInvoice(plan) {
  return dispatch => {
    dispatch(fetchInvoiceBegin());
    return axios.get(`${BASE_API_URL}/agent_subscription/invoice.json`, {
      params: { plan }
    })
      .then(json => {
        dispatch(fetchInvoiceSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchInvoiceFailure(error.response.data)));
  };
}


export const purchaseAgentSubscriptionBegin = () => ({
  type: PURCHASE_AGENT_SUBSCRIPTION_BEGIN
});

export const purchaseAgentSubscriptionSuccess = (agent_subscription) => ({
  type: PURCHASE_AGENT_SUBSCRIPTION_SUCCESS,
  payload: { agent_subscription }
});

export const purchaseAgentSubscriptionFailure = error => ({
  type: PURCHASE_AGENT_SUBSCRIPTION_FAILURE,
  payload: { error }
});

export const purchaseAgentSubscriptionClear = () => ({
  type: PURCHASE_AGENT_SUBSCRIPTION_CLEAR
});

export function purchaseAgentSubscription({cycle_type}) {
  return dispatch => {
    dispatch(purchaseAgentSubscriptionBegin());
    return axios.post(`${BASE_API_URL}/agent_subscription/purchase.json`,
      JSON.stringify({ agent_subscription: { cycle_type } }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(json => {
        dispatch(purchaseAgentSubscriptionSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(purchaseAgentSubscriptionFailure(error.response.data)));
  };
}
