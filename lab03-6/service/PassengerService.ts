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

export async function getAirlineById(airlineId: number | string) {
  const allPassengers = await getPassengers();
  const match = allPassengers.data.find((p: any) => p.airlineId == airlineId);
  if (!match) throw new Error('Airline not found');
  return {
    data: {
      id: match.airlineId,
      name: match.airlineName,
      country: match.airlineCountry
    }
  }
}
