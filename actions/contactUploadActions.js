import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const CREATE_CONTACT_UPLOAD_BEGIN = 'CREATE_CONTACT_UPLOAD_BEGIN';
export const CREATE_CONTACT_UPLOAD_SUCCESS = 'CREATE_CONTACT_UPLOAD_SUCCESS';
export const CREATE_CONTACT_UPLOAD_FAILURE = 'CREATE_CONTACT_UPLOAD_FAILURE';

export const createContactUploadBegin = () => ({
  type: CREATE_CONTACT_UPLOAD_BEGIN
});

export const createContactUploadSuccess = (contact_upload) => ({
  type: CREATE_CONTACT_UPLOAD_SUCCESS,
  payload: { contact_upload }
});

export const createContactUploadFailure = error => ({
  type: CREATE_CONTACT_UPLOAD_FAILURE,
  payload: { error }
});

export function createContactUpload(value) {
  return dispatch => {
    dispatch(createContactUploadBegin());
    return axios.post(`${BASE_API_URL}/contact_uploads.json`,
      value,
      { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(json => {
        dispatch(createContactUploadSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(createContactUploadFailure(error)));
  };
}