// @ts-check
import axios from "axios";
import queryString from 'query-string';
require('dotenv').config()

const pipedriveURL = process.env.URL_PIPEDRIVE
const apiToken = process.env.TOKEN_PIPEDRIVE

export const getServiceUrl = (endpoint: string, params = {}) => {
  const qs = queryString.stringify(params);
  return `${pipedriveURL}${endpoint}?api_token=${apiToken}&${qs}`
}

export const post = async (endpoint: string, body: any) => {
  const url = getServiceUrl(endpoint);
  const response = await axios.post(url, body);
  return response.data;
}

export const get = async (endpoint: string, params: any) => {
  const url = getServiceUrl(endpoint, params);
  const response = await axios.get(url);
  return response.data;
}