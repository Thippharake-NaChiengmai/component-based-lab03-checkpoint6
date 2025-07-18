<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

interface Passenger {
  id: number;
  name: string;
  age: number;
  airlineId?: number;
  airlineName?: string;
  airlineCountry?: string;
  trips?: number;
}

interface PassengerDetails {
  _id: string;
  name: string;
  trips: number;
}

const passengers: Passenger[] = [
  { id: 1, name: 'Alice Smith', age: 28, airlineId: 1, airlineName: 'Airline A', airlineCountry: 'USA', trips: 12 },
  { id: 2, name: 'Bob Johnson', age: 34, airlineId: 2, airlineName: 'Airline B', airlineCountry: 'UK', trips: 8 },
  { id: 3, name: 'Charlie Lee', age: 22, airlineId: 3, airlineName: 'Airline C', airlineCountry: 'Canada', trips: 5 },
  { id: 4, name: 'Diana Prince', age: 30, airlineId: 4, airlineName: 'Airline D', airlineCountry: 'France', trips: 15 },
  { id: 5, name: 'Ethan Hunt', age: 40, airlineId: 5, airlineName: 'Airline E', airlineCountry: 'Germany', trips: 20 },
  { id: 6, name: 'Fiona Gallagher', age: 27, airlineId: 6, airlineName: 'Airline F', airlineCountry: 'Australia', trips: 7 },
  { id: 7, name: 'George Miller', age: 36, airlineId: 7, airlineName: 'Airline G', airlineCountry: 'Japan', trips: 9 },
  { id: 8, name: 'Hannah Brown', age: 25, airlineId: 8, airlineName: 'Airline H', airlineCountry: 'Italy', trips: 3 },
  { id: 9, name: 'Ian Curtis', age: 32, airlineId: 9, airlineName: 'Airline I', airlineCountry: 'Spain', trips: 11 },
  { id: 10, name: 'Julia Roberts', age: 29, airlineId: 10, airlineName: 'Airline J', airlineCountry: 'Brazil', trips: 6 },
  { id: 11, name: 'Kevin Lee', age: 31, airlineId: 11, airlineName: 'Airline K', airlineCountry: 'Thailand', trips: 13 },
  { id: 12, name: 'Laura Palmer', age: 26, airlineId: 12, airlineName: 'Airline L', airlineCountry: 'Sweden', trips: 4 },
  { id: 13, name: 'Mike Ross', age: 33, airlineId: 13, airlineName: 'Airline M', airlineCountry: 'Russia', trips: 10 },
  { id: 14, name: 'Nina Simone', age: 38, airlineId: 14, airlineName: 'Airline N', airlineCountry: 'South Africa', trips: 18 },
  { id: 15, name: 'Oscar Wilde', age: 41, airlineId: 15, airlineName: 'Airline O', airlineCountry: 'India', trips: 2 },
];

const pageSize = 5;
const currentPage = ref(1);
const totalPages = Math.ceil(passengers.length / pageSize);

const paginatedPassengers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return passengers.slice(start, start + pageSize);
});

function nextPage() {
  if (currentPage.value < totalPages) currentPage.value++;
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

const router = useRouter()

function openPassengerDetails(id: number) {
  router.push({ name: 'passenger-details', params: { id } })
}

function goToAirlineDetails(passenger: Passenger) {
  if (passenger.airlineId) {
    router.push({ name: 'airline-details', params: { id: passenger.id, airlineId: passenger.airlineId } })
  }
}
</script>

<template>
  <main>
    <h1>Passenger List</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Airline Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="passenger in paginatedPassengers" :key="passenger.id" style="cursor:pointer">
          <td @click="openPassengerDetails(passenger.id)">{{ passenger.id }}</td>
          <td @click="openPassengerDetails(passenger.id)">{{ passenger.name }}</td>
          <td @click="openPassengerDetails(passenger.id)">{{ passenger.age }}</td>
          <td>
            <button @click.stop="goToAirlineDetails(passenger)" :disabled="!passenger.airlineId">Airline Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </main>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
th {
  background: #222;
  color: #fff;
}
.pagination {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.pagination button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
td button {
  padding: 0.3rem 0.7rem;
  font-size: 0.95rem;
  border-radius: 4px;
  border: 1px solid #888;
  background: #333;
  color: #fff;
  cursor: pointer;
}
td button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
