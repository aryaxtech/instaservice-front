import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5zdGFudGV4cGVydCIsInVybCI6Imh0dHBzOi8vaW5zdGFudGV4cGVydC5vbmxpbmUvIiwidW5pcXVlSWQiOjExMjYxMTQ1Mzg1MjcsImlhdCI6MTY3NDIyOTk4NSwiZXhwIjoxNjc0MzE2Mzg1fQ.wfryWe8GLiKAaluLDqMd2GqbQ3IGtrE-uxBOyP7Dd_o';
const backendUrl = 'https://core.talkearn.app/';

const defaultConfig = {
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Basic ${token}`,
  }
};

export const DefaultApiInstance = axios.create(defaultConfig);
