<template>
  <div class="seach-list" id="SaleNewone">
    <el-table
      v-loading="loading"
      :data="feactData"
      style="width: 100%"
      ref="multipleTable"
      tooltip-effect="light"
      :cell-style="{'height': '50px','padding': '6px 0'}"
      :header-cell-style="{'color':'#000000','fontWeight':'600'}">
      <!-- <el-table-column
         type="selection"
         width="30">
       </el-table-column>-->
      <el-table-column
        v-for="(item,index) in dataList"
        :label="item.title"
        :key="index"
        :width="item.width"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="item.which==='isHeader'">
            <img :src="scope.row[item.which]" alt="" style="height: 78px;width: 78px;">
          </span>
          <span v-else-if="item.which==='isStutas'">
            {{scope.row[item.which] === 0 ? '已禁用' : '未禁用'}}
          </span>
          <span v-else-if="item.which==='isNum'">
            <div class="listbtn">
                          <el-button type="info" plain size="mini">查看文章</el-button>
            </div>
          </span>
          <span v-else>{{scope.row[item.which]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="updata(scope.row)" plain>编辑
          </el-button>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-sort"
            @click="changeStatus(scope.row)" plain>更改禁用状态
          </el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-sort"
            @click="putMsg(scope.row)" plain>发布发现
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage5"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="feactData.length">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

  export default {
    props: ['msg'],
    name: 'seachNumber',
    data () {
      return {
        currentPage5:1,
        rows:10,
        dataList: [
          {title: '账号昵称', width: '120', which: 'isName'},
          {title: '头像', width: '120', which: 'isHeader'},
          {title: '帐号说明', width: '240', which: 'isMsg'},
          {title: '发现数量', width: '120', which: 'isNum'},
          {title: '是否禁用', width: '120', which: 'isStutas'},
//          {title:'账号昵称',width:'100',which:'isN'},
        ],
        feactData: [
          {
            isName: '小九九',
            isHeader: 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/86577d8ad5730e8d94d0a749b7892c5d68d4888f',
            isMsg: '小九九七大姑八大姨三一九',
            isNum: 100,
            isStutas: 0
          },
          {
            isName: '小溜溜',
            isHeader: 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/86577d8ad5730e8d94d0a749b7892c5d68d4888f',
            isMsg: '小溜溜七大姑八大姨三一九',
            isNum: 100,
            isStutas: 1
          },
          {
            isName: '小嗨嗨',
            isHeader: 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/86577d8ad5730e8d94d0a749b7892c5d68d4888f',
            isMsg: '小嗨嗨七大姑八大姨三一九',
            isNum: 100,
            isStutas: 1
          },
          {
            isName: '小妹妹',
            isHeader: 'https://ol-quan2017.oss-cn-shanghai.aliyuncs.com/imgs/86577d8ad5730e8d94d0a749b7892c5d68d4888f',
            isMsg: '小妹妹七大姑八大姨三一九',
            isNum: 100,
            isStutas: 0
          },
        ]
      }
    },
    computed: {
      ...mapGetters([
        'loading'
      ]),

    },
    watch: {
//      PproductgetByIdResult: {
//        handler (newVal, oldVal) {
//          let that = this
//          console.log(newVal.title + ',' + oldVal.title)
//          if (newVal.title == oldVal.title) {
//            that.priceListUpdata = []
//            that.activeUpdata = []
//            newVal.item.forEach((val, index) => {
//              that.priceListUpdata.push(val.commission)
//              that.activeUpdata.push(val.salePriceView)
//            })
//            //console.log(this.priceListUpdata)
//          }
//        },
//        deep: true
      //     },
    },
    activated () {

    },
    mounted () {

    },
    methods: {
      ...mapActions([
        'popoverAlert',
      ]),
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)

      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)

      },
      updata(item){
        let data={
          title:'vNew',
          data:item
        }
        this.$emit('to-change',data)
      },
      changeStatus(item){

      },
      putMsg(item){
        let data={
          title:'vNewmsg',
          data:item
        }
        this.$emit('to-change',data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #SaleNewone.seach-list {
    margin-top: 16px;
    padding-left: 30px;
   .listbtn .el-button--mini, .el-button--mini.is-round {
      padding: 4px 5px;
    }
  }
  .block{
    padding:30px;
    text-align: center;
    /*margin-left: 500px;*/
  }
</style>
