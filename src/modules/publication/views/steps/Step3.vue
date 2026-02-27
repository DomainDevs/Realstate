<template>
  <form @submit.prevent="validateAndNext" class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Paso 3: Ubicación y Contacto</h2>
    <p class="text-gray-500">
      Ingresa los datos de ubicación de la propiedad y tu información de contacto.
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Departamento -->
      <div>
        <label for="departamento" class="block text-sm font-medium text-gray-700">Departamento</label>
        <select
          id="departamento"
          v-model="form.departamento"
          @change="onDepartamentoChange"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        >
          <option value="" disabled>Selecciona un departamento</option>
          <option v-for="dep in departamentos" :key="dep.id" :value="dep.id">{{ dep.nombre }}</option>
        </select>
      </div>

      <!-- Ciudad -->
      <div>
        <label for="ciudad" class="block text-sm font-medium text-gray-700">Ciudad</label>
        <select
          id="ciudad"
          v-model="form.ciudad"
          @change="onCiudadChange"
          :disabled="!ciudades.length"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        >
          <option value="" disabled>Selecciona una ciudad</option>
          <option v-for="c in ciudades" :key="c.id" :value="c.id">{{ c.nombre }}</option>
        </select>
      </div>

      <!-- Localidad -->
      <div>
        <label for="localidad" class="block text-sm font-medium text-gray-700">Localidad</label>
        <select
          id="localidad"
          v-model="form.localidad"
          @change="onLocalidadChange"
          :disabled="!localidades.length"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        >
          <option value="" disabled>Selecciona una localidad</option>
          <option v-for="l in localidades" :key="l.id" :value="l.id">{{ l.nombre }}</option>
        </select>
      </div>

      <!-- Barrio -->
      <div>
        <label for="barrio" class="block text-sm font-medium text-gray-700">Barrio</label>
        <select
          id="barrio"
          v-model="form.barrio"
          :disabled="!barrios.length"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        >
          <option value="" disabled>Selecciona un barrio</option>
          <option v-for="b in barrios" :key="b.id" :value="b.id">{{ b.nombre }}</option>
        </select>
      </div>

      <!-- Dirección -->
      <div>
        <label for="direccion" class="block text-sm font-medium text-gray-700">Dirección</label>
        <input
          type="text"
          id="direccion"
          v-model="form.direccion"
          required
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        />
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
        class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium 
        rounded-md text-white bg-[#1e1d85] hover:bg-[#1e1d85]"
      >
        Siguiente
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

//funciones del step by step
const props = defineProps(['formData']);
const emit = defineEmits(['update:formData', 'next-step', 'prev-step']);

const form = ref(props.formData.ubicacion || {});


//funciones resolver combos
// Listas dinámicas
const departamentos = ref([]);
const todasCiudades = ref([]);
const todasLocalidades = ref([]);
const todasBarrios = ref([]);

const ciudades = ref([]);
const localidades = ref([]);
const barrios = ref([]);

// Cargar catálogos al montar
onMounted(async () => {
  departamentos.value = await (await fetch('/data/departamentos.json')).json();
  todasCiudades.value = await (await fetch('/data/ciudades.json')).json();
  todasLocalidades.value = await (await fetch('/data/localidades.json')).json();
  todasBarrios.value = await (await fetch('/data/barrios.json')).json();
});

// Cuando cambia departamento
const onDepartamentoChange = () => {
  form.value.ciudad = '';
  form.value.localidad = '';
  form.value.barrio = '';
  localidades.value = [];
  barrios.value = [];

  if (form.value.departamento) {
    ciudades.value = todasCiudades.value.filter(c => c.departamentoId === form.value.departamento);
  }
};

// Cuando cambia ciudad
const onCiudadChange = () => {
  form.value.localidad = '';
  form.value.barrio = '';
  barrios.value = [];

  if (form.value.ciudad) {
    localidades.value = todasLocalidades.value.filter(
      l => l.ciudadId === form.value.ciudad || l.ciudad === form.value.ciudad
    );
  }
};

// Cuando cambia localidad
const onLocalidadChange = () => {
  form.value.barrio = '';

  if (form.value.localidad) {
    barrios.value = todasBarrios.value.filter(b => b.localidadId === form.value.localidad);
  }
};

// Sincronizar con el padre
watch(form, (newVal) => {
  emit('update:formData', { ...props.formData, ubicacion: newVal });
}, { deep: true });

const validateAndNext = () => {
  if (
    form.value.departamento &&
    form.value.ciudad &&
    form.value.localidad &&
    form.value.barrio &&
    form.value.direccion 
    //&& form.value.nombreContacto && form.value.telefonoContacto && form.value.emailContacto
  ) {
    emit('next-step');
  }
};
</script>
