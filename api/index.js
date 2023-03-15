import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5zdGFudGV4cGVydCIsInVybCI6Imh0dHBzOi8vaW5zdGFudGV4cGVydC5vbmxpbmUvIiwidW5pcXVlSWQiOjgxMjczNDUzODQyNCwiaWF0IjoxNjc4ODc2NzgwLCJleHAiOjE2Nzg5NjMxODB9.6nvMpMRB_QsaHuGSePWj7EU4KDcRSRki2xkGT7IDFU8';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5zdGFudGV4cGVydCIsInVybCI6Imh0dHBzOi8vaW5zdGFudGV4cGVydC5vbmxpbmUvIiwidW5pcXVlSWQiOjE0NDIwNzcyNjE4OSwiaWF0IjoxNjc1NzAwNzcxLCJleHAiOjE2NzU3ODcxNzF9.zFu7t-3xeVH5iWAK02BKG2tiX65TmDXcf3qMHlqWLAo';
// const backendUrl = 'http://127.0.0.1:5000';
const backendUrl = 'https://core.instantexpert.online';

const defaultConfig = {
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Basic ${token}`,
  }
};

export const DefaultApiInstance = axios.create(defaultConfig);

export function SetUserTokenToDefaultApiInstance(token) {
  DefaultApiInstance.interceptors.request.use(function (config) {
    config.headers['authorization'] = `Bearer ${token}`;
    return config;
  });
}
