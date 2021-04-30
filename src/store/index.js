import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import config from "../../config.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null,
        token: null,
        products: null,
        categories: null,
        orders: null,
    },
    mutations: {
        SET_USER_DATA(state, userData) {
            state.user = userData;
            //localStorage.setItem("user", JSON.stringify(userData.user));
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        CLEAR_USER_DATA(state) {
            // localStorage.removeItem("user");
            state.user = null;
            state.token = null;
            location.reload();
        },
        SET_PRODUCTS(state, products) {
            state.products = products;

        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories;

        },
        SET_ORDERS(state, orders) {
            state.orders = orders;

        },
        UPDATE_ORDER(state, updatedorder) {
            state.orders.map(order => {
                if (order.id == updatedorder.id) {
                    order.status = updatedorder.status
                }
                return order;
            })
        }

    },
    plugins: [createPersistedState()],
    actions: {
        async login({ commit }, credentials) {
            const formData = new FormData();
            formData.append('email', credentials.email);
            formData.append('password', credentials.password);
            await axios
                .post(config.API_URL + "/login", formData, {
                    headers: {

                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    if (data.status) {
                        commit("SET_USER_DATA", data.user);
                        commit("SET_TOKEN", data.Token)
                        return;
                    } else {
                        throw new Error(data.Error)
                    };

                });
        },
        async register(context, credentials) {
            const formData = new FormData();
            formData.append('name', credentials.name);
            formData.append('email', credentials.email);
            formData.append('password', credentials.password);
            formData.append('passwordconfirm', credentials.passwordconfirm);
            await axios
                .post(config.API_URL + "/register", formData, {
                    headers: {

                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    if (data.status) {
                        console.log(data.message)
                        return;
                    } else {
                        throw new Error(data.Error)
                    };

                });
        },

        logout({ commit }) {

            commit("CLEAR_USER_DATA");
        },

        fetchProducts({ commit, dispatch, state }) {
            const formData = new FormData();
            formData.append('userId', state.user.id);
            axios
                .post(config.API_URL + "/products", formData, {
                    headers: {

                        'Authorization': 'Bearer ' + state.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    // console.log(data.user);
                    if (data.status) {
                        commit("SET_PRODUCTS", data.products);
                        commit("SET_CATEGORIES", data.categories);
                    } else {
                        dispatch('logout');
                        throw new Error(data.error.message)
                    }

                });

        },

        deleteProduct({ commit, state, dispatch }, payload) {
            const formData = new FormData();
            formData.append('userId', state.user.id);
            formData.append('id', payload.id)
            axios
                .post(config.API_URL + "/deleteProduct", formData, {
                    headers: {

                        'Authorization': 'Bearer ' + state.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => {
                    // console.log(data.user);
                    if (data.status) {
                        commit("SET_PRODUCTS", data.products);

                    }

                }).catch(error => {
                    console.log(error)
                    dispatch('logout')
                });
        },
        async orderProduct({ commit, state, dispatch }, payload) {
            const formData = new FormData();
            formData.append('userId', state.user.id);
            formData.append('product_id', payload.productId)
            axios
                .post(config.API_URL + "/createOrder", formData, {
                    headers: {

                        'Authorization': 'Bearer ' + state.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => commit("SET_ORDERS", data.orders)).catch(error => {
                    console.log(error)
                    dispatch('logout')
                });
        },
        fetchOrders({ commit, state, dispatch }) {
            const formData = new FormData();
            formData.append('userId', state.user.id);
            axios
                .post(config.API_URL + "/orders", formData, {
                    headers: {

                        'Authorization': 'Bearer ' + state.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => commit("SET_ORDERS", data.orders)

                ).catch(() => dispatch('logout'));
        },
        updateOrders({ commit, state, dispatch }, payload) {
            const formData = new FormData();
            formData.append('userId', state.user.id);
            formData.append('id', payload.orderId);
            formData.append('status', payload.status);
            axios
                .post(config.API_URL + "/editOrder", formData, {
                    headers: {

                        'Authorization': 'Bearer ' + state.token,
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(({ data }) => commit("UPDATE_ORDER", data.order)

                ).catch(() => dispatch('logout'));

        }

    },
    getters: {
        loggedIn(state) {
            return !!state.user;
        },

        products(state) {
            return state.products;
        },
        product: (state) => (id) => {
            return state.products.find(product => product.id == id);
        },
        adminUser(state) {
            if (state.user) {
                return state.user.role == 'Admin'
            }
            return false
        },
        categoryName: (state) => (id) => {
            return state.categories.find(category => category.id === id).categoryName
        },
        categories(state) {
            return state.categories;
        },
        orders(state) {
            return state.orders;
        }
    },
    modules: {},
});