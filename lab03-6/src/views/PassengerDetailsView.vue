<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPassengerDetailsById } from '@/../service/PassengerService'

interface PassengerDetails {
  id: number;
  name: string;
  age: number;
  trips: number;
  description: string;
}

const route = useRoute()
const router = useRouter()
const passenger = ref<PassengerDetails | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    const res = await getPassengerDetailsById(String(route.params.id))
    passenger.value = res.data
  } catch (e: any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
})

function goToAirline(airlineId: number) {
  router.push({ name: 'airline-details', params: { id: route.params.id, airlineId } })
}
</script>
<template>
  <div>
    <h1>Passenger Details</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="passenger">
      <p><strong>ID:</strong> {{ passenger?.id }}</p>
      <p><strong>Name:</strong> {{ passenger?.name }}</p>
      <p><strong>Age:</strong> {{ passenger?.age }}</p>
      <p><strong>Trips:</strong> {{ passenger?.trips }}</p>
      <p><strong>Description:</strong> {{ passenger?.description }}</p>
      <router-view />
    </div>
  </div>
</template> 