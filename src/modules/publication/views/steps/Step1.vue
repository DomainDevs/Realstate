<template>
  <form @submit.prevent="validateAndNext" class="space-y-6">

    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Paso 1: Información General</h2>
    
    <!-- Sección de Tipo de oferta -->
    <div>
      <label class="block text-lg font-semibold text-gray-700 mb-2">Tipo de oferta:</label>
      <div class="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
        <label
          v-for="option in offerOptions"
          :key="option.value"
          class="relative cursor-pointer"
        >
          <input
            type="radio"
            :id="option.value"
            :value="option.value"
            v-model="form.tipoOferta"
            class="sr-only peer"
            required
          />
          <div
            class="px-5 py-2 text-sm font-medium rounded-md
                   text-gray-700 peer-checked:bg-[#4caf50] peer-checked:text-white
                   transition-colors duration-200"
          >
            {{ option.label }}
          </div>
        </label>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

    <!-- Campo de Tipo de Inmueble (Ahora un select) -->
    <div>
      <label for="tipoInmueble" class="block text-sm font-medium text-gray-700">Tipo de Inmueble</label>
      <select
        id="tipoInmueble"
        v-model="form.tipoInmueble"
        required
        class="mt-1 block w-full rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2
        border border-gray-300
        "
      >
        <option disabled value="">Selecciona una opción</option>
        <option v-for="type in propertyTypesOptions" :key="type.value" :value="type.value">
          {{ type.label }}
        </option>
      </select>
    </div>

    <!-- Campo de Título -->
    <div>
      <label for="titulo" class="block text-sm font-medium text-gray-700">Título</label>
      <input 
        type="text" 
        id="titulo" 
        value=""
        v-model="form.titulo" 
        required
        spellcheck="true"
        class="mt-1 block w-full  rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2
        border border-gray-300
        "
      />
    </div>

    <!-- Campo de Precio -->
    <!--
    <div>
      <label for="precio" class="block text-sm font-medium text-gray-700">Precio (COP)</label>
      <input type="number" id="precio" value="1000000" v-model="form.precio" required
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
      />
    </div>
    -->

    <!-- Contacto -->
    <!-- Contacto: nombre -->
    <div>
      <label for="nombreContacto" class="block text-sm font-medium text-gray-700">Nombre de Contacto</label>
      <input
        type="text"
        id="nombreContacto"
        v-model="form.nombreContacto"
        required
        class="mt-1 block border w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
      />
    </div>

    <!-- Contacto: telefono -->
    <div>
      <label for="telefonoContacto" class="block text-sm font-medium text-gray-700">Teléfono</label>
      <input
        type="tel"
        id="telefonoContacto"
        v-model="form.telefonoContacto"
        required
        class="mt-1 block border w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
      />
    </div>

    <!-- Contacto: email -->
    <div>
      <label for="emailContacto" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
      <input
        type="email"
        id="emailContacto"
        v-model="form.emailContacto"
        required
        class="mt-1 block border w-full border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
      />
    </div>

    </div>
    <!-- Campo de Descripción -->
    <div>
      <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea
        id="descripcion"
        v-model="form.descripcion"
        rows="4"
        spellcheck="true"
        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
      ></textarea>
    </div>

    <div class="flex justify-end pt-4">
      <button
        type="submit"
        class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm 
        font-medium rounded-md text-white bg-[#4caf50] hover:bg-[#1c9c4b]"
      >
        Siguiente
      </button>
    </div>
  </form>

    <div class="home">
    <h1>Subir imágenes</h1>

    <ImageUploader
      uploadUrl="https://localhost:5001/api/upload"
      :maxFiles="10"
      :maxSizeMB="5"
    />
  </div>
</template>

<script setup>
import ImageUploader from '@/modules/home/components/imagesuploader/ImageUploader.vue';

import { ref, watch } from 'vue';

const props = defineProps(['formData']);
const emit = defineEmits(['update:formData', 'next-step']);

const offerOptions = ref([
  { label: 'Vender', value: 'venta' },
  { label: 'Arrendar', value: 'arriendo' },
  { label: 'Compartir', value: 'compartir' }
]);

// Nuevas opciones para el select de Tipo de Inmueble
const propertyTypesOptions = ref([
  { label: 'Casa', value: 'casa' },
  { label: 'Apartamento', value: 'apartamento' },
  { label: 'Aparta estudio', value: 'aparta-estudio' },
  { label: 'Oficina', value: 'oficina' },
  { label: 'Bodega', value: 'bodega' },
  { label: 'Consultorio', value: 'consultorio' },
  { label: 'Local comercial', value: 'local-comercial' },
  { label: 'Lote', value: 'lote' },
  { label: 'Finca', value: 'finca' }
]);

const form = ref({
  tipoOferta: 'venta', // Valor predeterminado para el tipo de oferta
  tipoInmueble: '',    // Valor predeterminado para el tipo de inmueble (vacío para forzar selección)
  ...props.formData.general
});

watch(form, (newVal) => {
  emit('update:formData', { ...props.formData, general: newVal });
}, { deep: true });

const validateAndNext = () => {
  if (form.value.tipoOferta && form.value.titulo && form.value.tipoInmueble
      && form.value.nombreContacto && form.value.telefonoContacto && form.value.emailContacto
  ) { //form.value.precio &&
    emit('next-step');
  } else {
    // Opcional: mostrar un mensaje de error más específico al usuario
    // alert('Por favor, completa todos los campos requeridos.');
  }
};
</script>
