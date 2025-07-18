<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAirlineById } from '@/../service/PassengerService'

interface AirlineDetails {
  id: number;
  name: string;
  country: string;
}

const route = useRoute()
const airline = ref<AirlineDetails | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const router = useRouter()

onMounted(async () => {
  loading.value = true
  try {
    const res = await getAirlineById(String(route.params.airlineId))
    airline.value = res.data
  } catch (e: any) {
    // Redirect to NotFound if fetch fails
    router.replace({ name: 'not-found' })
    // If network error, redirect to ResourceNotFoundView
    if (!window.navigator.onLine || (e && e.message && e.message.toLowerCase().includes('network'))) {
      router.replace({ name: 'resource-not-found' })
      return
    }
    return
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <div>
    <h1>Airline Details</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="airline">
      <p><strong>ID:</strong> {{ airline?.id }}</p>
      <p><strong>Name:</strong> {{ airline?.name }}</p>
      <p><strong>Country:</strong> {{ airline?.country }}</p>
    </div>
  </div>
</template> 