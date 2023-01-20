import axios from 'axios';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGFsa0Vhcm4iLCJ1cmwiOiJodHRwczovL3RhbGtlYXJuLmFwcCIsInVuaXF1ZUlkIjoxMTEzODIzMTY2NTU1LCJpYXQiOjE2NzQxNDI4ODIsImV4cCI6MTY3NDIyOTI4Mn0.ejdgaN-U7FrFvkpVUWwrDV24m4KWlUFdyw80t06pXEE';
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGlrZW1lZGlhIiwidXJsIjoiaHR0cHM6Ly9saWtlbWVkaWEuY29tIiwidW5pcXVlSWQiOjE1MTc0MTc0NzE0MCwiaWF0IjoxNjczNjI1Nzc2LCJleHAiOjE2NzM3MTIxNzZ9.ER1epyJrj1h_It21FVkFP3wrYUzldEN9QnxfbNTW0d0';
const backendUrl = 'http://127.0.0.1:5000/';
// const backendUrl = 'https://core.talkearn.app/';

const defaultConfig = {
  baseURL: backendUrl,
  headers: {
    'Content-Type': 'application/json',
    'authorization': `Basic ${token}`,
  }
};

export const DefaultApiInstance = axios.create(defaultConfig);
