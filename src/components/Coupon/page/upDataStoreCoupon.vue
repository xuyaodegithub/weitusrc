<template>
  <div id="newActive">
    <p><label>优惠券标题:</label><el-input v-model="input" placeholder="请输入标题" size="small"></el-input></p>
    <p><label>有效期:</label><el-input v-model="input0" placeholder="请输入有效期时间" size="small"></el-input><span style="color:#999999; margin-left: 10px">按天计算</span></p>
    <p><label>优惠券类型:</label><el-radio v-model="radio" label="1">单品优惠券</el-radio>
    </p>
    <p><label>优惠券价值:</label><el-input v-model="input2" size="small"></el-input>
    </p>
    <p><label>关联产品:</label><el-input v-model="input3" placeholder="" size="small" disabled></el-input>
      <el-button type="success" round size="mini" style="width:100px" @click="popoverAlert('VchoseGoods')">浏览</el-button>
    </p>
    <p><label style="vertical-align: top">券总数量:</label><el-input type="text" v-model="input1" placeholder="请输入数量" size="small"></el-input>
    <span style="color:#999999; margin-left: 10px">已领100</span>
    </p>
    <p><label>每个ID限领数量:</label>
      <el-select v-model="value" placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span style="color:#999999; margin-left: 10px">单次只能领一次，使用之后可重复领取</span>
    </p>
    <p>
    <el-button type="primary" size="small" plain style="margin-top: 10px" @click="upload()">提交审核</el-button></p>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'UpdataYHQ',
  data () {
    return {
      input:'',
      input0:'',
      value:'',
      input1:'',
      input2:'',
      input3:'',
      input4:'',
      updata2:'',
      updataTwo:'',
      updataThree:'',
      radio:'',
      options:[
        {
          value: '1',
          label: '1张'
        }, {
          value: '2',
          label: '2张'
        }, {
          value: '3',
          label: '3张'
        }, {
          value: '4',
          label: '5张'
        }, {
          value: '5',
          label: '不限'
        }
      ]
    }
  },
  activated(){
    this.input='';
    this.input1='';
    this.updata2='';
    this.updataThree='';
    this.updataTwo='';
    this.input0='';
    this.input2='';
    this.input3='';
    this.input4='';
  },
  computed:{
    ...mapGetters([
        'pickerOptions2'
    ])
  },
  methods: {
    ...mapActions([
    'popoverAlert'
    ]),
    upload(){

    },
    dateformat(data) {
      if(data){
      let year=data.getFullYear()
      let month=data.getMonth()+1
      let day= data.getDate()
      let hour= data.getHours()
      let min=data.getMinutes()
      let sec=data.getSeconds()
      console.log(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec)
      return year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec
    }
    },
  }
}
</script>

<style scoped>
  #newActive{
    margin-top: 30px;
  }
#newActive > p .el-input{
  width:200px;
}
#newActive p{
  margin-bottom:20px;
}
#newActive .upload-demo{
  display:block;
  margin-left: 115px;
  margin-top: 15px;
  width:400px;
}
  #newActive p > label{
    width:100px;
    display: inline-block;
    text-align: right;
    margin-right: 15px;
  }
 .tep label{
   margin-right: 30px;
 }
  .el-radio+.el-radio{
    margin-left:0;
  }
  #newActive p:last-child{
    margin-left:100px;
  }
  #newActive p:last-child .el-button{
    width:100px;
  }
</style>
