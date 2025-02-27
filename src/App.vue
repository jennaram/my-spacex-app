<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <Header />

    <!-- Contenu principal -->
    <main class="flex-grow p-8">
      
      <div class="bg-blue-500 text-white text-3xl p-4">
    🚀 Test Tailwind : Fond bleu et texte blanc
    <p class="text-green-500 font-bold text-2xl">Texte vert avec Tailwind</p>

</div>
      <!-- Conteneur pour les trois encadrés -->
      <div class="flex flex-col items-center space-y-16 py-10">
  <!-- ENCADRÉ POUR COUNTDOWN -->
  <div class="encadre bg-opacity-20 flex-1 mb-6">
    <Countdown />
  </div>

  <!-- ENCADRÉ POUR LA LISTE DES LANCEMENTS -->
  <div class="encadre bg-opacity-20 flex-1 mb-6">
    <LaunchList @select-launch="selectedLaunch = $event" />
  </div>

  <!-- ENCADRÉ POUR LES DÉTAILS DU LANCEMENT -->
  <div class="encadre bg-opacity-20 flex-1 mb-6" v-if="selectedLaunch">
    <LaunchDetails :launch="selectedLaunch" @close="selectedLaunch = null" />
  </div>
</div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Countdown from './components/Countdown.vue';
import LaunchList from './components/LaunchList.vue';
import LaunchDetails from './components/LaunchDetails.vue';

// État pour stocker le lancement sélectionné
const selectedLaunch = ref(null);
</script>