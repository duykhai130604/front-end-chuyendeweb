import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios';
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; 

const app = createApp(App);

app.config.warnHandler = function () {
    return null;
};
app.config.globalProperties.$axios = axios;


app.use(router);
app.use(CkeditorPlugin);
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});

app.mount('#app');