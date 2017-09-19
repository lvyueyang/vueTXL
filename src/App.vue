<template>
  <div id="app" v-cloak>
    <transition name="fade">
      <router-view v-cloak></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import "css/base";
</style>
