import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "./user.js";
import adminRoutes from "./admin.js"; 
import axios from "axios"; 
const routes = [...userRoutes, ...adminRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    if (to.meta.requiresAdmin && userRole !== 'admin') {
        next({ name: 'home' });
    } 
    else if (to.meta.requiresAuth && !authToken) {
        next({ name: 'login' });
    } 
    else {
        next();
    }
});

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            router.push({ name: 'login' });
        }
        return Promise.reject(error);
    }
);

export default router;
