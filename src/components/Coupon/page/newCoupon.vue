<template>
  <div id="newActive">
    <p><label>优惠券标题:</label><el-input v-model="input" placeholder="请输入标题" size="small"></el-input></p>
    <p><label>有效期:</label><el-date-picker
      size="small"
      v-model="input0"
      type="datetimerange"
      :picker-options="pickerOptions2"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right">
    </el-date-picker>
      <!--<span style="color:#999999; margin-left: 10px">按天计算</span>--></p>
    <p><label>优惠券类型:</label><el-radio-group v-model="radio" size="small">
      <el-radio :label="1">单品优惠券</el-radio>
    </el-radio-group>
    </p>
    <p><label>优惠券价值:</label><el-input v-model="input2" size="small"></el-input><span style="color:#999999; margin-left: 10px">请输入整数，不可带小数点</span>
    </p>
    <p><label>关联产品:</label><el-input v-model="CouponWithGoodsResult.productName" placeholder="" size="small" style="width: 300px;" disabled></el-input>
      <el-button type="success" round size="mini" style="width:100px" @click="popoverAlert(['VchoseGoods',''])">浏览</el-button>
    </p>
    <p><label>券总数量:</label><el-input type="text" v-model="input1" placeholder="请输入数量" size="small"></el-input>
    <!--<span style="color:#999999; margin-left: 10px">已领100</span>-->
    </p>
    <p><label>每个ID限领数量:</label><el-input type="text" v-model="value" placeholder="请输入数量" size="small"></el-input>
      <!--<span style="color:#999999; margin-left: 10px">如果数量不限请输入0</span>-->
     <!-- <el-select v-model="value" placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>-->
    </p>
    <p class="tep"><label>状态:</label>
      <el-radio-group v-model="updata2" size="small">
        <el-radio :label="0">待审核</el-radio>
        <el-radio :label="1">已审核</el-radio>
      </el-radio-group>
    </p>
     <p class="tep"><label>公开状态:</label>
      <el-radio-group v-model="updata10" size="small">
        <el-radio :label="0">否</el-radio>
        <el-radio :label="1">是</el-radio>
      </el-radio-group>
    </p>
    <p class="tep"><label>领取等级:</label>
     <!-- <el-radio-group v-model="updataTwo" size="small">
        <el-radio :label="1">白领</el-radio>
        <el-radio :label="2">金领</el-radio>
        <el-radio :label="3">粉领</el-radio>
      </el-radio-group>-->
      <el-checkbox-group v-model="updataTwo" size="small">
        <el-checkbox :label="1">白领</el-checkbox>
        <el-checkbox :label="2">金领</el-checkbox>
        <el-checkbox :label="3">粉领</el-checkbox>
      </el-checkbox-group>
    </p>
    <p class="tep"><label>到期提醒时间:</label>
      <!--<el-radio-group v-model="updataThree" size="small">-->
        <!--<el-radio :label="3">到期前三天提醒</el-radio>-->
        <!--<el-radio :label="1">到期前一天提醒</el-radio>-->
      <!--</el-radio-group>-->
      <el-checkbox-group v-model="updataThree" size="small">
        <el-checkbox :label="3">到期前三天提醒</el-checkbox>
        <el-checkbox :label="1">到期前一天提醒</el-checkbox>
      </el-checkbox-group>
    </p>
    <p>
    <el-button type="primary" size="small" plain style="margin-top: 10px" @click="upload()">提交添加</el-button></p>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
export default {
  name: 'newYHQ',
  data () {
    return {
      input:'',
      input0:'',
      value:'',
      input1:'',
      input2:'',
      input3:'',
      input4:'',
      updata2:1,
      updataTwo:[],
      updataThree:[],
      radio:'',
      updata10:''
    }
  },
  activated(){
    this.input='';
    this.input1='';
    this.updata2='';
    this.updataThree=[];
    this.updataTwo=[];
    this.input0='';
    this.input2='';
    this.input3='';
    this.value='';
    this.radio=1;
    this.updata10=1;
  },
  computed:{
    ...mapGetters([
        'pickerOptions2','CouponWithGoodsResult'
    ])
  },
  methods: {
    ...mapActions([
    'popoverAlert','createCouponActions','YHQonlyActions'
    ]),
    upload(){
      //console.log(this.updataTwo)l
      let str=''
      if(this.updataTwo.length>0){
        this.updataTwo.forEach(function(val,index){
          if(index===0){
            str=str+val
          }else{
            str=str+','+val
          }
        })
        let obj={
          endTime:this.input0[1].getTime(),
          expireRemind:this.updataThree.join(','),
          limitLevel:str,
          limitReceived:this.value,
          num:this.input1,
          price:this.input2*100,
          startTime:this.input0[0].getTime(),
          title:this.input,
          type:this.radio,
          productIds:this.CouponWithGoodsResult.productIds,
          productType:this.CouponWithGoodsResult.productType,
          togetherProductIds:this.CouponWithGoodsResult.togetherProductIds,
          isAudit:this.updata2,
          isPublic:this.updata10,
          itemson:'create'
        }
       console.log(this.CouponWithGoodsResult.price)
        if(Number(this.input2)>=Number(this.CouponWithGoodsResult.price)){
          this.$message({
            message:"优惠券价值不得超过商品最低价，请重新输入价值",
            type:'warning'
          })
        }else{
        console.log(this.input1+','+this.value)
        if(parseInt(this.input1) < parseInt(this.value)){
          this.$message({
            message:"限领数量不得超过总数量",
            type:'warning'
          })
        }else{
          this.createCouponActions(obj)
          this.YHQonlyActions({title:'VseachCoupon',item:''})
        }
        }
      }else{
        this.$message({
          message:'请先选择领取等级',
          type:'warning'
        })
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
  .tep .el-checkbox-group{
     display: inline-block;
   }
  .el-checkbox+.el-checkbox{
    margin-left: 0;
  }
  #newActive p:last-child{
    margin-left:100px;
  }
  #newActive p:last-child .el-button{
    width:100px;
  }
</style>
