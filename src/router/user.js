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
        path: "/reset",
        component: () => import("../views/user/ResetView.vue"),
    },
  {
  
        path: "/blogs",
        component: () => import("../views/user/blog/ListBlogsView.vue"),
        name:"blogs"
    },
];
export default home;
