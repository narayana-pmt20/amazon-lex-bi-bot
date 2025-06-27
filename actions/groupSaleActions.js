import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_GROUP_SALE_BEGIN = 'FETCH_GROUP_SALE_BEGIN';
export const FETCH_GROUP_SALE_SUCCESS = 'FETCH_GROUP_SALE_SUCCESS';
export const FETCH_GROUP_SALE_FAILURE = 'FETCH_GROUP_SALE_FAILURE';
export const FETCH_GROUP_SALE_CLEAR = 'FETCH_GROUP_SALE_CLEAR';

export const fetchGroupSalesBegin = () => ({
  type: FETCH_GROUP_SALE_BEGIN
});

export const fetchGroupSalesClear = () => ({
  type: FETCH_GROUP_SALE_CLEAR
});

export const fetchGroupSalesSuccess = (sales) => ({
  type: FETCH_GROUP_SALE_SUCCESS,
  payload: { sales }
});

export const fetchGroupSalesFailure = error => ({
  type: FETCH_GROUP_SALE_FAILURE,
  payload: { error }
});

export function fetchGroupSales(start_date = null, end_date = null, source = []) {
  let queryString = '';
  if (start_date) {
    queryString += `&start_date=${start_date}`
  }
  if (end_date) {
    queryString += `&end_date=${end_date}`
  }
  if (source) {
    queryString += `&source=${source}`
  }
  return dispatch => {
    dispatch(fetchGroupSalesBegin());
    return axios.get(`${BASE_API_URL}/group_sales.json?${queryString}`)
      .then(json => {
        dispatch(fetchGroupSalesSuccess(json.data.sales));
        return json.data.sales;
      })
      .catch(error => dispatch(fetchGroupSalesFailure(error)));
  };
} 