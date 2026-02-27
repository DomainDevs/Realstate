<template>
  <div
    :class="[
      'bg-white rounded-xl shadow-lg p-6 flex flex-col',
      plan.highlight ? 'border-4 border-[#10c4d7]' : 'border border-gray-200'
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold text-gray-800">{{ plan.title }}</h2>
      <span v-if="plan.isNew" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <svg class="w-2.5 h-2.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-7-9a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm5 4a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        Nuevo
      </span>
    </div>
    <p class="text-gray-500 text-sm mb-4">{{ plan.duration }}</p>

    <div v-if="plan.features && plan.features.length" class="flex-grow mb-6">
      <ul class="space-y-2 text-gray-700">
        <li v-for="(feature, idx) in displayedFeatures" :key="idx" class="flex items-start">
          <svg v-if="feature.type === 'check'" class="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else-if="feature.type === 'info'" class="h-5 w-5 text-[#e36f46] mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span :class="{'font-semibold': feature.highlight}">{{ feature.text }}</span>
        </li>
      </ul>
      <button
        v-if="plan.features.length > 3"
        @click="toggleFeatures"
        class="mt-4 text-[#e36f46] hover:text-[#e36f46] font-semibold transition-colors focus:outline-none"
      >
        {{ showMore ? 'Ver menos' : 'Ver más detalles' }}
      </button>
    </div>

    <div v-if="plan.price" class="mt-auto pt-6 border-t border-gray-200">
      <p v-if="plan.oldPrice" class="text-sm text-gray-500 line-through">${{ plan.oldPrice.toLocaleString('es-CO') }}</p>
      <div class="flex items-end justify-between">
        <span class="text-3xl font-extrabold text-gray-900">${{ plan.price.toLocaleString('es-CO') }}</span>
        <span v-if="plan.discount" class="text-green-600 font-semibold bg-green-50 px-3 py-1 rounded-full text-sm">
          Ahorra un {{ plan.discount }}%
        </span>
      </div>
      <p v-if="plan.priceDescription" class="text-xs text-gray-500 mt-1">{{ plan.priceDescription }}</p>
    </div>

    <button
      @click="selectPlan(plan.id)"
      :class="[
        'mt-6 w-full py-3 rounded-md font-semibold transition-colors text-white',
        plan.buttonVariant === 'primary' ? 'bg-[#10c4d7] hover:bg-[#10c4d7] shadow-md ' : 
        'bg-transparent border border-[#10c4d7] text-zinc-900  hover:bg-purple-50'
      ]"
    >
      {{ plan.buttonText }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  plan: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['select-plan']);

// Estado local para controlar si se muestran todas las características
const showMore = ref(false);

// Propiedad computada para mostrar solo las características visibles
const displayedFeatures = computed(() => {
  return showMore.value ? props.plan.features : props.plan.features.slice(0, 3);
});

// Función para alternar la visibilidad de las características
const toggleFeatures = () => {
  showMore.value = !showMore.value;
};

// Función para emitir la selección del plan al componente padre
const selectPlan = (planId) => {
  emit('select-plan', planId);
};
</script>

<style scoped>
/* No se necesitan estilos adicionales si Tailwind CSS cubre todo */
</style>