import { createRouter, createWebHistory } from "vue-router";
import userRoutes from "./user.js";
import adminRoutes from "./admin.js"; 

const routes = [...userRoutes, ...adminRoutes];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
