const admin = [
    {
        path: "/admin",
        component: () => import("../views/admin/product/HomeView.vue"),
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/products",
        component: () => import("../views/admin/product/ProductListView.vue"),
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/products/addNewProduct",
        component: () => import("../views/admin/product/AddNewProductView.vue"),
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: '/admin/products/edit/:id',
        name: 'editProduct',
        component: () => import("../views/admin/product/EditProductView.vue"),
        
        props: true,
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/productVariants/:id",
        component: () => import("../views/admin/product_variant/ProductVariantsView.vue"),
        name: 'productVariants',
        props: true,
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/products/addNewVariants",
        component: () => import("../views/admin/product_variant/AddNewVariant.vue"),
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/products/editVariant/:id",
        name: "editVariant",
        component: () => import("../views/admin/product_variant/EditVariant.vue"),
        props: true,
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/categories",
        component: () => import("../views/admin/category/ListCategoriesView.vue"),
        name: "list-categories",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/edit-category/:idEncode",
        component: () => import("../views/admin/category/EditCategoryView.vue"),
        name: "edit-category",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/add-category",
        component: () => import("../views/admin/category/AddCategoryView.vue"),
        name: "add-category",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/move-category-assets/:idEncode",
        component: () => import("../views/admin/category/DeleteCategoryView.vue"),
        name: "category-assets",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    // blog
    {
        path: "/admin/blogs",
        component: () => import("../views/admin/blog/ListBlogsView.vue"),
        name: "list-blogs",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/edit-blog/:idEncode",
        component: () => import("../views/admin/blog/EditBlogView.vue"),
        name: "edit-blog",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/add-blog",
        component: () => import("../views/admin/blog/AddBlogView.vue"),
        name: "add-blog",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    },
    {
        path: "/admin/orders",
        component: () => import("../views/admin/order/OrderView.vue"),
        name: "orders",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    }
    ,
    {
        path: "/admin/purchase",
        component: () => import("../views/admin/order/PurchaseView.vue"),
        name: "purchase",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    }
    ,
    {
        path: "/admin/cancled",
        component: () => import("../views/admin/order/OrderCancled.vue"),
        name: "cancled",
        meta: { requiresAuth: true, requiresAdmin: 'admin' }
    }
];

export default admin;
