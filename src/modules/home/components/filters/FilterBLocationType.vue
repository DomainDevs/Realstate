<template>
  <div class="filter-group flex flex-col md:flex-row md:items-center md:gap-4 w-full">

    <!-- Tabs + Select -->
    <div class="tabs tabs-box bg-base-300 m-0 inline-flex flex-wrap w-full md:flex-nowrap gap-2">

      <!-- Tabs: (comprar o arrendar o compartir) -->
      <input
        type="radio"
        name="offer_tab"
        role="tab"
        class="tab w-1/3 md:w-auto"
        aria-label="Comprar"
        :checked="offerType === 'comprar'"
        @change="offerType = 'comprar'"
      />

      <input
        type="radio"
        name="offer_tab"
        role="tab"
        class="tab w-1/3 md:w-auto"
        aria-label="Arrendar"
        :checked="offerType === 'arrendar'"
        @change="offerType = 'arrendar'"
      />

      <input
        type="radio"
        name="offer_tab"
        role="tab"
        class="tab w-1/3 md:w-auto"
        aria-label="Compartir"
        :checked="offerType === 'compartir'"
        @change="offerType = 'compartir'"
      />

      <!-- Select: Tipo de compra (solo si "comprar") -->
      <select
        v-model="selectedOption"
        :disabled="offerType !== 'comprar'"
        class="select select-bordered w-full md:w-auto max-w-xs bg-base-200 border-[#7c98a7;]"
      >
        <option disabled value="">Selecciona una opción</option>
        <option
          v-for="opt in options"
          :key="opt.id"
          :value="opt.id"
        >
          {{ opt.label }}
        </option>
      </select>

    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'

const offerType = ref('comprar')
const selectedOption = ref('')

// Array de objetos con id (código) y label (texto visible)
const options = [
  { id: 1, label: 'Todas' },
  { id: 2, label: 'Vivienda nueva' },
  { id: 3, label: 'Vivienda usada' },
  { id: 4, label: 'Vivienda nueva y usada' },
  { id: 5, label: 'Proyecto en plano' }
]
</script>

<style scoped>
.filter-group input,
.filter-group select {
  font-size: 16px;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* Línea inferior animada solo en radio seleccionado */
.tabs input.tab {
  border-bottom: 3px solid transparent; /* espacio para la línea */
  transition: border-color 0.4s ease;  /* animación suave */
}

.tabs input.tab:checked {
  border-bottom-color: #FF5500; /* línea naranja seleccionado */
}
</style>