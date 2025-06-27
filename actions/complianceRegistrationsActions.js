import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_COMPLIANCE_REGISTRATION_BEGIN = 'FETCH_COMPLIANCE_REGISTRATION_BEGIN';
export const FETCH_COMPLIANCE_REGISTRATION_SUCCESS = 'FETCH_COMPLIANCE_REGISTRATION_SUCCESS';
export const FETCH_COMPLIANCE_REGISTRATION_FAILURE = 'FETCH_COMPLIANCE_REGISTRATION_FAILURE';
export const CREATE_COMPLIANCE_REGISTRATION_BEGIN = 'CREATE_COMPLIANCE_REGISTRATION_BEGIN';
export const CREATE_COMPLIANCE_REGISTRATION_SUCCESS = 'CREATE_COMPLIANCE_REGISTRATION_SUCCESS';
export const CREATE_COMPLIANCE_REGISTRATION_FAILURE = 'CREATE_COMPLIANCE_REGISTRATION_FAILURE';
export const CREATE_COMPLIANCE_REGISTRATION_CLEAR = 'CREATE_COMPLIANCE_REGISTRATION_CLEAR';

export const fetchComplianceRegistrationBegin = () => ({
  type: FETCH_COMPLIANCE_REGISTRATION_BEGIN
});

export const fetchComplianceRegistrationSuccess = (data) => ({
  type: FETCH_COMPLIANCE_REGISTRATION_SUCCESS,
  payload: data
});

export const fetchComplianceRegistrationFailure = (error) => ({
  type: FETCH_COMPLIANCE_REGISTRATION_FAILURE,
  payload: error
});

export const createComplianceRegistrationBegin = () => ({
  type: CREATE_COMPLIANCE_REGISTRATION_BEGIN,
});

export const createComplianceRegistrationSuccess = (data) => ({
  type: CREATE_COMPLIANCE_REGISTRATION_SUCCESS,
  payload: data,
});

export const createComplianceRegistrationFailure = (error) => ({
  type: CREATE_COMPLIANCE_REGISTRATION_FAILURE,
  payload: error,
});

export const createComplianceRegistrationClear = () => ({
  type: CREATE_COMPLIANCE_REGISTRATION_CLEAR,
});

export const fetchComplianceRegistration = () => async (dispatch) => {
  dispatch(fetchComplianceRegistrationBegin());
  try {
    const response = await axios.get(`${BASE_API_URL}/compliance_registration.json`);
    if (response.data.status === 'not_found') {
      dispatch(fetchComplianceRegistrationSuccess(null));
    } else {
      dispatch(fetchComplianceRegistrationSuccess(response.data));
    }
    return response.data;
  } catch (error) {
    if (!error.response || error.response.status >= 500) {
      dispatch(fetchComplianceRegistrationFailure(error.message));
    } else {
      dispatch(fetchComplianceRegistrationSuccess(null));
    }
    return null;
  }
};

export function createComplianceRegistration(values) {
  return async (dispatch) => {
    dispatch(createComplianceRegistrationBegin());
    try {
      const payload = { compliance_registration: values };
      const response = await axios.post(`${BASE_API_URL}/compliance_registration.json`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch(createComplianceRegistrationSuccess(response.data));
      return response.data;
    } catch (error) {
      dispatch(createComplianceRegistrationFailure(error.response?.data || error.message));
      throw error;
    }
  };
}