import _ from 'lodash';
import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_ARTICLE_BEGIN = 'CREATE_ARTICLE_BEGIN';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';
export const CREATE_ARTICLE_CLEAR = 'CREATE_ARTICLE_CLEAR';

export const UPDATE_ARTICLE_BEGIN = 'UPDATE_ARTICLE_BEGIN';
export const UPDATE_ARTICLE_SUCCESS = 'UPDATE_ARTICLE_SUCCESS';
export const UPDATE_ARTICLE_FAILURE = 'UPDATE_ARTICLE_FAILURE';
export const UPDATE_ARTICLE_CLEAR = 'UPDATE_ARTICLE_CLEAR';

export const FETCH_ARTICLE_BEGIN = 'FETCH_ARTICLE_BEGIN';
export const FETCH_ARTICLE_SUCCESS = 'FETCH_ARTICLE_SUCCESS';
export const FETCH_ARTICLE_FAILURE = 'FETCH_ARTICLE_FAILURE';
export const FETCH_ARTICLE_CLEAR = 'FETCH_ARTICLE_CLEAR';

export const createArticleBegin = () => ({
  type: CREATE_ARTICLE_BEGIN
});

export const createArticleSuccess = (article) => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: { article }
});

export const createArticleFailure = error => ({
  type: CREATE_ARTICLE_FAILURE,
  payload: { error }
});

export const createArticleClear = () => ({
  type: CREATE_ARTICLE_CLEAR
});

export function createArticle(data) {
  return dispatch => {
    dispatch(createArticleBegin());
    return axios.post(`${BASE_API_URL}/pr_articles.json`,
      { pr_article: data },
    )
      .then(json => {
        dispatch(createArticleSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createArticleFailure(error.response.data)));
  };
}

export const fetchArticleBegin = () => ({
  type: FETCH_ARTICLE_BEGIN
});

export const fetchArticleSuccess = (article) => ({
  type: FETCH_ARTICLE_SUCCESS,
  payload: { article }
});

export const fetchArticleFailure = error => ({
  type: FETCH_ARTICLE_FAILURE,
  payload: { error }
});

export const fetchArticleClear = () => ({
  type: FETCH_ARTICLE_CLEAR
});

export function fetchArticle(id) {
  return dispatch => {
    dispatch(fetchArticleBegin());
    return axios.get(`${BASE_API_URL}/pr_articles/${id}.json?`, {
    })
      .then(json => {
        dispatch(fetchArticleSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fetchArticleFailure(error)));
  };
}

export const updateArticleBegin = () => ({
  type: UPDATE_ARTICLE_BEGIN
});

export const updateArticleSuccess = (article) => ({
  type: UPDATE_ARTICLE_SUCCESS,
  payload: { article }
});

export const updateArticleFailure = error => ({
  type: UPDATE_ARTICLE_FAILURE,
  payload: { error }
});

export const updateArticleClear = () => ({
  type: UPDATE_ARTICLE_CLEAR
});

export function updateArticle(id, data) {
  return dispatch => {
    dispatch(updateArticleBegin());
    return axios.put(`${BASE_API_URL}/pr_articles/${id}.json`,
      { pr_article: data },
    )
      .then(json => {
        dispatch(updateArticleSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(updateArticleFailure(error.response.data)));
  };
}

