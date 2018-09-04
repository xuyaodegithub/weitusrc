<template>
  <div>
    <el-container>
      <el-header>
        <div class="header-t">
          <p :class="{cu : ttyy}" style="font-size: 28px;line-height: 60px;color:#ff2b81;height:60px;text-shadow: 5px 5px 5px #FF0000;">OL圈 <i style="font-size:20px;color: #fbffae;">管理后台</i></p>
       <!-- <button class="cu">返回首页</button>-->
          <p class="h-title">OL圈2.0总平台</p>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#303242"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="8" style="margin-right: 80px;">
            <template slot="title">
              <img src="../../../static/slogo.png" alt="" class="valign">欢迎：<span id="myown">heheheh</span>
            </template>
            <el-menu-item index="8-1">安全设置</el-menu-item>
            <el-menu-item index="8-2">退出</el-menu-item>
          </el-submenu>
        </el-menu>
        </div>
      </el-header>
      <el-container style="margin-top: 60px;">
          <asidle></asidle>
          <!--<el-container>-->
        <el-main style="height: 580px;overflow-y: auto;overflow-x:hidden;position: relative;">
          <keep-alive>
           <router-view style="min-width:1102px;"/>
          </keep-alive>
          <transition name="slide-fade">
            <div class="alertshow" v-if="popoverAlive.openOrClose" v-drag>
              <v-popover></v-popover>
            </div>
          </transition>
          <p id="footer">© 2016 pinduoduo.com All rights reserved. (沪ICP备15010535号-13)</p>
        </el-main>
          <!--</el-container>-->
      </el-container>
  </el-container>

    <!--<p id="footer">© 2016 pinduoduo.com All rights reserved. (沪ICP备15010535号-13)</p>-->
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
import asidle from './asidle.vue'
import vPopover from '../popover/popover.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      ttyy:true
    }
  },
  components:{
		asidle,vPopover
  },
  computed:{
    ...mapGetters([
      'popoverAlive'
    ])
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  	}

}
</script>
<style scoped>
.el-container.is-vertical[data-v-12c28653]{
	width:100%;height: auto;
}
.el-main{
	padding: 15px 0 0 15px;
}
ul.el-menu-demo{
  height:60px;
}
.alertshow{
  position: fixed;
  left:50%;
  top:50%;
  z-index:1000;
}
header{
  width:100%;background:#303242 ;
}
header .header-t{
  width:100%;
  margin-left:40px;
  display: flex;
  justify-content:space-between;
}
header .h-title{
  color: #fff;
  font-size: 18px;
}
header .header-t > p:nth-child(2){
  line-height: 60px;
  height:60px;
}
header img.valign{
  width: 25px;height:25px;border-radius: 50%;margin:0 10px 0 0;
}
.el-menu-demo{
 border-bottom: 0;
}
.el-menu-demo .el-menu-item{
  font-size: 16px;
}
.el-aside{
	overflow: inherit;margin-left: 20px;
}
.el-header{
  padding:0;position: fixed;z-index: 1500;
}
#myown{
	font-size: 12px;
}
#footer{
  background: #fafafa;
  font:14px/48px "宋体";
  padding-bottom: 16px;
  text-align: center;
  color:#333;
  margin-top: 15px;
  /*position: absolute;*/
  /*bottom: 0;*/
  /*width:1110px;*/
}
.slide-fade-enter-active {
  transition: all .3s linear;
}
.slide-fade-leave-active {
  transition: all .4s linear;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  /*transform: translateX(10px);*/
  /*opacity: 0;*/
  /*transform:scale(0.4)*/
  transform:rotate(180deg)
}
</style>
