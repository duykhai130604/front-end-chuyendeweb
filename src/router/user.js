
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
];
export default home;
