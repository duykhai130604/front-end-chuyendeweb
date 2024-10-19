const home = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/user/HomeView.vue"),
    },
    {
        path: "/products",
        component: () => import("../views/user/ProductsView.vue"),
    },
    {
        path: "/login",
        component: () => import("../views/user/LoginView.vue"),
        name: "login"
    },
    {
        path: "/register",
        component: () => import("../views/user/RegisterView.vue"),
    },
];
export default home;
