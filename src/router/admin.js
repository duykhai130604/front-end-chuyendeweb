const admin = [
    {
        path: "/admin",
        component: () => import("../views/admin/HomeView.vue"),
    },
    {
        path: "/admin/products",
        component: () => import("../views/admin/ProductListView.vue"),
    },
    {
        path: "/admin/products/addNewProduct",
        component: () => import("../views/admin/AddNewProductView.vue"),
    },
    {
        path: "/admin/productVariants",
        component: () => import("../views/admin/ProductVariantsView.vue"),
    }
];
export default admin;