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
    },
    {
        path: "/admin/categories",
        component: () => import("../views/admin/category/ListCategoriesView.vue"),
        name:"list-categories"
    },
    {
        path: "/admin/edit-category/:idEncode",
        component: () => import("../views/admin/category/EditCategoryView.vue"),
        name:"edit-category"
    },
    {
        path: "/admin/add-category",
        component: () => import("../views/admin/category/AddCategoryView.vue"),
        name:"add-category"
    }  ,  
    //blog
    {
        path: "/admin/blogs",
        component: () => import("../views/admin/blog/ListBlogsView.vue"),
        name: "list-blogs"
    },
    {
        path: "/admin/edit-blog/:idEncode",
        component: () => import("../views/admin/blog/EditBlogView.vue"),
        name: "edit-blog"
    },
    {
        path: "/admin/add-blog",
        component: () => import("../views/admin/blog/AddBlogView.vue"),
        name: "add-blog"
    } 
];
export default admin;