<script setup lang="ts">
import Countdown from './components/Countdown.vue';
import LaunchList from './components/LaunchList.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-8 space-y-6">
    <h1 class="text-3xl font-bold text-white text-center">🚀 SpaceX Launches</h1>

    <!-- ENCADRÉ POUR COUNTDOWN -->
    <div class="encadre mb-6">
      <Countdown />
    </div>

    <!-- ENCADRÉ POUR LA LISTE DES LANCEMENTS -->
    <div class="encadre">
      <LaunchList />
    </div>
  </div>
</template>











