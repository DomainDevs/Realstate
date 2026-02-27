<template>
  <div class="py-6 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
      <div class="text-center mb-2">
        <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-5xl">
          {{ pageData.mainTitle }}
        </h1>
        <p class="mt-4 text-xl text-gray-600">
          {{ pageData.mainSubtitle }}
        </p>
      </div>

      <div class="text-right mb-8">
        <a :href="pageData.topLink.url" class="text-[#DF724AFF] hover:text-[#D65F33FF] 
        font-semibold text-lg transition-colors 
        ">
          {{ pageData.topLink.text }}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        <PlanCard 
          v-for="plan in pageData.plans" 
          :key="plan.id" 
          :plan="plan" 
          @select-plan="handlePlanSelection" 
          class="h-full"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PlanCard from '@/modules/publication/components/PlanCard.vue'; // Importa el nuevo componente PlanCard

const pageData = ref({
  mainTitle: 'Cargando...',
  mainSubtitle: 'Cargando...',
  topLink: { text: '', url: '#' },
  plans: []
});

onMounted(async () => {
  try {
    const res = await fetch('/data/publishPlansData.json');
    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();

    // Validación mínima
    if (!data.plans || !Array.isArray(data.plans)) {
      throw new Error('Estructura JSON inválida');
    }

    pageData.value = {
      mainTitle: data.mainTitle ?? 'Planes',
      mainSubtitle: data.mainSubtitle ?? '',
      topLink: data.topLink ?? { text: '', url: '#' },
      plans: data.plans
    };

  } catch (error) {
    console.error('Error loading publish plans data:', error);

    pageData.value = {
      mainTitle: 'Error al cargar los planes',
      mainSubtitle: 'Por favor, intenta de nuevo más tarde.',
      topLink: { text: '', url: '#' },
      plans: []
    };
  }
});


// Maneja el evento emitido por PlanCard
const handlePlanSelection = (planId) => {
  console.log(`Plan seleccionado desde PlanCard: ${planId}`);
  alert(`Has seleccionado el plan ${planId}.`);
  // Aquí iría la lógica para redirigir, abrir una modal de pago, etc.
};
</script>

<style scoped>
/* No se necesitan estilos adicionales si Tailwind CSS cubre todo */
</style>