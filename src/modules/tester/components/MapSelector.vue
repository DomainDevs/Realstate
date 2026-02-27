<template>
  <div id="map" style="height: 400px; width: 100%;"></div>
</template>

<script setup>
import { ref, watch, onMounted, defineExpose } from 'vue'
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps({ 
  lat: Number, 
  lng: Number, 
  codigo: String,   // código postal como string (puede incluir letras)
  address: String   // dirección opcional
})
const emit = defineEmits(['update:coords', 'update:address'])

const map = ref(null)
const marker = ref(null)
const currentZoom = ref(13)  // guardamos el zoom actual

function placeMarker(lat, lng, codigo = null, address = '') {
  if (marker.value) {
    marker.value.setLatLng([lat, lng])
  } else {
    marker.value = L.marker([lat, lng], { draggable: true }).addTo(map.value)
    marker.value.on("dragend", (e) => {
      const pos = e.target.getLatLng()
      emit("update:coords", { lat: pos.lat, lng: pos.lng, codigo, address })
      emit("update:address", address)
    })
  }

  // respetamos el zoom actual
  map.value.setView([lat, lng], currentZoom.value)

  // emit inmediato cuando colocamos el marcador
  emit("update:coords", { lat, lng, codigo, address })
  emit("update:address", address)
}

onMounted(() => {
  map.value = L.map("map").setView([props.lat || 4.6, props.lng || -74.08], currentZoom.value)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map.value)

  // capturamos el zoom cada vez que el usuario cambia
  map.value.on("zoomend", () => {
    currentZoom.value = map.value.getZoom()
  })

  map.value.on("click", (e) => {
    const { lat, lng } = e.latlng
    placeMarker(lat, lng)
  })

  if (props.lat && props.lng) placeMarker(props.lat, props.lng, props.codigo, props.address)
})

watch(() => [props.lat, props.lng], ([newLat, newLng]) => {
  if (newLat && newLng) placeMarker(newLat, newLng, props.codigo, props.address)
})

defineExpose({ placeMarker })
</script>

<style scoped>
#map { border-radius: 10px; }

.custom-pin {
  background-color: red;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  border: 2px solid white;
}
</style>
