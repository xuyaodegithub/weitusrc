<template>
  <div id="smalltitle">
    <p id="toindex">
      <router-link to="index">首页</router-link> &gt;明细督导统计
    </p>
    <div class="footer-list">
      <keep-alive>
        <component :is="title" v-on:to-change="changeTitle" :msg="seachMsg"></component>
      </keep-alive>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import vStar from '../pinkSet/starStatisList.vue'

  export default {
  name: 'supervisionIndex',
  data () {
    return {
      title:'vStar',
      seachMsg:''
    }
  },
  computed:{
    ...mapGetters([
     'popoverAlive',
    ])
  },
  components:{
    vStar
  },
    mounted(){

    },
  methods: {
    ...mapActions([
'popoverAlert'
    ]),
    changeTitle(val){

    }

  }
}
</script>

<style scoped>
  #toindex{
    font: 16px/36px "微软雅黑";
    background:none;
    border:0;
    margin:0;
    color: #333;
    font-weight: 600;
    text-indent:0;
    overflow: hidden;
    margin-bottom: 15px;
  }
  .alertshow{
    position: fixed;
    left:50%;
    top:50%;
    z-index:1000;
  }
</style>
