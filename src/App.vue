<template>
  <div 
    class="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat font-sans"
    style="background-image: url('/nasa_background.jpg')"
  >
    <!-- Header -->
    <Header />

    <!-- Contenu principal -->
    <main class="flex-grow p-8 flex flex-col items-center">
      
      <h1 class="text-3xl font-bold text-red-500">Si ceci est rouge, Tailwind fonctionne !</h1>

     <!-- Conteneur pour les trois encadrés -->
<div class="flex flex-col items-center space-y-16 py-10 w-full max-w-3xl">
  
  <!-- ENCADRÉ POUR COUNTDOWN -->
  <div class="encadre text-white text-center font-mono text-xl">
    <Countdown />
    
    <!-- Vidéo YouTube -->
    <div class="flex justify-center w-full mt-4">
      <div class="w-full max-w-xl">
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/28e2RCslkN4?si=ldOzUKqUf__To5OX" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" 
          allowfullscreen 
          class="rounded-lg shadow-lg"
        ></iframe>
      </div>
    </div>
  </div> <!-- Fin de div.encadre -->

  <!-- ENCADRÉ POUR LA LISTE DES LANCEMENTS -->
  <div class="encadre">
    <LaunchList @select-launch="selectedLaunch = $event" />
  </div>

  <!-- ENCADRÉ POUR LES DÉTAILS DU LANCEMENT -->
  <div class="encadre" v-if="selectedLaunch">
    <LaunchDetails :launch="selectedLaunch" @close="selectedLaunch = null" />
  </div>

</div> <!-- Fin du conteneur principal -->

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

<style>
/* Importation des polices Google */
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@200..800&family=Raleway:wght@100..900&display=swap');

/* Ajout des polices globales */
body {
  font-family: 'Raleway', sans-serif;
}
</style>
