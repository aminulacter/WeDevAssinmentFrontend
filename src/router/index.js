import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Product from "../views/Product.vue";
import EditProduct from "../views/EditProduct";
import Orders from "../views/Orders";
import store from "../store";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
    },

    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/create-product",
        name: "CreateProduct",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/CreateProduct.vue"),
        meta: {
            requiresAuth: true,

        },
        beforeEnter: (to, from, next) => {
            if (!(store.state.user.role == "Admin")) {
                next('/')
            }
            next()
        }
    },
    {
        path: "/product/:id",
        name: "Product",
        component: Product,
        props: true,
        meta: {
            requiresAuth: true

        },
        beforeEnter(routeTo, routeFrom, next) {

            routeTo.params.product = store.state.products.find(product => product.id == routeTo.params.id) ? store.state.products.find(product => product.id == routeTo.params.id) : { 'id': null, message: "product not found" }

            next();
        }

    },
    {
        path: "/edit-product/:id",
        name: "editProduct",
        component: EditProduct,
        props: true,
        meta: {
            requiresAuth: true
        },
        beforeEnter(routeTo, routeFrom, next) {

            routeTo.params.product = store.state.products.find(product => product.id == routeTo.params.id)
            if (!(store.state.user.role == "Admin")) {
                next('/')
            }
            next();
        }

    },
    {
        path: "/orders",
        name: "orders",
        component: Orders,
        meta: {
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    linkExactActiveClass: "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
});

router.beforeEach((to, from, next) => {
    const loggedIn = store.state.user;
    //const isAdmin = store.state.user.role == "Admin";
    // const loggedIn = localStorage.getItem("user");
    //console.log(to.matched.some(record => record.meta.requiresAuth));
    if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
        next("/");
    }
    if (to.matched.some(record => record.meta.requiresGuest) && loggedIn) {
        next("/");
    }


    next();
});

export default router;