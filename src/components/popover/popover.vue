<template>
    <div class="popover">
        <component :is="popoverAlive.title"></component>
    </div>
</template>

<style scoped>
  .popover{
      z-index: 1000;
      position: relative;
      width:auto;
      height: auto;
  }
</style>
<script>
  import vBalance from './balance.vue'
//活动管理
  import vAddSubass from '../activeList/alert/addSubass.vue'
  import vAddGoods from '../activeList/alert/addGoods.vue'
  import Vdetail from '../activeList/alert/detail.vue'
  import VaddBackground from '../activeList/alert/addBackground.vue'
  import VactiveDress from '../activeList/alert/activeDress.vue'
  import VclassSell from '../activeList/alert/classSell.vue'
  import VactiveLianJian from '../activeList/alert/activeLianjie.vue'
//优惠券
  import VchoseGoods from '../Coupon/alert/ChoseGoods.vue'
  import VwithYHQ from '../Coupon/alert/withYHQ.vue'
  import VChoseGoodsStore from '../Coupon/alert/ChoseGoodsStore.vue'



  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
          changeAlert: 'vDemo'
      };
    },
    components:{
     vBalance,vAddSubass,vAddGoods,Vdetail,VaddBackground,VactiveDress,VclassSell,VactiveLianJian,
      VchoseGoods,VwithYHQ,VChoseGoodsStore

    },
    methods: {
    },
    computed: {
    // 使用对象展开运算符将 getters 混入 computed 对象中
      ...mapGetters([
        'popoverAlive'
      ])
    }
  };
</script>
