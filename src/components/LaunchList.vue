<template>
  <div class="bg-black/40 text-white text-center p-6 rounded-lg shadow-lg max-w-4xl w-full">
    <h2 class="text-3xl font-bold mb-4">🚀 Liste des lancements</h2>

    <!-- Menu déroulant pour filtrer -->
    <select v-model="filterStatus" class="mb-4 p-2 border border-white bg-transparent text-white rounded">
      <option value="all">Tous les lancements</option>
      <option value="success">Lancements réussis</option>
      <option value="failed">Lancements échoués</option>
    </select>

    <!-- Liste des lancements avec scroll -->
    <ul class="scrollable-list overflow-y-auto max-h-80 list-none pl-6">
      <li
        v-for="launch in visibleLaunches"
        :key="launch.id"
        class="mb-2 p-2 border border-white rounded cursor-pointer hover:bg-white/20 flex items-center text-lg"
        @click="openModal(launch)"
      >
        <span class="mr-2">🚀</span>
        {{ launch.name }} - {{ new Date(launch.date_utc).toLocaleDateString() }}
      </li>
    </ul>

    <!-- Modal pour afficher les détails -->
    <LaunchDetails v-if="selectedLaunch" :launch="selectedLaunch" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import LaunchDetails from './LaunchDetails.vue';
import type { Launch } from '../types/types';

const launches = ref<Launch[]>([]);
const filterStatus = ref('all');
const selectedLaunch = ref<Launch | null>(null);

/* Trier les lancements du plus récent au plus ancien */
const sortedLaunches = computed(() => {
  return launches.value.slice().sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime());
});

/* Filtrer les lancements */
const filteredLaunches = computed(() => {
  if (filterStatus.value === 'success') {
    return sortedLaunches.value.filter((launch) => launch.success);
  } else if (filterStatus.value === 'failed') {
    return sortedLaunches.value.filter((launch) => !launch.success);
  } else {
    return sortedLaunches.value;
  }
});

/* Afficher seulement les 10 premiers au départ */
const visibleLaunches = ref<Launch[]>([]);

onMounted(async () => {
  const response = await axios.get<Launch[]>('https://api.spacexdata.com/v5/launches');
  launches.value = response.data;
  visibleLaunches.value = filteredLaunches.value.slice(0, 10);
});

/* Mettre à jour visibleLaunches lorsque filteredLaunches change */
watch(filteredLaunches, (newFilteredLaunches) => {
  visibleLaunches.value = newFilteredLaunches;
}, { immediate: true });

const openModal = (launch: Launch) => {
  selectedLaunch.value = launch;
};

const closeModal = () => {
  selectedLaunch.value = null;
};
</script>
