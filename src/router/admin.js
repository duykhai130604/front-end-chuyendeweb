const admin = [
    {
        path: "/admin",
        component: () => import("../views/admin/HomeView.vue"),
    },
    {
        path: "/admin/categories",
        component: () => import("../views/admin/category/ListCategoriesView.vue"),
    },
    {
        path: "/edit-category/:idEncode",
        component: () => import("../views/admin/category/EditCategoryView.vue"),
        name:"edit-category"
    }
];
export default admin;