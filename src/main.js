// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import rem from './js/rem';
import popMsg from './components/pop/msg/msg.js'
import popConfirm from './components/pop/confirm/confirm.js'

rem();
Vue.config.productionTip = false;

Vue.use(popMsg);
Vue.use(popConfirm);
Vue.prototype.$popConfirm = popConfirm;

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
