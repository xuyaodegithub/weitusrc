	<template>
	<div class="order" style="margin-top: -270px;margin-left:-50px;">
    <div class="popover-head">
      <span class="title">预览效果</span><i v-on:click="popoverAlert()" class="el-icon-close"></i>
      <p></p>
      <p></p>
    </div>
      <div style="height: 404px;width: 260px;overflow: auto;" v-if="addCommodityResult[0].contents" v-bind:style="styleobj">


        <div v-for="item in addCommodityResult">
          <!--轮播图-->
          <!--<img :src="item.contents[0].image | ToUrl" alt="" v-if="item.modelSampleCode=='advertisingFigure' && item.contents.length>0" style="width: 100%;height: 160px;">-->
          <el-carousel indicator-position="none"  :interval="1000"  height="150px" v-if="item.modelSampleCode=='advertisingFigure' && item.contents.length>0">
            <el-carousel-item v-for="(items,index) in item.contents" :key="index">
              <img :src="items.image | ToUrl" alt=""  style="width: 100%;height: 160px;">
            </el-carousel-item>
          </el-carousel>
          <!--能滑动的-->
            <ul class="touchImg" v-if="item.modelSampleCode=='titleproducttouch'">
              <li v-for="itemSons in item.contents" style="height: 70px;width: 70px;border: 1px solid skyblue;"><img :src="itemSons.image | ToUrl" style="height: 100%;width: 100%;"/></li>
            </ul>


          <!--等分图片-->
          <div class="img" v-if="item.modelSampleCode=='f5'" :style="backStyle">
            <div  v-for="itemSon in item.contents" v-if="item.contents.length==2" style="width:50%">
              <img  :src='itemSon.image | ToUrl'/>
            </div>
            <div  v-for="itemSon in item.contents" v-if="item.contents.length==3" style="width: 33.3%;">
              <img  :src='itemSon.image | ToUrl'/>
            </div>
            <div  v-for="itemSon in item.contents" v-if="item.contents.length==1" style="width: 100%;">
              <img  :src='itemSon.image | ToUrl'/>
            </div>
            <div  v-for="itemSon in item.contents" v-if="item.contents.length==4" style="width:25%;">
              <img  :src='itemSon.image | ToUrl'/>
            </div>
            <div  v-for="itemSon in item.contents" v-if="item.contents.length==5" style="width: 20%;">
              <img  :src='itemSon.image | ToUrl'/>
            </div>
              <!--<img v-for="itemSon in item.contents" v-if="item.contents.length==3" style="width: 33.3%;" :src='itemSon.image'/>-->
              <!--<img v-for="itemSon in item.contents" v-if="item.contents.length==1" style="width:100%;height:100px;" :src='itemSon.image'/>-->
              <!--<img v-for="itemSon in item.contents" v-if="item.contents.length==4" style="width: 25%;"  :src='itemSon.image'/>-->
              <!--<img v-for="itemSon in item.contents" v-if="item.contents.length==5" style="width: 20%;"  :src='itemSon.image'/>-->
          </div>
        </div>

        <!--分类-->
        <div class="list-top" v-show="addCommodityResult[addCommodityResult.length-1].contents.length>0 && addCommodityResult[addCommodityResult.length-1].modelSampleCode ==='catlist1'">
          <ul>
            <!--<li v-for="(itemsSon,index) in addCommodityResult[addCommodityResult.length-1].contents" style="width: auto;line-height: 40px;background: #409EFF;margin-right: 10px;border: 1px solid #333;">{{itemsSon.title}}</li>-->
              <li
                ref="classFB"
                class="cu"
                v-for="(itemsSon,key) in addCommodityResult[addCommodityResult.length-1].contents"
                :key="key"
                style="margin: 0;padding: 6px;font-weight: 600;color: #999999;"
                :class="{background : keyNum===key}"
                @click="changeKey(key)"
              >{{itemsSon.title}}</li>
          </ul>
          <div class="cent">
            <ul class="init">
              <li v-for='item in addCommodityResult[addCommodityResult.length-1].contents[keyindex].dataList'>
                <img :src="item.image" alt="">
              </li>
            </ul>
          </div>
        </div>
        <!--分类产品-->
        <!--<div class="cent"  v-if="addCommodityResult[addCommodityResult.length-1].contents.length>0 && addCommodityResult[addCommodityResult.length-1].modelSampleCode==='catlist1'">
          <ul class="init">
            <li v-for='item in addCommodityResult[addCommodityResult.length-1].contents[keyindex].dataList'>
              <img :src="item.image" alt="">
            </li>
          </ul>
        </div>-->
			</div>
    <div class="footer_v">
      <p></p>
    </div>
	</div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
	export default {
		data : function() {
			return{
        keyindex:0,
        keyNum:0,
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
      window.addEventListener('scroll',this.onpage)
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
        if(this.backColorResult.modelSampleCode=='color'){
         obj = {'background':this.backColorResult.contents}
        }else if(this.backColorResult.modelSampleCode=="imgUrl"){
          obj = {
            'background-image':'url('+this.backColorResult.contents+')',
            'background-repeat': 'no-repeat',
            'background-size':'cover'
          }
        }
        console.log(obj)
        return obj
      },
      backStyle:function(){
        let obj={}
       this.addCommodityResult.forEach(function(val,index){
         if(val.modelSampleCode==='f5' && val.length===2){
           obj={

           }
         }
       })
      }
      /*objPadd:function(){
        let obj={}
        if(this.addCommodityResult[this.addCommodityResult.length-1].modelSampleCode==='catlist1'){
           obj={
            'margin-bottom':this.addCommodityResult[this.addCommodityResult.length-1].marginData + 'px'
          }
        }
        return obj
      }*/
		},
		methods:{
      ...mapActions([
        'popoverAlert'
      ]),
      changeKey(key){
        this.keyindex=key
        this.keyNum=key
//        window.scrollTo(0,100)
      },
      detail(url){
       window.open(url)
        let data=1515493081168-60000
        //alert(data)
        //alert(new Date(data).toLocaleString())
      },
      onpage(){
        let page=this.$refs.classFB[0]
        console.log(page.offsetTop)
      }

		}
	}
