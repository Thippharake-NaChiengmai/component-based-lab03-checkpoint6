<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

interface Passenger {
  id: number;
  name: string;
  age: number;
}

interface PassengerDetails {
  _id: string;
  name: string;
  trips: number;
  airline: any;
}

const passengers: Passenger[] = [
  { id: 1, name: 'Alice Smith', age: 28 },
  { id: 2, name: 'Bob Johnson', age: 34 },
  { id: 3, name: 'Charlie Lee', age: 22 },
  { id: 4, name: 'Diana Prince', age: 30 },
  { id: 5, name: 'Ethan Hunt', age: 40 },
  { id: 6, name: 'Fiona Gallagher', age: 27 },
  { id: 7, name: 'George Miller', age: 36 },
  { id: 8, name: 'Hannah Brown', age: 25 },
  { id: 9, name: 'Ian Curtis', age: 32 },
  { id: 10, name: 'Julia Roberts', age: 29 },
  { id: 11, name: 'Kevin Lee', age: 31 },
  { id: 12, name: 'Laura Palmer', age: 26 },
  { id: 13, name: 'Mike Ross', age: 33 },
  { id: 14, name: 'Nina Simone', age: 38 },
  { id: 15, name: 'Oscar Wilde', age: 41 },
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

const showModal = ref(false)
const details = ref<PassengerDetails | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function openPassengerDetails(id: number) {
  showModal.value = true
  loading.value = true
  error.value = null
  details.value = null
  try {
    const res = await axios.get(`https://api.instantwebtools.net/v1/passenger?page=${id}&size=5`)
    details.value = res.data
  } catch (e: any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}

function closeModal() {
  showModal.value = false
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="passenger in paginatedPassengers" :key="passenger.id" @click="openPassengerDetails(passenger.id)" style="cursor:pointer">
          <td>{{ passenger.id }}</td>
          <td>{{ passenger.name }}</td>
          <td>{{ passenger.age }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>

    <!-- Modal for passenger details -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <button class="close-btn" @click="closeModal">&times;</button>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else-if="details">
          <h2>Passenger Details</h2>
          <p><strong>ID:</strong> {{ details._id }}</p>
          <p><strong>Name:</strong> {{ details.name }}</p>
          <p><strong>Trips:</strong> {{ details.trips }}</p>
          <div v-if="details.airline">
            <h3>Airline</h3>
            <div v-if="Array.isArray(details.airline)">
              <div v-for="air in details.airline" :key="air.id">
                <p><strong>Name:</strong> {{ air.name }}</p>
                <p><strong>Country:</strong> {{ air.country }}</p>
              </div>
            </div>
            <div v-else>
              <p><strong>Name:</strong> {{ details.airline.name }}</p>
              <p><strong>Country:</strong> {{ details.airline.country }}</p>
            </div>
          </div>
        </div>
      </div>
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  max-width: 90vw;
  position: relative;
}
.close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
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
</style>
