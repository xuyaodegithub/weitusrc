<template>
	<div>
 		<p><i class="el-icon-d-arrow-right"></i>查询结果<span>共查询到<i>{{tableData.length}}</i>条数据</span></p>
 		<p>没有查询到符合要求的商品数量</p>
 	</div>
</template>

<script>
export default {
  name: 'downlist',
  data(){
  	return {
  		tableData:[]
  	}
  }
}
</script>

<style scoped>
p{
	font: 16px/36px "微软雅黑";margin-top:10px ;
}
 p span{
	font-size: 12px;margin-left:15px ;
}
 p span i{
	color: red;margin: 0 5px;
}
 p>i{
   font-size: 18px;margin-right: 5px;height: 16px;
   color:red;font-weight: 600;
}
div p:last-child{
	text-align: center;margin-top: 30px;color:#999
}
</style>
