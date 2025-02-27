<script setup lang="ts">
import Countdown from './components/Countdown.vue';
import LaunchList from './components/LaunchList.vue';
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8">SpaceX Launches</h1>
    <Countdown />
    <LaunchList />
  </div>
</template>

