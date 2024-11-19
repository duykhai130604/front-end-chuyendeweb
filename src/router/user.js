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
        meta: {requiresAuth: true}
            
    },
    {
        path: "/checkout",
        component: () => import("../views/user/checkout/CheckoutView.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/reset",
        component: () => import("../views/user/ResetView.vue"),
        meta: { requiresAuth: true }
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
    {
        path: "/history",
        component: () => import("../views/user/user_order/UserOrderView.vue"),
        name:"history"
    },
    {
        path: "/review/:id/:variant/:order",
        component: () => import("../views/user/review/AddReviewView.vue"),
        name:"review"
    },
];

export default home;
