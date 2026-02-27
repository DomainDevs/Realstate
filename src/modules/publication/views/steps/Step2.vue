<template>
  <form @submit.prevent="validateAndNext" class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Paso 2: Características</h2>
    <p class="text-gray-500">Detalles sobre el espacio y las amenidades de tu inmueble.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div>
        <label for="area" class="block text-sm font-medium text-gray-700">Área (m²)</label>
        <input
          type="number"
          id="area"
          v-model="form.area"
          required
          min="1"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        />
      </div>

      <div>
        <label for="habitaciones" class="block text-sm font-medium text-gray-700">Habitaciones</label>
        <input
          type="number"
          id="habitaciones"
          v-model="form.habitaciones"
          required
          min="0"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        />
      </div>

      <div>
        <label for="banos" class="block text-sm font-medium text-gray-700">Baños</label>
        <input
          type="number"
          id="banos"
          v-model="form.banos"
          required
          min="0"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        />
      </div>

      <div>
        <label for="parqueaderos" class="block text-sm font-medium text-gray-700">Parqueaderos</label>
        <input
          type="number"
          id="parqueaderos"
          v-model="form.parqueaderos"
          min="0"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        />
      </div>

      <div>
        <label for="antiguedad" class="block text-sm font-medium text-gray-700">
          Antigüedad
        </label>
        <select
          id="antiguedad"
          v-model="form.antiguedad"
          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 bg-white"
        >
          <option value="">Seleccionar</option>
          <option
            v-for="option in antiguedadOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

    </div>

    <div class="flex justify-between pt-4">
      <button
        type="button"
        @click="$emit('prev-step')"
        class="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Anterior
      </button>
      <button
        type="submit"
        class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm 
        font-medium rounded-md text-white bg-[#25d366] hover:bg-[#198f44]"
      >
        Siguiente
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['formData']);
const emit = defineEmits(['update:formData', 'next-step', 'prev-step']);

// Crea una referencia local para los datos de este paso
const form = ref(props.formData.caracteristicas || {});

// Sincroniza los cambios con el componente padre
watch(form, (newVal) => {
  emit('update:formData', { ...props.formData, caracteristicas: newVal });
}, { deep: true });

const validateAndNext = () => {
  // Aquí puedes agregar validaciones adicionales
  if (form.value.area && form.value.habitaciones && form.value.banos) {
    emit('next-step');
  }
};


// Opciones para el select de Antigüedad
const antiguedadOptions = ref([
  { label: 'Nuevo', value: 'nuevo' },
  { label: '0 - 5 años', value: '0-5' },
  { label: '6 - 10 años', value: '6-10' },
  { label: '11 - 20 años', value: '11-20' },
  { label: '21 - 30 años', value: '21-30' },
  { label: 'Más de 30 años', value: '30+' }
]);

</script>