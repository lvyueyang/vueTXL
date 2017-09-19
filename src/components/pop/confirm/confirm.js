import confirm from './confirm.vue'

let $vm;

export default {
  install(Vue, options) {
    if (!$vm) {
      const ConfirmPlugin = Vue.extend(confirm);
      $vm = new ConfirmPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    $vm.show = false;
    let $popConfirm = function (body,fn1,fn2) {
      $vm.body = body;
      $vm.show = true;
      $vm.yes = fn1;
      $vm.no = fn2 || function () {
        return true;
      };
    };
    if (!Vue.$popConfirm) {
      Vue.$popConfirm =$popConfirm;
    }
    Vue.mixin({
      created() {
        this.$popConfirm = Vue.$popConfirm;
      }
    })
  }
}
