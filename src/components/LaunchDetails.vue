<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white p-6 rounded-lg max-w-2xl w-full">
      <h2 class="text-2xl font-bold mb-4">{{ launch.name }}</h2>

      <!-- Image de la mission -->
      <img
        v-if="launch.links.patch.large"
        :src="launch.links.patch.large"
        :alt="launch.name"
        class="mb-4"
      />

      <!-- Date de lancement -->
      <p><strong>Date :</strong> {{ launchDate }}</p>

      <!-- Description de la mission -->
      <p class="mt-2"><strong>Description :</strong> {{ launch.details || 'Aucune description disponible.' }}</p>

      <!-- Lieu de lancement -->
      <p class="mt-2"><strong>Lieu de lancement :</strong> {{ launch.launchpad.name }}</p>

      <!-- Charges utiles -->
      <p class="mt-2"><strong>Charges utiles :</strong></p>
      <ul>
        <li v-for="payload in launch.payloads" :key="payload.id">
          {{ payload.name }} ({{ payload.type }})
        </li>
      </ul>

      <!-- Clients -->
      <p class="mt-2"><strong>Clients :</strong></p>
      <ul>
        <li v-for="customer in launch.payloads.flatMap((p) => p.customers)" :key="customer">
          {{ customer }}
        </li>
      </ul>

      <!-- Bouton pour afficher/masquer la vidéo YouTube -->
      <button
        @click="showVideo = !showVideo"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {{ showVideo ? 'Masquer la vidéo' : 'Afficher la vidéo' }}
      </button>

      <!-- Vidéo YouTube -->
      <div v-if="showVideo && launch.links.youtube_id" class="mt-4">
        <iframe
          :src="`https://www.youtube.com/embed/${launch.links.youtube_id}`"
          width="100%"
          height="315"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Bouton pour fermer le modal -->
      <button
        @click="closeModal"
        class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Props pour recevoir les données du lancement
const props = defineProps({
  launch: {
    type: Object,
    required: true,
  },
});

// État pour afficher/masquer la vidéo
const showVideo = ref(false);

// Émettre un événement pour fermer le modal
const emit = defineEmits(['close']);

// Fonction pour fermer le modal
const closeModal = () => {
  emit('close');
};

// Propriété calculée pour formater la date de lancement
const launchDate = computed(() => {
  return new Date(props.launch.date_utc).toLocaleDateString();
});
</script>