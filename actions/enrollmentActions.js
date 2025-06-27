import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_ENROLLMENTS_BEGIN = 'FETCH_ENROLLMENTS_BEGIN';
export const FETCH_ENROLLMENTS_SUCCESS = 'FETCH_ENROLLMENTS_SUCCESS';
export const FETCH_ENROLLMENTS_FAILURE = 'FETCH_ENROLLMENTS_FAILURE';

export const FIX_ENROLLMENTS_BEGIN = 'FIX_ENROLLMENTS_BEGIN';
export const FIX_ENROLLMENTS_SUCCESS = 'FIX_ENROLLMENTS_SUCCESS';
export const FIX_ENROLLMENTS_FAILURE = 'FIX_ENROLLMENTS_FAILURE';

export const fetchEnrollmentsBegin = () => ({
  type: FETCH_ENROLLMENTS_BEGIN,
});

export const fetchEnrollmentsSuccess = (enrollments, totalItems) => ({
  type: FETCH_ENROLLMENTS_SUCCESS,
  payload: { enrollments, totalItems },
});

export const fetchEnrollmentsFailure = (error) => ({
  type: FETCH_ENROLLMENTS_FAILURE,
  payload: { error },
});

export function fetchEnrollments(page = 1) {
  return (dispatch) => {
    dispatch(fetchEnrollmentsBegin());
    return axios
      .get(`${BASE_API_URL}/enrollments.json?page=${page}`, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((json) => {
        dispatch(
          fetchEnrollmentsSuccess(
            json.data.enrollments,
            json.data.total_entries
          )
        );
        return json.data.enrollments;
      })
      .catch((error) => dispatch(fetchEnrollmentsFailure(error)));
  };
}

export const fixEnrollmentsBegin = () => ({
  type: FIX_ENROLLMENTS_BEGIN,
});

export const fixEnrollmentsSuccess = (enrollments, totalItems) => ({
  type: FIX_ENROLLMENTS_SUCCESS,
  payload: { enrollments, totalItems },
});

export const fixEnrollmentsFailure = (error) => ({
  type: FIX_ENROLLMENTS_FAILURE,
  payload: { error },
});

export function fixEnrollments() {
  return (dispatch) => {
    dispatch(fixEnrollmentsBegin());
    return axios
      .get(`${BASE_API_URL}/enrollments/fix.json`, {})
      .then((json) => {
        dispatch(fixEnrollmentsSuccess(json.data.success));
        return json.data.success;
      })
      .catch((error) => dispatch(fixEnrollmentsFailure(error)));
  };
}
