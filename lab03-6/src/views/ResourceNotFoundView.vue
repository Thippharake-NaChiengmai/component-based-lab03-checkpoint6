<template>
  <div class="resource-not-found">
    <h1>Resource Not Found</h1>
    <p>The resource you are looking for does not exist or has been removed.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<style scoped>
.resource-not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.resource-not-found h1 {
  font-size: 2.2rem;
  color: #f39c12;
  margin-bottom: 1rem;
}
.resource-not-found p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}
</style> 