<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

interface Airline {
  id: number;
  name: string;
  country: string;
}
interface PassengerDetails {
  _id: string;
  name: string;
  trips: number;
}

const route = useRoute()
const router = useRouter()
const passenger = ref<PassengerDetails | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    const res = await axios.get(`https://api.instantwebtools.net/v1/passenger/${route.params.id}`)
    passenger.value = res.data
  } catch (e: any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
})

</script>
<template>
  <div>
    <h1>Passenger Details</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="passenger">
      <p><strong>ID:</strong> {{ passenger?._id }}</p>
      <p><strong>Name:</strong> {{ passenger?.name }}</p>
      <p><strong>Trips:</strong> {{ passenger?.trips }}</p>
      <router-view />
    </div>
  </div>
</template> 