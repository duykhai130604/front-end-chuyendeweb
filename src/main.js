import { createApp, ref } from "vue"; 
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import { CkeditorPlugin } from "@ckeditor/ckeditor5-vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from "@/utils/store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Loader from "@/components/common/LoaderComponent.vue";

// Thêm biểu tượng vào thư viện
library.add(faFilter);
const app = createApp(App);

// Khởi tạo `isLoading` là một `ref` để có thể theo dõi và thay đổi
const isLoading = ref(false);

// Cấu hình cảnh báo và component toàn cục
app.config.warnHandler = function () {
  return null;
};
app.component("LoaderComponent", Loader);
app.component("font-awesome-icon", FontAwesomeIcon);

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(store);
app.use(CkeditorPlugin);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});

// Cập nhật interceptor cho axios
axios.interceptors.request.use(
  async (config) => {
    isLoading.value = true;  
    await new Promise((resolve) => setTimeout(resolve, 300)); 
    return config;
  },
  (error) => {
    isLoading.value = false; 
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    isLoading.value = false; 
    return response;
  },
  (error) => {
    isLoading.value = false; 
    return Promise.reject(error);
  }
);

app.mount("#app");
