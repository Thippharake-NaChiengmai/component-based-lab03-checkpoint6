<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="main-nav">
        <RouterLink to="/">Passenger</RouterLink>
        <RouterLink to="/about">Creator</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.main-nav {
  background: linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 0.75rem 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem auto 0 auto;
  max-width: 400px;
}

.main-nav a {
  color: #222;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.main-nav a.router-link-exact-active {
  background: #0077b6;
  color: #fff;
}

.main-nav a:hover {
  background: #caf0f8;
  color: #0077b6;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
