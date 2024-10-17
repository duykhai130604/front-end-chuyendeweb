import { createApp } from 'vue'; 
import App from './App.vue';
import router from './router/index.js';

createApp(App).use(router).mount('#app');


// Cài đặt Axios cho toàn bộ ứng dụng
app.config.globalProperties.$axios = axios;


// Mount ứng dụng
app.mount('#app');

