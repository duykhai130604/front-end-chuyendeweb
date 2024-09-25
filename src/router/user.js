
const home = [
    {
        path: "/",
        component: () => import("../layouts/user.vue"),
        children: [
            {
                path: "home",
                name: "user-home",
                component: () => import("../pages/user/Home.vue"),
            },
        ],
    },
];
export default home;
