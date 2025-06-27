import { message } from 'antd';
import axios from 'axios';

// Action Types
export const FETCH_CUSTOMER_INVOICES_REQUEST = 'FETCH_CUSTOMER_INVOICES_REQUEST';
export const FETCH_CUSTOMER_INVOICES_SUCCESS = 'FETCH_CUSTOMER_INVOICES_SUCCESS';
export const FETCH_CUSTOMER_INVOICES_FAILURE = 'FETCH_CUSTOMER_INVOICES_FAILURE';

export const FETCH_CUSTOMER_INVOICE_REQUEST = 'FETCH_CUSTOMER_INVOICE_REQUEST';
export const FETCH_CUSTOMER_INVOICE_SUCCESS = 'FETCH_CUSTOMER_INVOICE_SUCCESS';
export const FETCH_CUSTOMER_INVOICE_FAILURE = 'FETCH_CUSTOMER_INVOICE_FAILURE';

export const CREATE_CUSTOMER_INVOICE_BEGIN = 'CREATE_CUSTOMER_INVOICE_BEGIN';
export const CREATE_CUSTOMER_INVOICE_SUCCESS = 'CREATE_CUSTOMER_INVOICE_SUCCESS';
export const CREATE_CUSTOMER_INVOICE_FAILURE = 'CREATE_CUSTOMER_INVOICE_FAILURE';
export const CREATE_CUSTOMER_INVOICE_CLEAR = 'CREATE_CUSTOMER_INVOICE_CLEAR';

export const UPDATE_CUSTOMER_INVOICE_START = 'UPDATE_CUSTOMER_INVOICE_START';
export const UPDATE_CUSTOMER_INVOICE_SUCCESS = 'UPDATE_CUSTOMER_INVOICE_SUCCESS';
export const UPDATE_CUSTOMER_INVOICE_FAILURE = 'UPDATE_CUSTOMER_INVOICE_FAILURE';
export const UPDATE_CUSTOMER_INVOICE_CLEAR = 'UPDATE_CUSTOMER_INVOICE_CLEAR';

export const CLEAR_CURRENT_INVOICE = 'CLEAR_CURRENT_INVOICE';

// Default headers for API requests
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

// Fetch Actions
const fetchCustomerInvoicesRequest = () => ({
  type: FETCH_CUSTOMER_INVOICES_REQUEST
});

const fetchCustomerInvoicesSuccess = (invoices, total) => ({
  type: FETCH_CUSTOMER_INVOICES_SUCCESS,
  payload: { invoices, total }
});

const fetchCustomerInvoicesFailure = (error) => ({
  type: FETCH_CUSTOMER_INVOICES_FAILURE,
  payload: error
});

// Single Invoice Fetch Actions
const fetchCustomerInvoiceRequest = () => ({
  type: FETCH_CUSTOMER_INVOICE_REQUEST
});

const fetchCustomerInvoiceSuccess = (invoice) => ({
  type: FETCH_CUSTOMER_INVOICE_SUCCESS,
  payload: invoice
});

const fetchCustomerInvoiceFailure = (error) => ({
  type: FETCH_CUSTOMER_INVOICE_FAILURE,
  payload: error
});

// Create Actions
export const createCustomerInvoiceBegin = () => ({
  type: CREATE_CUSTOMER_INVOICE_BEGIN
});

export const createCustomerInvoiceSuccess = (data) => ({
  type: CREATE_CUSTOMER_INVOICE_SUCCESS,
  payload: data
});

export const createCustomerInvoiceFailure = (error) => ({
  type: CREATE_CUSTOMER_INVOICE_FAILURE,
  payload: error
});

export const createCustomerInvoiceClear = () => ({
  type: CREATE_CUSTOMER_INVOICE_CLEAR
});

