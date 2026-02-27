import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

const savedTheme = localStorage.getItem("theme") || "airstyleLight"
document.documentElement.setAttribute("data-theme", savedTheme)

createApp(App)
  .use(router)
  .mount('#app')


  document.documentElement.getAttribute('data-theme')

  console.log("Theme es:"+localStorage.getItem("theme"));



  