const home = [
    {
        path: "/",
        name: "home",
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
    {
        path: "/cart",
        component: () => import("../views/user/cart/CartView.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/reset",
        component: () => import("../views/user/ResetView.vue"),
    },
    {
        path: "/blogs",
        component: () => import("../views/user/blog/ListBlogsView.vue"),
        name: "blogs"
    },
    {
        path: "/product/:id",
        component: () => import("../views/user/product/ProductDetailView.vue"),
        name:"product"
    },
];

export default home;
