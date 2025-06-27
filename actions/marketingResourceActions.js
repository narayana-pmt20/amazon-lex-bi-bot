import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FETCH_MARKETING_RESOURCES_BEGIN   = 'FETCH_MARKETING_RESOURCES_BEGIN';
export const FETCH_MARKETING_RESOURCES_SUCCESS = 'FETCH_MARKETING_RESOURCES_SUCCESS';
export const FETCH_MARKETING_RESOURCES_FAILURE = 'FETCH_MARKETING_RESOURCES_FAILURE';

export const fetchMarketingResourcesBegin = () => ({
  type: FETCH_MARKETING_RESOURCES_BEGIN
});

export const fetchMarketingResourcesSuccess = (resources, totalItems, popularTags) => ({
  type: FETCH_MARKETING_RESOURCES_SUCCESS,
  payload: { resources, totalItems, popularTags }
});

export const fetchMarketingResourcesFailure = error => ({
  type: FETCH_MARKETING_RESOURCES_FAILURE,
  payload: { error }
});

export function fetchMarketingResources(page = 1, query, type) {
  return dispatch => {
    dispatch(fetchMarketingResourcesBegin());
    let queryString = '';
    let typeString = '';
    if (query !== undefined && query !== '') {
      queryString = `&q[title_or_tags_name_cont]=${query}`
    }
    if (type !== undefined && type !== '') {
      typeString = `&q[kind_eq]=${type}`
    }
    return axios.get(`${BASE_API_URL}/marketing_resources.json?page=${page}${queryString}${typeString}`, {
      })
      .then(json => {
        dispatch(fetchMarketingResourcesSuccess(json.data.marketing_resources, json.data.total_entries, json.data.popular_tags));
        return json.data.marketing_resources;
      })
      .catch(error => dispatch(fetchMarketingResourcesFailure(error)));
  };
}

export async function fetchMarketingResourceUrl(id) {
  let json = await axios.get(`${BASE_API_URL}/marketing_resources/${id}.json`, {
  })
  return json.data.url;
}


