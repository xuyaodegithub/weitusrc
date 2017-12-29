	<template>
	<div class="order" style="margin-top: -240px">
    <div class="popover-head">
      <span class="title">预览效果</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
    </div>
      <div style="height: 454px;width: 300px;overflow: auto; padding:8px;" v-if="addCommodityResult[0].contents" v-bind:style="styleobj">


        <div v-for="item in addCommodityResult">
          <!--轮播图-->
          <img :src="item.contents[0].image | ToUrl" alt="" v-if="item.modelSampleCode=='advertisingFigure' && item.contents.length>0" style="width: 100%;height: 160px;">
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
              <img v-for="itemSon in item.contents" v-if="item.contents.length==5" style="width: 20%;"  :src='itemSon.image | ToUrl'/>
            </div>
          </div>
        </div>

        <!--分类-->
        <div class="list-top" v-show="addCommodityResult[addCommodityResult.length-1].contents.length!=0">
          <ul>
            <!--<li v-for="(itemsSon,index) in addCommodityResult[addCommodityResult.length-1].contents" style="width: auto;line-height: 40px;background: #409EFF;margin-right: 10px;border: 1px solid #333;">{{itemsSon.title}}</li>-->
              <el-button
                v-for="(itemsSon,key) in addCommodityResult[addCommodityResult.length-1].contents"
                type="primary"
                plain
                :key="key"
                size="mini"
                style="margin: 0;padding: 6px;"
                @click="changeKey(key)"
              >{{itemsSon.title}}</el-button>
          </ul>
        </div>
        <!--分类产品-->
        <div class="cent"  v-if="addCommodityResult[addCommodityResult.length-1].contents.length!=0">
          <ul class="init">
            <li v-for='item in addCommodityResult[addCommodityResult.length-1].contents[keyindex].dataList'>
              <img :src="item.image" alt="">
            </li>
          </ul>
        </div>
			</div>
	</div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
	export default {
		data : function() {
			return{
				listObj:[],
        keyindex:0,
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
			//console.log(this.backColorResult);
		},
    activated (){
		  console.log(this.backColorResult)
    },
		mounted(){

		},

		computed:{
      ...mapGetters([
        'addCommodityResult','backColorResult'
      ]),
      styleobj:function (){
        let obj={}
        if( this.backColorResult.modelSampleCode=='color'){
         obj = {'background':this.backColorResult.contents}
        }else if(this.backColorResult.modelSampleCode=="imgUrl"){
          obj = {
            'background-image':'url('+this.backColorResult.contents+')',
            'background-repeat': 'no-repeat',
          }
        }else{
          obj={}
        }
        console.log(obj)
        return obj
      }
		},
		methods:{
      ...mapActions([
        'popoverAlert'
      ]),
      changeKey(key){
        this.keyindex=key
      }

		}
	}
</script>

<style lang="scss" scoped>
.order{
  position: absolute;
  left:40%;
  top:50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
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
    .init{
      display: flex;
      flex-wrap: wrap;
    }
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
