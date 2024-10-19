import { createApp } from 'vue'; 
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios'; // Nhớ import axios
import { CkeditorPlugin } from '@ckeditor/ckeditor5-vue';
// Tạo ứng dụng Vue
const app = createApp(App);

// Cài đặt Axios cho toàn bộ ứng dụng
app.config.globalProperties.$axios = axios;

// Sử dụng router
app.use(router);
app.use( CkeditorPlugin )
// Mount ứng dụng
app.mount('#app');
