import msg from './msg.vue'

let $vm;

export default {
  install(Vue, options) {
    if (!$vm) {
      const msgPlugin = Vue.extend(msg);
      $vm = new msgPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }
    $vm.show = false;
    let popMsg = {
      show(text, time = 1000) {
        $vm.show = true;
        $vm.text = text;
        //一段时间后隐藏
        setTimeout(() => {
          this.hide();
        }, time);
      },
      hide() {
        $vm.show = false;
      }
    };
    if (!Vue.$popMsg) {
      Vue.$popMsg = popMsg;
    }
    Vue.mixin({
      created() {
        this.$popMsg = Vue.$popMsg;
      }
    })
  }
}
