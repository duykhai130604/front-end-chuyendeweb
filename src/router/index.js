import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "./user.js";
import adminRoutes from "./admin.js"; 
import store from '@/utils/store.js';

const routes = [...userRoutes, ...adminRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.userRole !== null;  
    const requiredRole = to.meta.requiredRole;  

    if (to.matched.some(record => record.meta.requiresAuth)) {  
        if (!isAuthenticated) {
            next({ name: 'login' });  
        } else if (requiredRole && store.state.userRole !== requiredRole) {
            next({ name: 'home' });  
        } else {
            next();  
        }
    } else {
        next();  
    }
});


export default router;
