import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from './plugins/element-plus'
import {axios, VueAxios} from './utils/axios'
import router from './router'
import {createPinia} from "pinia"

const app = createApp(App)

app.use(ElementPlus)
    .use(VueAxios, axios)
    .use(router)
    .use(createPinia())
    .mount('#app')
