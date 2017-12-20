	<template>
	<div class="order" style="background: #eeeeee;margin-top: -300px">
    <div class="popover-head">
      <span class="title">预览效果</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
      <div style="background: #eeeeee; height: 500px;width: 315px;overflow: auto;" v-if="addCommodityResult[0].contents">


        <div v-for="item in addCommodityResult">
          <!--轮播图-->
          <img :src="item.contents[0].image | ToUrl" alt="" v-if="item.modelSampleCode=='advertisingFigure'" style="width: 100%;height: 150px;">
          <!--能滑动的-->
            <ul class="touchImg" v-if="item.modelSampleCode=='titleproducttouch'" style="margin-bottom: 10px">
              <li v-for="itemSons in item.contents" style="height: 70px;width: 70px;border: 1px solid skyblue;"><img :src="itemSons.image | ToUrl" style="height: 100%;width: 100%;"/></li>

            </ul>


          <!--等分图片-->
          <div class="img" v-if="item.modelSampleCode=='f5'">
            <!--<img  :src='goodImg'/>-->
            <div>
              <img v-for="itemSon in item.contents" v-if="item.contents.length==2" style="width: 50%;"  :src='itemSon.image | ToUrl'/>
              <img v-for="itemSon in item.contents" v-if="item.contents.length==3" style="width: 33.3%;" :src='itemSon.image | ToUrl'/>
              <img v-for="itemSon in item.contents" v-if="item.contents.length==1" style="width:100%;height:100px;" :src='itemSon.image | ToUrl'/>
              <img v-for="itemSon in item.contents" v-if="item.contents.length==4" style="width: 25%;"  :src='itemSon.image | ToUrl'/>
            </div>
          </div>
        </div>

        <!--分类-->
        <div class="list-top" v-show="addCommodityResult[addCommodityResult.length-1].contents.length!=0" style="margin-bottom: 30px">
          <ul>
            <!--<li v-for="(itemsSon,index) in addCommodityResult[addCommodityResult.length-1].contents" style="width: auto;line-height: 40px;background: #409EFF;margin-right: 10px;border: 1px solid #333;">{{itemsSon.title}}</li>-->
              <el-button
                v-for="(itemsSon,key) in addCommodityResult[addCommodityResult.length-1].contents"
                type="primary"
                plain
                :key="key"
                size="mini"
                style="margin: 0;padding: 6px;"
              >{{itemsSon.title}}</el-button>
          </ul>
        </div>
			</div>
			<!--分类产品-->
		<!--	<div class="cent">
				<ul class="init">
					<li v-for='item in curObj'>
						<img :src=item.image />
						<p class="top">{{item.productName}}</p>

						<p style="font-size: .28rem;color: #fc469a;">￥{{item.price}}</p>
						<p class="botMoney">
							<span class="left">￥{{item.marketPrice}}</span>
							<span class="right" >{{item.score}}</span>
						</p>


					</li>

					<li v-show="showTrue" class="special">没有更多了</li>
				</ul>
			</div>-->

	</div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
	export default {
		data : function() {
			return{
				listObj:[],
				curObj:{},
				pageObj:{
					page:1,
				},

				showTrue:false,
				status:'',
				swiperOption:{
//					notNextTick: true,
					preventClicks:false,
					initialSlide:0,
					autoplay: 3000,
					loop : true,
					pagination : '.swiper-pagination',
					autoplayDisableOnInteraction : false,
				},
				message:[],
				searchBarFixed:false,
				title:'',
				imgLength:'',
				lunboList:[],
				classify:[],
				partList:'',
				addSelect:0,
				useContentId:'',
				urlList:[],
				shareData : {
					'title': "",
					'description': "",
					'url': "",
					'picURL': "",
					'hide':true,
					'share':false

				},
				isMore:true,
				description:'',
				picURL:'',
				listUrl:'',
				activeTrue:true,

			}
		},
		components: {

		},
		created: function() {


		},
		updated(){
			//console.log(this.urlList);
		},
		mounted(){

			window.addEventListener('scroll', this.handleScroll);

		},

		computed:{
      ...mapGetters([
        'addCommodityResult'
      ])
		},
		methods:{
      ...mapActions([
        'popoverAlert'
      ])

		}
	}
</script>

<style lang="scss" scoped>
.order{
  position: absolute;
  left:40%;
  top:50%;
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

		.touchImg{
      width:100%;
		    overflow-x: auto;
		  	overflow-y: hidden;
		   	white-space:nowrap;
		   	li{
		   		display: inline-block;

		   		 img{
		   		 	display: block;
		   		 	width: 100%;
		   		 height:100%;
		   		  }
		   	}
		}


	.img{
		width: 100%;
		overflow: hidden;
		img{

			display: block;
			max-width: 100%;
			float: left;


		}
	}
	.list-top{
		width: 100%;
    margin-bottom: .10rem;
		.isFixed{
			position:fixed;
		    background-color:#Fff;
		    top:0;
		    z-index:22;
			height: 1.00rem;
			padding:0 ;
			margin: 0;

		}
		ul{
			WIDTH:100%;
		   	white-space:nowrap;
		    overflow: auto;
		    li{
		    	  font-size: 0.30rem;
			      text-align: center;
			      display: inline-block;
			      line-height: .88rem;
			      width: 1.60rem;
			      padding:0 ;
		  		  margin: 0;

			      vertical-align: top;

		    }
		    .special{
		      	border-bottom: 0.01rem solid #f49;
		      	z-index: 999;
		      	color: #f49;
		    }
		}

	}
	.cent{

		padding: .20rem .12rem;

		ul{
			width:100%;
			display: flex;
			display:-webkit-box;
			display: -moz-box;
			display: -ms-flexbox;
			display: -webkit-flex;

			-webkit-justify-content:space-between;
			justify-content:space-between;
			-moz-box-pack:space-between;
			-webkit--moz-box-pack:space-between;
			box-pack:space-between;
			flex-wrap:wrap;
			-webkit-flex-wrap:wrap;
		    -webkit-box-lines:multiple;
		    -moz-flex-wrap:wrap;
			.special{
				width: 100%;
				height: .56rem;
				background: none;
				color: #9C9C9C;
				line-height: .56rem;
				text-align: center;
				font-size:.28rem ;
			}
			li{
				width: 49.5%;

				background: #fff;
				margin-bottom:.10rem;

				img{
					display: block;
					width: 100%;
					height: 3.59rem;
				}
				.top{
					font-weight: normal;
					font-size: .24rem;
					color: #333;
					line-height: .30rem;
					padding: .08rem;
				}
				.botMoney{
					display: block;
					overflow: hidden;
					font-size: .20rem;
					color: #b2b2b2;
					font-style: normal;

					padding-right: .24rem;
					.left{
						text-decoration:line-through;

						float: left;


					}
					.right{
						float: right;

					}
				}

			}
		}
	}

</style>
