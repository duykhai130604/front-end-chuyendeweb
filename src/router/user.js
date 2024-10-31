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
<<<<<<< HEAD
        path: "/cart",
        component: () => import("../views/user/cart/CartView.vue"),
=======
        path: "/reset",
        component: () => import("../views/user/ResetView.vue"),
    },
  {
  
        path: "/blogs",
        component: () => import("../views/user/blog/ListBlogsView.vue"),
        name:"blogs"
>>>>>>> 5dc3fdfd5ce6aaec5b45c9c6898e2fe189563c71
    },
];
export default home;
