<template>
  <div class="about">
    <div class="about-card">
      <h1>Created by: </h1>
      <p>Name: <strong>Thippharake Na Chiengmai</strong></p>
      <p>Student ID: <strong>662115019</strong></p>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%);
}
.about-card {
  background: #fff;
  padding: 2.5rem 3rem;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  text-align: center;
  max-width: 400px;
}
.about-card h1 {
  font-size: 2rem;
  margin-bottom: 1.2rem;
  color: #2c3e50;
}
.about-card p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: #333;
}
.about-card strong {
  color: #0077b6;
}
</style>
