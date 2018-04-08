<template>
  <div id="newActive">
    <p><label>优惠券标题:</label><el-input v-model="input" placeholder="请输入标题" size="small" :disabled="StoreYHQResult.trueOrfalse"></el-input></p>
    <p><label>有效期:</label><el-date-picker
      size="small"
      v-model="input0"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      :disabled="StoreYHQResult.trueOrfalse">
    </el-date-picker><span style="color:#999999; margin-left: 10px">按天计算</span></p>
    <p><label>优惠券类型:</label><el-radio-group v-model="radio" size="small">
      <el-radio :label="1">单品优惠券</el-radio>
    </el-radio-group>
    </p>
    <p><label>优惠券价值:</label><el-input v-model="input2" size="small" :disabled="StoreYHQResult.trueOrfalse"></el-input>
    </p>
    <p><label>关联产品:</label><el-input v-model="CouponWithGoodsResult.productName" placeholder="" size="small" style="width: 300px;" disabled></el-input>
      <el-button type="success" round size="mini" style="width:100px" @click="popoverAlert('VChoseGoodsStore')" v-if="!StoreYHQResult.trueOrfalse">浏览</el-button>
    </p>
    <p><label style="vertical-align: top">券总数量:</label><el-input type="text" v-model="input1" placeholder="请输入数量" size="small"></el-input>
    <span style="color:#999999; margin-left: 10px" v-if="StoreYHQResult.trueOrfalse">已领{{StoreYHQResult.item.receivedNum}}</span>
    </p>
    <p><label>每个ID限领数量:</label><el-input type="text" v-model="value" placeholder="请输入数量" size="small" :disabled="StoreYHQResult.trueOrfalse"></el-input>
      <!--<el-select v-model="value" placeholder="请选择" size="small" >-->
        <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <span style="color:#999999; margin-left: 10px">单次只能领一次，使用之后可再次领取</span>
    </p>
    <p class="tep"><label>公开状态:</label>
      <el-radio-group v-model="updata10" size="small" :disabled="StoreYHQResult.trueOrfalse">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
    </p>
    <p>
    <el-button type="primary" size="small" plain style="margin-top: 10px" @click="upload()">提交修改</el-button></p>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'UpdataYHQ',
  data () {
    return {
      sessionId:4,
      input:'',
      input0:'',
      value:'',
      input1:'',
      input2:'',
      input3:'',
      radio:'',
      updata10:'',
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
    this.input=this.StoreYHQResult.item.title;
    this.input1=this.StoreYHQResult.item.num;
    this.input0=[new Date(this.StoreYHQResult.item.startTime),new Date(this.StoreYHQResult.item.endTime)];
    this.input2=this.StoreYHQResult.item.price/100;
    this.input3=this.StoreYHQResult.item.productName;
    this.radio=this.StoreYHQResult.item.type;
    this.value=this.StoreYHQResult.item.limitReceived;
    this.updata10=this.StoreYHQResult.item.isPublic;
    console.log(this.CouponWithGoodsResult)
  },
  computed:{
    ...mapGetters([
        'pickerOptions2','StoreYHQResult','CouponWithGoodsResult','sellIDResult'
    ])
  },
  methods: {
    ...mapActions([
    'popoverAlert','StoreCreteYHQActions','StoreYHQAction'
    ]),
    upload(){
  let data={
    id:this.StoreYHQResult.item.id,
    sellerId:this.sellIDResult,
    //title:this.input,
    num:this.input1
  }
  console.log(this.CouponWithGoodsResult)
  if(this.StoreYHQResult.trueOrfalse===false){
    data.startTime=this.input0[0].getTime()
    data.endTime=this.input0[1].getTime()
    data.limitReceived=this.value
    data.price=this.input2*100
    data.type=this.radio
    data.title=this.input
    data.isPublic=this.updata10
    data.productIds=this.CouponWithGoodsResult.productIds
    data.togetherProductIds=this.CouponWithGoodsResult.togetherProductIds ? this.CouponWithGoodsResult.togetherProductIds : ''
    data.productType=this.CouponWithGoodsResult.productType
  }else{
    data.name='second'
  }
//  if(this.CouponWithGoodsResult!=={}){
//    data.productIds=this.CouponWithGoodsResult.productIds
//    data.togetherProductIds=this.CouponWithGoodsResult.togetherProductIds
//    data.productType=this.CouponWithGoodsResult.productType
//  }
//  if(this.StoreYHQResult.item.isAudit===1){
//
//  }
  if(this.input1<this.StoreYHQResult.item.receivedNum && this.StoreYHQResult.trueOrfalse===true){
        this.$message({
          message:'修改总数量不可少于已领数量',
          type:'warning'
        })
      }else{
    console.log(data)
        this.StoreCreteYHQActions(data)
        this.StoreYHQAction({title:'VseachStoreCoupon',item:'',trueOrfalse:false})
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
