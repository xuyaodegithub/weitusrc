<template>
  <div class="bagList">
    <div style="overflow: hidden">
      <el-button type="success" round size="mini" icon="el-icon-plus" style="margin-top: 10px;width:100px" @click="addGoods()" v-if="title=='bagList'">新增礼包</el-button>
      <el-button type="success" round size="mini" icon="el-icon-plus" style="margin-top: 10px;width:100px"@click="title='bagList'" v-else>返回</el-button>
    </div>
      <keep-alive>
      <component :is="title" :msg="msgData" v-on:to-up="getOne"></component>
    </keep-alive>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import bagList from './giftBagList.vue'
  import newGift from './newGiftBag.vue'
  export default {
    name: 'giftBag',
    data () {
      return {
        title:'bagList',
        msgData:{
          page:1,
          rows:10,
          type:'',
          item:{}
        }
      }
    },
    components:{
      bagList,newGift
    },
    watch: {

     /* msg: {
        handler (curVal, oldVal) {
          this.currentPage5=1
          this.value1=10
        },
        deep: true
      }*/
    },
    computed:{
      ...mapGetters([

      ])
    },
    mounted(){

    },
    methods: {
      ...mapActions([
        'popoverAlert'
      ]),
      addGoods(){
        this.title='newGift'
        this.msgData.type='create'
      },
      getOne(val){
        this.title=val.title
        this.msgData.type=val.type
        this.msgData.item=val.item
      }

    }
  }
</script>

<style scoped lang="scss">
  .bagList .el-button{
    float:right;margin-right: 30px;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
