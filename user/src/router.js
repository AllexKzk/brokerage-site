import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from "@/views/Admin.vue";
import Login from "@/views/Login";
import BrokerPage from "@/views/BrokerPage.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About},
    { path: '/login', name: 'Login', component: Login},
    { path: '/page', name: 'BrokerPage', component: BrokerPage}
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name === 'Login' && localStorage.getItem('user'))
        next({ name: 'Home' });
    else if (to.name !== 'Login' && !localStorage.getItem("user"))
        next({ name: 'Login' });
    else
        next();
});

export default router