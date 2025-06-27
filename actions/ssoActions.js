import axios from 'axios';

const BASE_API_URL = '/api/v2';

export async function getSSOURL(type, value) {
  let json = await axios.get(`${BASE_API_URL}/sso/${type}.json?value=${value}`, {
  })
  return json.data.url;
}