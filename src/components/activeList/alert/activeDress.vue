<template>
  <div class="demo incomingHistory">
    <div class="popover-head">
      <span class="title">活动链接</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
    <div class="popover-main" v-html="activeIdResult">
      <!--<p>{{this.$store.state.result.activeId}}</p>-->
    </div>
  </div>
</template>

<style scoped>
  .demo{
    /*width: 500px;*/
    /*height: 120px;*/
    background: #F0FAFF;
    margin-left: -300px;
    margin-top: -220px;
    border-radius: 5px;
    border: 1px solid #90CCE8;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
    overflow: hidden;
    color: #333333;
  }
  .popover-head{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F0FAFF;
    font-size: 14px;
    border-bottom: 1px solid #C5E2F0;
  }
  .popover-head i{
    float: right;
    color: #A1C1E2;
    font-size: 12px;
    margin-top: 13px;
    margin-right: 12px;
    cursor: pointer;
  }
  .popover-head .title{
    margin-left: 15px;
    font-weight: bold;
  }
  .popover-main{
    padding: 20px 12.5px;
    padding-bottom: 15px;
    width: calc(100% - 25px);
    line-height: 24px;
  }
  .popover-main .el-input{
    width:200px;
  }
  .popover-main p{
    margin-bottom: 15px;
  }
  .popover-main label{
    margin-right:10px;
  }
</style>
<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        input: '',
        checkList: []
      }
    },
    computed: {
      ...mapGetters([
        'popoverAlive','addCommodityResult','activeIdResult'
      ])
    },
    methods: {
      ...mapActions([
        'popoverAlert','addCommodityActions','popoverAlert'
      ]),

    }
  };
</script>
