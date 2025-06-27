import axios from 'axios';

const BASE_API_URL = '/api/v2';

export const FILE_UPLOAD_BEGIN = 'FILE_UPLOAD_BEGIN';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_FAILURE = 'FILE_UPLOAD_FAILURE';
export const FILE_UPLOAD_CLEAR = 'FILE_UPLOAD_CLEAR';
export const FILE_UPLOAD_DELETE_BEGIN = 'FILE_UPLOAD_DELETE_BEGIN';
export const FILE_UPLOAD_DELETE_SUCCESS = 'FILE_UPLOAD_DELETE_SUCCESS';
export const FILE_UPLOAD_DELETE_FAILURE = 'FILE_UPLOAD_DELETE_FAILURE';

export const fileUploadBegin = () => ({
  type: FILE_UPLOAD_BEGIN
});

export const fileUploadSuccess = (file) => ({
  type: FILE_UPLOAD_SUCCESS,
  payload: { file }
});

export const fileUploadFailure = error => ({
  type: FILE_UPLOAD_FAILURE,
  payload: { error }
});

export const fileUploadClear = () => ({
  type: FILE_UPLOAD_CLEAR
});

export function fileUpload(value) {
  return dispatch => {
    dispatch(fileUploadBegin());
    return axios.post(`${BASE_API_URL}/file_uploads.json`,
      value,
      { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(json => {
        dispatch(fileUploadSuccess(json.data));
        return json.data;
      })
      .catch(error => dispatch(fileUploadFailure(error)));
  };
}

export const fileUploadDeleteBegin = () => ({
  type: FILE_UPLOAD_DELETE_BEGIN
});

export const fileUploadDeleteSuccess = (fileId) => ({
  type: FILE_UPLOAD_DELETE_SUCCESS,
  payload: { fileId }
});

export const fileUploadDeleteFailure = error => ({
  type: FILE_UPLOAD_DELETE_FAILURE,
  payload: { error }
});

export function deleteFileUpload(fileId) {
  return dispatch => {
    dispatch(fileUploadDeleteBegin());
    return axios.delete(`${BASE_API_URL}/file_uploads/${fileId}.json`)
      .then(() => {
        dispatch(fileUploadDeleteSuccess(fileId));
      })
      .catch(error => dispatch(fileUploadDeleteFailure(error)));
  };
}