// Thunk Actions
export const fetchCustomerInvoices = (params) => async (dispatch) => {
  dispatch(fetchCustomerInvoicesRequest());

  try {
    // Convert params to Ransack query format
    const queryParams = new URLSearchParams({
      page: params.current,
      per_page: params.pageSize
    });

    // Add filters if present
    const q = {};
    
    // Add filters if present
    if (params.filters && Object.keys(params.filters).length > 0) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value) {
          if (key === 'status') {
            if (Array.isArray(value)) {
              q[`state_in`] = value;
            } else {
              q[`state_eq`] = value;
            }
          } else {
            if (Array.isArray(value)) {
              q[`${key}_in`] = value;
            } else {
              q[`${key}_eq`] = value;
            }
          }
        }
      });
    }

    // Add search if present
    if (params.query) {
      q[`contact_first_name_or_contact_last_name_or_stripe_number_or_invoice_number_or_description_cont`] = params.query;
    }

    // Add sorting if present
    if (params.sorter?.field) {
      let field = params.sorter.field;
      if (field === 'amount') {
        field = 'total_cents';
      } else if (field === 'stripe_number') {
        field = 'id';
      } else if (Array.isArray(field) && field[0] === 'contact' && field[1] === 'full_name') {
        field = 'contact_first_name';
      }
      q.s = `${field} ${params.sorter.order === 'descend' ? 'desc' : 'asc'}`;
    }
    
    // Add the combined q parameter if we have any filters or sorting
    if (Object.keys(q).length > 0) {
      queryParams.append('q', JSON.stringify(q));
    }

    const response = await axios.get(`/api/v2/customer_invoices?${queryParams.toString()}`, {
      headers: defaultHeaders
    });
    
    dispatch(fetchCustomerInvoicesSuccess(response.data.invoices, response.data.total));
  } catch (error) {
    dispatch(fetchCustomerInvoicesFailure(error.response?.data?.message || error.message));
    message.error('Failed to fetch customer invoices. Please try again later.');
  }
};

export const fetchCustomerInvoice = (id) => async (dispatch) => {
  dispatch(fetchCustomerInvoiceRequest());

  try {
    const response = await axios.get(`/api/v2/customer_invoices/${id}`, {
      headers: defaultHeaders
    });
    
    dispatch(fetchCustomerInvoiceSuccess(response.data));
  } catch (error) {
    dispatch(fetchCustomerInvoiceFailure(error.response?.data?.message || error.message));
    message.error('Failed to fetch invoice details. Please try again later.');
  }
};

export const downloadCustomerInvoicePdf = async (invoiceId) => {
  try {
    const response = await axios.get(`/api/v2/customer_invoices/${invoiceId}/pdf`, {
      headers: { 'Accept': 'application/pdf' },
      responseType: 'blob'
    });

    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `invoice-${invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    message.error('Failed to download PDF. Please try again later.');
  }
};

export const createCustomerInvoice = (invoiceData) => async (dispatch) => {
  dispatch(createCustomerInvoiceBegin());

  try {
    const response = await axios.post('/api/v2/customer_invoices', {
      customer_invoice: {
        ...invoiceData,
        contact_id: invoiceData.contact_id.value,
        auto_charge: invoiceData.payment_type === 'auto_charge',
      }
    }, {
      headers: defaultHeaders
    });

    dispatch(createCustomerInvoiceSuccess(response.data));
    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(createCustomerInvoiceFailure(errorMessage));
    message.error('Failed to create invoice: ' + errorMessage);
    throw error;
  }
};

export const updateCustomerInvoice = (id, invoiceData) => async (dispatch) => {
  dispatch({ type: UPDATE_CUSTOMER_INVOICE_START });
  try {
    const response = await axios.put(`/api/v2/customer_invoices/${id}`, {
      customer_invoice: {
        ...invoiceData,
        contact_id: invoiceData.contact_id.value,
        state: invoiceData.state || 'draft',
        auto_charge: invoiceData.payment_type === 'auto_charge',
      }
    }, {
      headers: defaultHeaders
    });
    dispatch({ type: UPDATE_CUSTOMER_INVOICE_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    dispatch({ type: UPDATE_CUSTOMER_INVOICE_FAILURE, payload: error.response?.data?.errors || ['Failed to update invoice'] });
    throw error;
  }
};

export const clearCurrentInvoice = () => ({
  type: UPDATE_CUSTOMER_INVOICE_CLEAR
}); 