</script>

<style lang="scss" scoped>
.order{
  background: pink;
  border-top-left-radius:30px;
  border-top-right-radius:30px;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
  border:3px solid #EBEEF1;
  position: absolute;
  left:40%;
  top:50%;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  overflow: hidden;
  padding:0 6px;
}
.popover-head{
  width: 100%;
  height: 70px;
  line-height: 40px;
  font-size: 14px;
  border-bottom: 1px solid #C5E2F0;
}
.footer_v{
  width: 100%;
  height: 55px;
  border-bottom-left-radius:30px;
  border-bottom-right-radius:30px;
}

.footer_v p{
  width:30px;
  height:30px;
  border:2px solid rgba(245, 170, 7, 0.81);
  border-radius: 50%;
  margin:0 auto;
  margin-top:15px;
  background: #ffffff;
}
.popover-head p:nth-child(3){
  width:12px;
  height:12px;
  border-radius: 50%;
  background:rgba(219, 225, 222, 1) ;
  margin:0 auto;
  margin-top: -20px;
}
.popover-head p:nth-child(4){
  width:80px;
  height:8px;
  background:rgba(219, 225, 222, 1);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  margin:0 auto;
  margin-top: 8px;

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
    display: flex;
    justify-content: space-between;
		overflow: hidden;
		img{

			display: block;
			width: 100%;
			//float: left;


    }
	}
	.list-top{
		width: 100%;
		& > ul{
			width:100%;
		   	white-space:nowrap;
		    overflow: auto;
      .background{
        background:skyblue;
      }
		    li{
			      display: inline-block;
			      padding:0 ;
		  		  margin: 0;
		    }
		}

	}
	.cent{
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
        width:49.5%;
				background: #fff;
				margin-bottom:2.6px;

				img{
					display: block;
					width: 100%;
				}
			}
		}
	}

</style>
