// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import vSelect from 'vue-select'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.component('v-select', vSelect);
Vue.use(VModal);

export const bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
