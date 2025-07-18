<script setup lang="ts">
interface Passenger {
  id: number;
  name: string;
  age: number;
}

const passengers: Passenger[] = [
  { id: 1, name: 'Alice Smith', age: 28 },
  { id: 2, name: 'Bob Johnson', age: 34 },
  { id: 3, name: 'Charlie Lee', age: 22 },
];
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
        <tr v-for="passenger in passengers" :key="passenger.id">
          <td>{{ passenger.id }}</td>
          <td>{{ passenger.name }}</td>
          <td>{{ passenger.age }}</td>
        </tr>
      </tbody>
    </table>
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
</style>
