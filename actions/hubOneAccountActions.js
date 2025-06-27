import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const UPDATE_HUBONE_ACCOUNT_BEGIN   = 'UPDATE_HUBONE_ACCOUNT_BEGIN';
export const UPDATE_HUBONE_ACCOUNT_SUCCESS = 'UPDATE_HUBONE_ACCOUNT_SUCCESS';
export const UPDATE_HUBONE_ACCOUNT_FAILURE = 'UPDATE_HUBONE_ACCOUNT_FAILURE';

export const updateHubOneAccountBegin = () => ({
  type: UPDATE_HUBONE_ACCOUNT_BEGIN
});

export const updateHubOneAccountSuccess = () => ({
  type: UPDATE_HUBONE_ACCOUNT_SUCCESS
});

export const updateHubOneAccountFailure = (error) => ({
  type: UPDATE_HUBONE_ACCOUNT_FAILURE,
  payload: { error }
});

export function updateHubOneAccount(accountId, segmentList) {
  return (dispatch) => {
    dispatch(updateHubOneAccountBegin());

    return axios.patch(
      `/api/v2/hub_one_accounts/${accountId}`,
      JSON.stringify({ hub_one_account: { segment_list: segmentList } }),
      { headers: { 'Content-Type': 'application/json' } }
    )
      .then(() => {
        dispatch(updateHubOneAccountSuccess());
      })
      .catch(error => {
        dispatch(updateHubOneAccountFailure(error));
      });
  };
}