<template>
  <div id="newActive">
    <p><label>优惠券标题:</label><el-input v-model="input" placeholder="请输入标题" size="small" :disabled="YHQonlyResult.Which==='second'"></el-input></p>
    <p><label>有效期:</label><el-date-picker
      size="small"
      v-model="input0"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      :disabled="YHQonlyResult.Which==='second'">
    </el-date-picker><span style="color:#999999; margin-left: 10px">按天计算</span></p>
    <p><label>优惠券类型:</label><el-radio-group v-model="radio" size="small">
      <el-radio :label="1">单品优惠券</el-radio>
    </el-radio-group>
    </p>
    <p><label>优惠券价值:</label><el-input v-model="input2" size="small" :disabled="YHQonlyResult.Which==='second'"></el-input>
    </p>
    <p><label>关联产品:</label><el-input v-model="CouponWithGoodsResult.productName" placeholder="" size="small" style="width: 300px;" disabled></el-input>
      <el-button type="success" round size="mini" style="width:100px" @click="popoverAlert('VchoseGoods')" :disabled="YHQonlyResult.Which==='second'">浏览</el-button>
    </p>
    <p><label style="vertical-align: top">券总数量:</label><el-input type="text" v-model="input1" placeholder="请输入数量" size="small"></el-input>
    <span style="color:#999999; margin-left: 10px">已领{{YHQonlyResult.item.receivedNum}}</span>
    </p>
    <p><label>每个ID限领数量:</label><el-input type="text" v-model="value" placeholder="请输入数量" size="small" :disabled="YHQonlyResult.Which==='second'"></el-input>
      <!--<el-select v-model="value" placeholder="请选择" size="small" disabled>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>-->
      <span style="color:#999999; margin-left: 10px">单次只能领一次，使用之后可再次领取</span>
    </p>
    <p class="tep"><label>状态:</label>
      <el-radio-group v-model="updata2" size="small" disabled>
        <el-radio :label="0">待审核</el-radio>
        <el-radio :label="1">已审核</el-radio>
      </el-radio-group>
    </p>
    <p class="tep"><label>公开状态:</label>
      <el-radio-group v-model="updata10" size="small" :disabled="YHQonlyResult.Which==='second'">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
    </p>
    <p class="tep"><label>领取等级:</label>
      <!--<el-radio-group v-model="updataTwo" size="small" disabled>
        <el-radio :label="1">白领</el-radio>
        <el-radio :label="2">金领</el-radio>
        <el-radio :label="3">粉领</el-radio>
      </el-radio-group>-->
      <el-checkbox-group v-model="updataTwo" size="small" disabled>
        <el-checkbox :label="'1'">白领</el-checkbox>
        <el-checkbox :label="'2'">金领</el-checkbox>
        <el-checkbox :label="'3'">粉领</el-checkbox>
      </el-checkbox-group>
      <span style="color:#999999; margin-left: 10px">限领等级和提醒时间在审核中决定的！</span>
    </p>
    <p class="tep"><label>到期提醒时间:</label>
      <el-checkbox-group v-model="updataThree" size="small" disabled>
        <el-checkbox :label="'3'">到期前三天提醒</el-checkbox>
        <el-checkbox :label="'1'">到期前一天提醒</el-checkbox>
      </el-checkbox-group>
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
      input:'',
      input0:'',
      value:'',
      input1:'',
      input2:'',
      input3:'',
      updata2:'',
      updata10:'',
      updataTwo:[],
      updataThree:[],
      radio:'',
      id:'',
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
   this.dateformat()
    console.log(this.input0)
  },
  computed:{
    ...mapGetters([
        'pickerOptions2','YHQonlyResult','CouponWithGoodsResult'
    ])
  },
  methods: {
    ...mapActions([
    'popoverAlert','YHQonlyActions','createCouponActions'
    ]),
    upload(){
      let obj={
        id:this.YHQonlyResult.item.id,
        num:this.input1,
        itemson:'update',
        Which:this.YHQonlyResult.Which
      }
      console.log(this.YHQonlyResult.Which)
      if(this.YHQonlyResult.Which==='first'){
        obj.title=this.input
        obj.endTime=this.input0[1].getTime()
        obj.startTime=this.input0[0].getTime()
        obj.expireRemind=this.updataThree.join(',')
        obj.limitLevel=this.updataTwo.join(',')
        obj.limitReceived=this.value
        obj.price=this.input2*100
        obj.type=this.radio
        obj.productIds=this.CouponWithGoodsResult.productIds
        obj.togetherProductIds=this.CouponWithGoodsResult.togetherProductIds ? this.CouponWithGoodsResult.togetherProductIds : '0'
        obj.productType=this.CouponWithGoodsResult.productType
        obj.isPublic=this.updata10
       // obj.itemson='create'
      }
      console.log(obj)
      if(this.input1<this.YHQonlyResult.item.receivedNum){
        this.$message({
          message:'修改总数量不可少于已领数量',
          type:'warning'
        })
      }else{
        this.createCouponActions(obj)
        this.YHQonlyActions({title:'VseachCoupon',item:''})
      }
    },
    dateformat() {
      this.input=this.YHQonlyResult.item.title;
      this.input1=this.YHQonlyResult.item.num;
      this.value=this.YHQonlyResult.item.limitReceived
      this.updata2=this.YHQonlyResult.item.isAudit;
      this.updataThree=String(this.YHQonlyResult.item.expireRemind).split(',');
      this.updataTwo=this.YHQonlyResult.item.limitLevel.split(',');
      this.input0=[new Date(this.YHQonlyResult.item.startTime),new Date(this.YHQonlyResult.item.endTime)];
      this.input2=this.YHQonlyResult.item.price/100;
      this.input3=this.YHQonlyResult.item.productName;
      this.radio=1
      this.id=this.YHQonlyResult.item.id;
      this.updata10=this.YHQonlyResult.item.isPublic;
      console.log(this.updataThree)
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
  .tep .el-checkbox-group{
    display: inline-block;
  }
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
</style>
