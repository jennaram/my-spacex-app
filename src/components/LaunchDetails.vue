<template>
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div class="bg-black/90 text-white text-center p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-white text-3xl font-bold hover:text-red-500 transition"
        >
          ✖
        </button>
  
        <h2 class="text-3xl font-bold mb-4">{{ launch.name }}</h2>
  
        <!-- Image de la mission (affichée uniquement si elle existe) -->
        <img
          v-if="launch.links?.patch?.large"
          :src="launch.links.patch.large"
          :alt="launch.name"
          class="mb-4 mx-auto w-40"
        />
  
        <!-- Date de lancement -->
        <p><strong>📅 Date :</strong> {{ new Date(launch.date_utc).toLocaleDateString() }}</p>
  
        <!-- Description de la mission -->
        <p class="mt-2"><strong>📖 Description :</strong> {{ launch.details || 'Aucune description disponible.' }}</p>
  
        <!-- Lieu de lancement -->
        <p class="mt-2"><strong>📍 Lieu :</strong> {{ launch.launchpad?.name || 'Inconnu' }}</p>
  
        <!-- Charges utiles -->
        <p class="mt-2"><strong>🛰️ Charges utiles :</strong></p>
        <ul class="list-none">
          <li v-for="payload in launch.payloads" :key="payload.id">
            {{ payload.name }} ({{ payload.type }})
          </li>
        </ul>
  
        <!-- Clients -->
        <p class="mt-2"><strong>💼 Clients :</strong></p>
        <ul class="list-none">
          <li v-for="customer in launch.payloads.flatMap((p) => p.customers)" :key="customer">
            {{ customer }}
          </li>
        </ul>
  
        <!-- Bouton pour afficher/masquer la vidéo YouTube -->
        <button
          v-if="launch.links?.youtube_id"
          @click="showVideo = !showVideo"
          class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          {{ showVideo ? '🎬 Masquer la vidéo' : '🎥 Afficher la vidéo' }}
        </button>
  
        <!-- Vidéo YouTube (affichée uniquement si elle existe) -->
        <div v-if="showVideo && launch.links?.youtube_id" class="mt-4">
          <iframe
            :src="`https://www.youtube.com/embed/${launch.links.youtube_id}`"
            width="100%"
            height="315"
            class="rounded-lg"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Props pour recevoir les données du lancement
  const props = defineProps({
    launch: {
      type: Object as () => Launch,
      required: true,
    },
  });
  
  // État pour afficher/masquer la vidéo
  const showVideo = ref(false);
  
  // Émettre un événement pour fermer les détails
  const emit = defineEmits(['close']);
  
  // Fonction pour fermer les détails
  const closeModal = () => {
    emit('close');
  };
  </script>
  