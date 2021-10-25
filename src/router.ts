import { createRouter, createWebHistory } from "vue-router";

//Layouts
import Layout from "./components/interface/Layout.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Layout,
            name: "inbox"
        }
    ]
})

export default router;