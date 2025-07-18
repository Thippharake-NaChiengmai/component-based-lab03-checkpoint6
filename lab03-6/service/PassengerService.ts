import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Thippharake-NaChiengmai/lab03-6db.json/events',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

export function getPassengers() {
  return apiClient.get('/');
}

export function getPassengerById(id: number | string) {
  return apiClient.get(`/${id}`);
}
export function getPassengerDetailsById(id: number | string) {
    return apiClient.get(`/${id}`);
  }
  
  export function getAirlineById(id: number | string) {
    return apiClient.get(`/airlines/${id}`);
  }