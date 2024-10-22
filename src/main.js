import { createApp } from 'vue'; 
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios'; // Nhớ import axios
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
// Tạo ứng dụng Vue
const app = createApp(App);
app.config.warnHandler = function () {
    // Tắt cảnh báo
    return null;
};
app.config.globalProperties.$axios = axios;

// Sử dụng router
app.use(router);
app.use(CkeditorPlugin)
app.use(Toast);
// Mount ứng dụng
app.mount('#app');
