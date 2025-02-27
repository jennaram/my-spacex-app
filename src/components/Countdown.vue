<template>
  <div class="text-white text-center bg-black/40 p-6 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold mb-4">🚀 Prochain lancement</h2>
    <p class="text-lg font-semibold">{{ nextLaunch.name }}</p>
    <p class="text-xl mt-2">{{ countdown }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const nextLaunch = ref<{ name?: string; date_utc?: string }>({});
const countdown = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v5/launches/next');
    nextLaunch.value = response.data;

    setInterval(() => {
      const now = new Date();
      const launchDate = new Date(nextLaunch.value.date_utc || '');
      const diff = launchDate.getTime() - now.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdown.value = `${days}j ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
  }
});
</script>
