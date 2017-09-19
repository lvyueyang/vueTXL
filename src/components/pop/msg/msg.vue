<template>
  <transition name="fade">
    <div class="pop" v-show="show">
      <div class="pop-wrapper">
        <div class="msg-content" v-html="text"></div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'pop-msg',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: '正在加载中...'
      }
    }
  }
</script>
<style lang="scss">

</style>
