<template>
  <!--<div style="height: 500px;overflow: hidden">-->
  <div style="position: relative;" class="activeHover">
    <div class="fuCen"></div>
	<el-aside width='210px' style="background-color: rgb(244, 245, 249);height: 600px;overflow: auto;overflow-x: hidden;padding-bottom: 35px;">
    <el-menu :default-openeds="[]"  background-color="#f4f5f9"  @open="handleOpen"
      @close="handleClose" router unique-opened	>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-date"></i>发货管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">订单查询</el-menu-item>
          <el-menu-item index="1-2">批量发货</el-menu-item>
          <el-menu-item index="1-3">运费模板</el-menu-item>
          <el-menu-item index="1-4">发现列表管理</el-menu-item>
          <el-menu-item index="1-5">发现账号管理</el-menu-item>
          <el-menu-item index="1-6">经理购买记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>售后管理</template>
        <el-menu-item-group>
          <el-menu-item index="2-1" :is-dot="istrue">退款/售后<i class="el-icon-num">{{num}}</i></el-menu-item>
          <el-menu-item index="2-2">售后服务质量</el-menu-item>
          <el-menu-item index="2-3">售后设置</el-menu-item>
          <el-menu-item index="2-4">工单管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-0">特卖商品管理</el-menu-item>
          <el-menu-item index="3-8">试用商品管理</el-menu-item>
          <el-menu-item index="3-10">经理设置</el-menu-item>
          <el-menu-item index="3-11">店主设置</el-menu-item>
          <el-menu-item index="3-12">明星督导统计</el-menu-item>
          <el-menu-item index="3-13">产品收益配置</el-menu-item>
          <el-menu-item index="3-9">试用广告设置</el-menu-item>
          <el-menu-item index="3-1">品牌管理</el-menu-item>
          <el-menu-item index="3-2">分类管理</el-menu-item>
          <el-menu-item index="3-3">发布新商品</el-menu-item>
          <el-menu-item index="3-4">商品列表</el-menu-item>
          <el-menu-item index="3-5">商品数据</el-menu-item>
          <el-menu-item index="3-6">评价管理</el-menu-item>
          <el-menu-item index="3-7">店铺推荐位设置</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-message"></i>账户资金</template>
        <el-menu-item-group>
          <el-menu-item index="4-1">账户提现</el-menu-item>
          <el-menu-item index="4-2">保证金</el-menu-item>
          <el-menu-item index="4-3">发票管理</el-menu-item>
          <el-menu-item index="4-4">扣款明细</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-service"></i>OL客服<i class="el-icon-red te" v-if="alltrue"></i></template>
        <el-menu-item-group>
          <el-menu-item index="5-1">聊天记录查询</el-menu-item>
          <el-menu-item index="5-2">在线状态<i class="el-icon-red te" v-if="istrue"></i></el-menu-item>
          <el-menu-item index="5-3">客服数据</el-menu-item>
          <el-menu-item index="5-4">客服工具<i class="el-icon-red te" v-if="istrue"></i></el-menu-item>
          <el-menu-item index="5-5">消息设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-printer"></i>店铺营销</template>
        <el-menu-item-group>
          <el-menu-item index="6-1">营销活动</el-menu-item>
          <el-menu-item index="6-2">竞价活动</el-menu-item>
          <el-menu-item index="6-3">营销工具</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-sort"></i>店铺推广</template>
        <el-menu-item-group>
          <el-menu-item index="7-1">推广概况</el-menu-item>
          <el-menu-item index="7-2">拼多多推广</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title"><i class="el-icon-tickets"></i>店铺管理</template>
        <el-menu-item-group>
          <el-menu-item index="8-1">商家/店铺信息</el-menu-item>
          <el-menu-item index="8-2">子账号管理</el-menu-item>
          <el-menu-item index="8-3">店铺装修<i class="el-icon-red te" v-if="istrue"></i></el-menu-item>
          <el-menu-item index="8-4">违规信息</el-menu-item>
          <el-menu-item index="8-5">退店</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="9">
        <template slot="title"><i class="el-icon-star-off"></i>服务市场</template>
        <el-menu-item-group>
          <el-menu-item index="9-1">第三方合同软件</el-menu-item>
          <el-menu-item index="9-2">公共接口</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="10">
        <template slot="title"><i class="el-icon-picture-outline"></i>活动管理</template>
        <el-menu-item-group>
          <el-menu-item index="10-6">菜单管理</el-menu-item>
          <el-menu-item index="10-1">活动页面设计</el-menu-item>
          <el-menu-item index="10-2">优惠券活动</el-menu-item>
          <el-menu-item index="10-3">优惠券管理</el-menu-item>
          <el-menu-item index="10-4">优惠券管理(供应商)</el-menu-item>
          <el-menu-item index="10-5">优惠券统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</el-aside>
  </div>
</template>

<script>
export default {
  name: 'asidle',
  data () {
  	return {
  		istrue:true,
  		num:3,
  		alltrue:true
  	}
  },
   methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      }
    }
}
</script>

<style>
  .el-aside i.el-icon-red.te{
	width: 10px;height: 10px;border-radius: 50%;background: red;margin:-14px 0 0 3px;
}
  .el-aside i.el-icon-num{
	line-height:18px;background: red;color:#fff;text-align: center;margin-right:5px;font-size:12px ;border-radius: 10px;
}
  .el-aside div.el-menu-item-group__title{
padding:0;
}
  .fuCen{
    background:rgb(244, 245, 249);width:18px;height: 600px;position: absolute;right: 0; z-index: 1012;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -ms-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
  }
  .activeHover:hover .fuCen{
    width:9px;
  }
</style>
