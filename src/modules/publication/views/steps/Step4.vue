<template>
  <form @submit.prevent="validateAndNext" class="space-y-6">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Paso 4: Fotos del Inmueble</h2>
    <p class="text-gray-500">
      Sube fotos de tu propiedad. Las fotos son clave para atraer a los interesados. Puedes subir varias imágenes a la vez.
    </p>

    <div>
      <label for="imagenes" class="block text-sm font-medium text-gray-700 mb-1">
        Seleccionar fotos
      </label>
      <input
        type="file"
        id="imagenes"
        multiple
        accept="image/*"
        @change="handleFileChange"
        required
        class="block w-full text-sm text-gray-500
               file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0
               file:text-sm file:font-semibold
               file:bg-orange-50 file:text-[#e36f46]
               hover:file:bg-orange-10"
      />
    </div>

    <div v-if="form.length" class="mt-4">
      <h3 class="text-lg font-medium text-gray-700 mb-2">Imágenes seleccionadas:</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <div v-for="(image, index) in form" :key="index" class="relative group">
          <img :src="image.url" class="w-full h-24 object-cover rounded-md border" />
          <button
            type="button"
            @click="removeImage(index)"
            class="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Eliminar imagen"
          >
            ×
          </button>
        </div>
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
        rounded-md text-white bg-[#1e1d85] hover:bg-[#1A186EFF]"
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

// Crea una referencia local para los datos de este paso, que son un array de imágenes
const form = ref(props.formData.imagenes || []);

// Sincroniza los cambios con el componente padre
watch(form, (newVal) => {
  emit('update:formData', { ...props.formData, imagenes: newVal });
}, { deep: true });

// Maneja la selección de archivos
const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  const newImages = files.map(file => ({
    file: file,
    url: URL.createObjectURL(file)
  }));
  form.value = [...form.value, ...newImages];
};

// Elimina una imagen de la vista previa
const removeImage = (index) => {
  form.value.splice(index, 1);
};

const validateAndNext = () => {
  // Lógica de validación. Por ejemplo, verificar que se haya cargado al menos una imagen.
  if (form.value.length > 0) {
    emit('next-step');
  } else {
    alert('Por favor, sube al menos una imagen.');
  }
};
</script>