<template>
  <transition name="fade">
    <div class="pop" v-show="show">
      <div class="pop-wrapper fade">
        <div class="confirm-content">
          <div class="confirm-header" v-html="header"></div>
          <div class="confirm-body" v-html="body"></div>
          <div class="confirm-footer">
            <button class="cancel" @click="cliNo">取消</button>
            <button class="ok" @click="cliYes">确认</button>
          </div>
        </div>
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
      header: {
        type: String,
        default: '确认信息'
      },
      body: {
        type: String,
        default: ''
      },
      yes:{
        type:String
      },
      no:{
        type:String
      }
    },
    methods:{
      cliYes(){
        this.show = false;
        this.yes();
      },
      cliNo(){
        this.show = false;
        this.no();
      }
    }
  }
</script>
<style lang="scss">

</style>
确认
