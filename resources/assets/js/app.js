import Axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import JQuery from 'jquery'

window.Vue = Vue;
window.Vuex = Vuex;
window.Axios = Axios;
window.Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.use(Vuex);

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.Axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}


try {
    window.$ = window.jQuery = JQuery;

    require('bootstrap');
}
catch (e) {
}

