<template>
  <div>
    <div class="header-search" ref="headerSearch">
      <nav>
        <div class="title" v-show="!search.show">通讯录</div>
        <div class="search" v-show="search.show">
          <div class="icon" @click="searchNone"><i class="iconfont icon-houtui"></i></div>
          <input type="text" placeholder="在联系人中检索" @keyup="getSearch" v-model="search.text">
        </div>
        <div class="icon" v-show="!search.show" @click="search.show = true"><i class="iconfont icon-sousuo"></i></div>
        <router-link v-show="!search.show" to="/add/add" tag="div" class="icon"><i class="iconfont icon-tianjia"></i></router-link>
      </nav>
    </div>
    <!--用户列表-->
    <div class="main-list" ref="mainList">
      <ul v-for="(ul,index) in list">
        <li v-for="(v,index) in ul"
            @click="$router.push('/detail/' + v.id)"
            v-show="v.show"
            :key="v.id">
          <div class="before">
            <div class="before-title">{{v.title}}</div>
          </div>
          <div class="user-info">
            <img :src="v.img" alt="">
            <span class="name">{{v.username}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!--侧栏-->
    <ul class="sidebar" ref="sideBar">
      <li v-tab v-for="(ul,index) in list" @click="sideBarCli(index)">{{ul[0].title}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  import ToPY from '../js/chineseToPinYing/index'
  import Api from '../js/api'

  export default {
    name: 'List',
    data() {
      return {
        list: {},
        search:{
          show:false,
          text:''
        }
      }
    },
    directives: {
      tab: {
        inserted: function (el) {
          $(el).click(function () {
            $(el).addClass('active').siblings().removeClass('active');
          })
        }
      }
    },
    mounted() {
      let vm = this;
      //获取列表
      Api.getlist().then(res => {
        let list = res;
        let L = [];
        let Y = ['!','@','#','$','%','^','&','*','0','1','2','4','5','6','7','8','9','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        //创建对象索引,用于排序
        for (let i in Y) {
          this.$set(this.list, Y[i], []);
        }
        //添加首字母
        for(let i in list){
          let P = ToPY(list[i].username);
          list[i].title = P;
        }
        //首字母匹配分组
        for (let i in list) {
          for (let j in this.list) {
            if (list[i].title === j) {
              this.list[j].push(list[i]);
            }
          }
        }
        //去除空数组
        for (let j in this.list) {
          if(this.list[j].length === 0){
            delete this.list[j];
          }
        }
        //转换为数组形式
        for (let j in this.list) {
          L.push(this.list[j]);
        }
        this.list = L;
        this.$nextTick(() => {
          window.onscroll = function () {
            vm.ifTop();
          };
        })
      });
    },
    methods: {
      //文字居上
      ifTop() {
        let ul = $(this.$refs.mainList).find('ul');
        let sideBar = $(this.$refs.sideBar);
        ul.each(function () {
          let top = $(this).offset().top;
          let st = $(window).scrollTop();
          let gun = parseFloat(top) - parseFloat(st);
          if (top - st < 70) {
            //判断是否在顶部，添加样式
            $(this).siblings().find('.before-title').removeClass('fixed');
            $(this).find('.before-title').addClass('fixed');
            //为右侧对应的添加样式
            let index = $(this).index();
            sideBar.find('li').eq(index).addClass('active').siblings().removeClass('active');
          }
          if (st === 0) {
            ul.eq(0).find('.before-title').removeClass('fixed');
            sideBar.find('li').eq(0).addClass('active').siblings().removeClass('active');
          }
        });
      },
      //快速定位
      sideBarCli(index) {
        let ul = $(this.$refs.mainList.childNodes);
        let top = ul.eq(index).offset().top;
        let h = this.$refs.headerSearch.offsetHeight;
        $(window).scrollTop(top - h);
        this.ifTop();
      },
      //搜索
      getSearch(){
        let list = this.list;
        let text = this.search.text;
        if(text.length === 0){
          for(let i in list){
            for(let j in list[i]){
              list[i][j].show = true;
            }
          }
        }else{
          for(let i in list){
            for(let j in list[i]){
              list[i][j].show = false;
              if(list[i][j].username.indexOf(text) !== -1 ){
                list[i][j].show = true;
              }
            }
          }
        }
      },
      //取消搜索
      searchNone(){
        let list = this.list;
        this.search.show = false;
        this.search.text = '';
        for(let i in list){
          for(let j in list[i]){
            list[i][j].show = true;
          }
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
