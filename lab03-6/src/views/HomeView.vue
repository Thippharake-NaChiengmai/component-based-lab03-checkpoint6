<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getPassengers } from '@/../service/PassengerService'

interface Passenger {
  id: number;
  name: string;
  age: number;
  description: string;
  trips: number;
  airlineId: number;
  airlineName: string;
  airlineCountry: string;
}

const passengers = ref<Passenger[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const pageSize = 5;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(passengers.value.length / pageSize));

const paginatedPassengers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return passengers.value.slice(start, start + pageSize);
});

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
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

onMounted(async () => {
  loading.value = true
  try {
    const res = await getPassengers()
    // Adapt data if needed
    passengers.value = res.data.map((p: any) => ({
      id: p.id,
      name: p.name,
      age: p.age,
      airlineId: p.airline?.id,
      airlineName: p.airline?.name,
      airlineCountry: p.airline?.country,
      trips: p.trips,
    }))
  } catch (e: any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <h1>Passenger List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Airline Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="passenger in paginatedPassengers" :key="passenger.id" style="cursor:pointer">
          <td @click="openPassengerDetails(passenger.id)">{{ passenger.id }}</td>
          <td @click="openPassengerDetails(passenger.id)">{{ passenger.name }}</td>
          <td>
            <button @click.stop="goToAirlineDetails(passenger)" :disabled="!passenger.airlineId">Airline Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination" v-if="!loading && !error">
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
