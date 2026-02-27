<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Paso Final: Resumen y Publicación</h2>
    <p class="text-gray-500">
      Por favor, revisa todos los datos ingresados antes de publicar tu inmueble.
    </p>

    <div class="space-y-8 p-6 rounded-xl border border-gray-200 bg-white">
      <!-- Información General -->
      <section>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Información General</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-600">
          <p><strong>Tipo de oferta:</strong> {{ getOfferLabel(formData.general.tipoOferta) }}</p>
          <p><strong>Título:</strong> {{ formData.general.titulo }}</p>
          <p><strong>Precio:</strong> ${{ formData.general.precio?.toLocaleString() }}</p>
          <p><strong>Tipo de Inmueble:</strong> {{ formData.general.tipoInmueble }}</p>
          <p><strong>Nombre:</strong> {{ formData.general.nombreContacto }}</p>
          <p><strong>Teléfono:</strong> {{ formData.general.telefonoContacto }}</p>
          <p><strong>Email:</strong> {{ formData.general.emailContacto }}</p>
        </div>
        <div class="mt-4 text-gray-600">
          <p><strong>Descripción:</strong></p>
          <p class="whitespace-pre-line">{{ formData.general.descripcion }}</p>
        </div>
      </section>

      <!-- Características -->
      <section>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Características</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-6 text-gray-600">
          <p><strong>Área:</strong> {{ formData.caracteristicas.area }} m²</p>
          <p><strong>Habitaciones:</strong> {{ formData.caracteristicas.habitaciones }}</p>
          <p><strong>Baños:</strong> {{ formData.caracteristicas.banos }}</p>
          <p><strong>Parqueaderos:</strong> {{ formData.caracteristicas.parqueaderos || 'No aplica' }}</p>
          <p><strong>Antigüedad:</strong> {{ formData.caracteristicas.antiguedad || 'No especificada' }}</p>
        </div>
      </section>

      <!-- Ubicación -->
      <section>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Ubicación y Contacto</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-gray-600">
          <p><strong>Departamento:</strong> {{ getDepartamentoName(formData.ubicacion.departamento) }}</p>
          <p><strong>Ciudad:</strong> {{ getCiudadName(formData.ubicacion.ciudad) }}</p>
          <p><strong>Localidad:</strong> {{ getLocalidadName(formData.ubicacion.localidad) }}</p>
          <p><strong>Barrio:</strong> {{ getBarrioName(formData.ubicacion.barrio) }}</p>
          <p><strong>Dirección:</strong> {{ formData.ubicacion.direccion }}</p>
        </div>
      </section>

      <!-- Imágenes -->
      <section>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">Imágenes</h3>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <div v-for="(image, index) in formData.imagenes" :key="index" class="relative">
            <img :src="image.url" class="w-full h-24 object-cover rounded-md border" />
          </div>
        </div>
      </section>
    </div>

    <!-- latitud y longitud-->
    <div>
      <div class="flex gap-4 mb-4">
        <div>
          <label>Latitud:</label>
          <input type="number" step="0.000001" v-model.number="coords.lat" />
        </div>
        <div>
          <label>Longitud:</label>
          <input type="number" step="0.000001" v-model.number="coords.lng" />
        </div>
      </div>

      <MapSelector 
        :lat="coords.lat" 
        :lng="coords.lng" 
        @update:coords="coords = $event" 
      />
      <div class="mt-4">
        <label>Latitud: {{ coords.lat }}</label><br>
        <label>Longitud: {{ coords.lng }}</label>
      </div>
    </div>
    

    <!-- Botones -->
    <div class="flex justify-between pt-4">
      <button
        type="button"
        @click="$emit('prev-step')"
        class="inline-flex justify-center py-2 px-6 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        Anterior
      </button>
      <button
        type="button"
        @click="$emit('publish')"
        class="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm 
        font-medium rounded-md text-white bg-[#e36f46] hover:bg-[#D1623AFF]"
      >
        Publicar Inmueble
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted } from 'vue'

//hacer uso de la dirección
import MapSelector from "@/modules/publication/components/MapSelector.vue";

// Estado local
const coords = ref({ lat: null, lng: null })

const props = defineProps(['formData'])
const emit = defineEmits(['prev-step', 'publish'])

const departamentos = ref([])
const ciudades = ref([])
const localidades = ref([])
const barrios = ref([])

onMounted(async () => {
  // Cargar catálogos
  departamentos.value = await fetch('/data/departamentos.json').then(r => r.json())
  ciudades.value = await fetch('/data/ciudades.json').then(r => r.json())
  localidades.value = await fetch('/data/localidades.json').then(r => r.json())
  barrios.value = await fetch('/data/barrios.json').then(r => r.json())

  console.log("Departamentos cargados:", departamentos.value)
})


// Helpers para mostrar la descripción
const getDepartamentoName = (codigo) => {
  // Normalizar tipo para evitar problemas "01" vs 1
  const codStr = String(codigo).padStart(2, '0') 
  const d = departamentos.value.find(dep => dep.id === codStr)
  return d ? d.nombre : codigo
}
const getCiudadName = (id) => {
  const c = ciudades.value.find(c => c.id === id)
  return c ? c.nombre : id
}
const getLocalidadName = (id) => {
  const l = localidades.value.find(l => l.id === id)
  return l ? l.nombre : id
}
const getBarrioName = (id) => {
  const b = barrios.value.find(b => b.id === id)
  return b ? b.nombre : id
}

// Traducción de tipo de oferta
const getOfferLabel = (value) => {
  const labels = {
    venta: 'Vender',
    arriendo: 'Arrendar',
    compartir: 'Compartir'
  }
  return labels[value] || 'No especificado'
}
</script>
