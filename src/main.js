import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios';
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; 
import store from '@/utils/store';
// Import Font Awesome library
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Thêm biểu tượng vào thư viện
library.add(faFilter);
const app = createApp(App);

app.config.warnHandler = function () {
    return null;
};
app.config.globalProperties.$axios = axios;
app.component('font-awesome-icon', FontAwesomeIcon);
    
app.use(router);
app.use(store);
app.use(CkeditorPlugin);
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
});

app.mount('#app');