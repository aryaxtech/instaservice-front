import axios from 'axios';

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5zdGFudGV4cGVydCIsInVybCI6Imh0dHBzOi8vaW5zdGFudGV4cGVydC5vbmxpbmUvIiwidW5pcXVlSWQiOjExMjYxMTQ1Mzg1MjcsImlhdCI6MTY3NDIyOTk4NSwiZXhwIjoxNjc0MzE2Mzg1fQ.wfryWe8GLiKAaluLDqMd2GqbQ3IGtrE-uxBOyP7Dd_o';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGFsa0Vhcm4iLCJ1cmwiOiJodHRwczovL3RhbGtlYXJuLmFwcCIsInVuaXF1ZUlkIjoxMTEzODIzMTY2NTU1LCJpYXQiOjE2NzQxNDI4ODIsImV4cCI6MTY3NDIyOTI4Mn0.ejdgaN-U7FrFvkpVUWwrDV24m4KWlUFdyw80t06pXEE';
// const backendUrl = 'https://core.instantexpert.online/';
const backendUrl = 'http://127.0.0.1:5000';

const defaultConfig = {
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Basic ${token}`,
  }
};

export const DefaultApiInstance = axios.create(defaultConfig);
