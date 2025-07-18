<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

interface Airline {
  id: number;
  name: string;
  country: string;
}

const route = useRoute()
const airline = ref<Airline | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  loading.value = true
  try {
    const res = await axios.get(`https://api.instantwebtools.net/v1/airlines/${route.params.airlineId}`)
    airline.value = res.data
  } catch (e: any) {
    error.value = e.message || 'Unknown error'
  } finally {
    loading.value = false
  }
})
</script>
<template>
  <div>
    <h2>Airline Details</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="airline">
      <p><strong>ID:</strong> {{ airline?.id }}</p>
      <p><strong>Name:</strong> {{ airline?.name }}</p>
      <p><strong>Country:</strong> {{ airline?.country }}</p>
    </div>
  </div>
</template> 