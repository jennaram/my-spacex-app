<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Prochain lancement</h2>
      <p>{{ nextLaunch.name }}</p>
      <p>Temps restant : {{ countdown }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  const nextLaunch = ref({});
  const countdown = ref('');
  
  onMounted(async () => {
    const response = await axios.get('https://api.spacexdata.com/v5/launches/next');
    nextLaunch.value = response.data;
  
    setInterval(() => {
      const now = new Date();
      const launchDate = new Date(nextLaunch.value.date_utc);
      const diff = launchDate - now;
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
      countdown.value = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  });
  </script>