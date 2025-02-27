<template>
    <div>
      <h2 class="text-2xl font-bold mb-4">Liste des lancements</h2>
  
      <!-- Menu déroulant pour filtrer les lancements -->
      <select v-model="filterStatus" class="mb-4 p-2 border rounded">
        <option value="all">Tous les lancements</option>
        <option value="success">Lancements réussis</option>
        <option value="failed">Lancements échoués</option>
      </select>
  
      <!-- Liste des lancements filtrés -->
      <ul>
        <li
          v-for="launch in filteredLaunches"
          :key="launch.id"
          class="mb-2 p-2 border rounded cursor-pointer hover:bg-gray-100"
          @click="openModal(launch)"
        >
          {{ launch.name }} - {{ new Date(launch.date_utc).toLocaleDateString() }}
        </li>
      </ul>
  
      <!-- Modal pour afficher les détails du lancement -->
      <LaunchDetails
        v-if="selectedLaunch"
        :launch="selectedLaunch"
        @close="closeModal"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  import LaunchDetails from './LaunchDetails.vue';
  
  // État des lancements
  const launches = ref([]);
  
  // État du filtre
  const filterStatus = ref('all');
  
  // État pour gérer le lancement sélectionné
  const selectedLaunch = ref(null);
  
  // Propriété calculée pour filtrer les lancements
  const filteredLaunches = computed(() => {
    if (filterStatus.value === 'success') {
      return launches.value.filter((launch) => launch.success);
    } else if (filterStatus.value === 'failed') {
      return launches.value.filter((launch) => !launch.success);
    } else {
      return launches.value;
    }
  });
  
  // Fonction pour ouvrir le modal
  const openModal = (launch) => {
    selectedLaunch.value = launch;
  };
  
  // Fonction pour fermer le modal
  const closeModal = () => {
    selectedLaunch.value = null;
  };
  
  // Récupérer les lancements depuis l'API
  onMounted(async () => {
    const response = await axios.get('https://api.spacexdata.com/v5/launches');
    launches.value = response.data;
  });
  </script>