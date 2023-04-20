import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import Scrollbar from 'vue3-perfect-scrollbar-z'
import 'vue3-perfect-scrollbar-z/dist/styles.css';


const pinia = createPinia()

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .use(Scrollbar)
  .mount('#app')
