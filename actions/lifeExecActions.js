import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_ORDER_BEGIN   = 'CREATE_ORDER_BEGIN';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';
export const CREATE_ORDER_CLEAR = 'CREATE_ORDER_CLEAR';

export const createOrderBegin = () => ({
  type: CREATE_ORDER_BEGIN
});

export const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: { order }
});

export const createOrderFailure = error => ({
  type: CREATE_ORDER_FAILURE,
  payload: { error }
});

export const createOrderClear = () => ({
  type: CREATE_ORDER_CLEAR
});

export function createOrder(data) {
  return dispatch => {
    dispatch(createOrderBegin());
    return axios.post(`${BASE_API_URL}/life_exec_orders.json`, 
        data,
      )
      .then(json => {
        dispatch(createOrderSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createOrderFailure(error.response.data)));
  };
}
