
const home = [
    {
        path: "/",
        component: () => import("../views/user/HomeView.vue"),
        children: [
            {
                path: "home",
                name: "user-home",
                component: () => import("../pages/user/HomePage.vue"),
            },
        ],
    },
    {
        path: "/products",
        component: () => import("../views/user/ProductsView.vue"),
        children: [
            {
                path: "products",
                name: "user-products",
                component: () => import("../pages/user/Products.vue"),
            },
        ],
    },
];
export default home;
