<template>
  <div>
    <div class="header-search" ref="headerSearch">
      <nav>
        <div class="icon" @click="$router.go(-1)"><i class="iconfont icon-houtui"></i></div>
        <div class="title" >&emsp;{{title}}</div>
        <div class="icon" @click="submit"><i class="iconfont icon-zhengque"></i></div>
      </nav>
    </div>
    <!--新增联系人头像-->
    <div class="add-user-wrapper">
      <div class="img-file">
        <img :src="info.img" alt="">
        <input type="file" @change="imgfile" ref="imgFile">
      </div>
    </div>
    <!--表单-->
    <div class="form-wrapper add">
      <ul>
        <!--姓名-->
        <li>
          <i class="iconfont icon-yonghu"></i>
          <div class="inp">
            <input type="text" placeholder="姓名" v-model="info.username" v-focus>
          </div>
        </li>
        <!--性别-->
        <li>
          <i class="iconfont icon-xingbie"></i>
          <div class="inp">
            <select name="" v-model="info.sex">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
          <i></i>
        </li>
        <!--出生日期-->
        <li>
          <i class="iconfont icon-shengricopy2"></i>
          <div class="inp">
            <input type="date" placeholder="出生日期" v-model="info.birthday">
          </div>
          <i></i>
        </li>
        <!--家庭收入-->
        <li>
          <i class="iconfont icon--jiatingshouru"></i>
          <div class="inp">
            <input type="number" placeholder="家庭收入" v-model="info.money">
          </div>
          <i class="label">元</i>
        </li>
        <!--电话-->
        <li>
          <i class="iconfont icon-dianhua"></i>
          <div class="inp">
            <input type="number" placeholder="手机号码" v-model="info.phone">
          </div>
          <i></i>
        </li>
        <!--省-->
        <li>
          <i class="iconfont icon-shengfen"></i>
          <div class="inp">
            <select name="" v-model="info.area">
              <option v-for="(v,index) in area" :value="v.provinceName">{{v.provinceName}}</option>
            </select>
          </div>
          <i></i>
        </li>
        <!--市-->
        <li>
          <i class="iconfont icon-chengshi"></i>
          <div class="inp">
            <select name="" v-model="info.city">
              <option v-for="(v,index) in city" :value="v.citysName">{{v.citysName}}</option>
            </select>
          </div>
          <i></i>
        </li>
        <!--详细地址-->
        <li>
          <i class="iconfont icon-xiangxidizhi"></i>
          <div class="inp">
            <input type="text" placeholder="详细地址" v-model="info.address">
          </div>
          <i></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Api from '../js/api'
  import $ from 'jquery'
  import city from '../js/city.json'
  import Imgbase from '../js/imgCompressBase64'

  export default {
    name: 'Add',
    data() {
      return {
        type: 'add',
        title: '新增联系人',
        id: '',
        info: {
          address: "",
          area: "北京市",
          birthday: "",
          city: "",
          id: "",
          img: "",
          money: null,
          phone: "",
          sex: "男",
          username: "",
        },
        area: {},
        city: {}
      }
    },
    watch: {
      'info.area':function (val) {
        this.getcity(val);
        this.info.city = this.city[0].citysName;
      }
    },
    mounted() {
      let type = this.$route.params.type;
      this.type = type;
      this.id = this.$route.query.id;
      if (type === 'edit') {
        this.title = '修改联系人';
        Api.getdetail(this.id).then(res => {
          this.info = res._serverData;
          this.getcity(res._serverData.area);
        })
      }else{
        this.title = '新增联系人';
        this.info.area = '北京市';
        this.getcity('北京市');
        this.info.city = this.city[0].citysName;
      }
      this.getarea()
    },
    methods: {
      getarea() {
        this.area = city;
      },
      getcity(val) {
        for (let i in city) {
          if (city[i].provinceName === val) {
            this.city = city[i].citys;
          }
        }
      },
      submit(){
        let form = this.info;
        //验证
        if(form.username.length <= 1){
          this.$popMsg.show('姓名长度最少为一位！',500);
          return false;
        }
        if(form.birthday === ''){
          this.$popMsg.show('请选择出生日期！',500);
          return false;
        }
        if(form.money.length === 0){
          this.$popMsg.show('请填写家庭收入！',500);
          return false;
        }
        if(form.phone.length !== 11){
          this.$popMsg.show('手机号码长格式不正确！',500);
          return false;
        }

        //图片默认
        if(this.info.img === ''){
          this.info.img = 'http://dummyimage.com/100x100/79b6f2&text=' + this.info.username.substring(0,1);
        }

        if(this.type === 'edit'){
          Api.edit(this.id,form).then(res=>{
            if(res.attributes){
              this.$popMsg.show('修改成功！');
              this.$router.go(-1);
            }
          })
        }else{
          Api.add(form).then(res=>{
            if(res.attributes){
              this.$popMsg.show('添加成功！');
              this.$router.replace('/detail/' + res.id);
            }
          })
        }

      },
      imgfile(){
        let f = this.$refs.imgFile.files[0];
        let vm = this;
        new Imgbase({
          file:f,
          compressSize:150,
          success:function(base64){
            Api.imgfile(base64,f.name).then(res=>{
              vm.info.img = res.attributes.url;
            });
          }
        })

      }
    }
  }
</script>

<style lang="scss">

</style>
