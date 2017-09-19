<template>
  <div v-cloak>
    <div class="header-search" ref="headerSearch">
      <nav>
        <div class="icon" @click="$router.go(-1)"><i class="iconfont icon-houtui"></i></div>
        <div class="title">&emsp;联系人详情</div>
        <div class="icon" @click="remove"><i class="iconfont icon-shanchu"></i></div>
        <router-link :to="'/add/edit?id=' + $route.params.id" tag="div" class="icon"><i class="iconfont icon-xiugai"></i></router-link>
      </nav>
    </div>
    <!--人物信息-->
    <div class="add-user-wrapper">
      <div class="img-file" style="background: #ffffff;">
        <img :src="info.img" alt="">
      </div>
      <div class="username">{{info.username}}</div>
    </div>
    <!--详情-->
    <div class="form-wrapper add">
      <ul>
        <!--性别-->
        <li>
          <i class="iconfont icon-xingbie"></i>
          <div class="inp">
            <div class="cont">{{info.sex}}</div>
          </div>
          <i></i>
        </li>
        <!--出生日期-->
        <li>
          <i class="iconfont icon-shengricopy2"></i>
          <div class="inp">
            <div class="cont">{{info.birthday}}</div>
          </div>
          <i></i>
        </li>
        <!--家庭收入-->
        <li>
          <i class="iconfont icon--jiatingshouru"></i>
          <div class="inp">
            <div class="cont">{{info.money}}元</div>
          </div>

        </li>
        <!--电话-->
        <li>
          <i class="iconfont icon-dianhua"></i>
          <div class="inp">
            <div class="cont">{{info.phone}}</div>
          </div>
          <i></i>
        </li>
        <!--省-->
        <li>
          <i class="iconfont icon-shengfen"></i>
          <div class="inp">
            <div class="cont">{{info.area}}</div>
          </div>
          <i></i>
        </li>
        <!--市-->
        <li>
          <i class="iconfont icon-chengshi"></i>
          <div class="inp">
            <div class="cont">{{info.city}}</div>
          </div>
          <i></i>
        </li>
        <!--详细地址-->
        <li>
          <i class="iconfont icon-xiangxidizhi"></i>
          <div class="inp">
            <div class="cont">{{info.address}}</div>
          </div>
          <i></i>
        </li>
      </ul>
    </div>
    <confirm></confirm>
  </div>
</template>

<script type="text/ecmascript-6">
  import Api from '../js/api'
  import Confirm from '../components/pop/confirm/confirm.vue'

  export default {
    name: 'detail',
    data() {
      return {
        info:{}
      }
    },
    mounted() {
      let id = this.$route.params.id;
      Api.getdetail(id).then(res => {
        this.info = res._serverData;
      })
    },
    methods: {
      remove(){
        let id = this.$route.params.id;
        this.$popConfirm('您确定要删除<span class="red">' + this.info.username +'</span>吗？',()=>{
          Api.remove(id).then(res=>{
            if(res.id){
              this.$popMsg.show('删除成功！');
              this.$router.push('/');
            }
          })
        });
      }
    },
    components:{
      Confirm
    }
  }
</script>

<style lang="scss">

</style>
