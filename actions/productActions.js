import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_PRODUCT_BEGIN   = 'FETCH_PRODUCT_BEGIN';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchProductBegin = () => ({
  type: FETCH_PRODUCT_BEGIN
});

export const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: { product }
});

export const fetchProductFailure = error => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: { error }
});

export function fetchProduct(id) {
  return dispatch => {
    dispatch(fetchProductBegin());
    return axios.get(`${BASE_API_URL}/products/${id}.json`, {
      })
      .then(json => {
        dispatch(fetchProductSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchProductFailure(error)));
  };
}
