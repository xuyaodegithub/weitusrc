<template>
  <div id="data">
    <ul>
      <li>
        一级栏目
        <ul>
          <li>二级栏目</li>
          <li>二级栏目</li>
          <li>
            二级栏目
            <ul>
              <li>三级栏目</li>
              <li>三级栏目</li>
              <li>三级栏目</li>
              <li>三级栏目</li>
              <li>三级栏目</li>
              <li>三级栏目</li>
            </ul>
          </li>
          <li>二级栏目</li>
          <li>二级栏目</li>
          <li>二级栏目</li>
        </ul>
      </li>
      <li>一级栏目</li>
      <li>一级栏目</li>
      <li>一级栏目</li>
      <li>
        一级栏目
        <ul>
          <li>二级栏目</li>
          <li>二级栏目</li>
          <li>
            二级栏目
            <ul>
              <li>三级栏目</li>
              <li>三级栏目</li>
              <li>三级栏目</li>
              <li>三级栏目</li>
              <li>三级栏目</li>
              <li>三级栏目</li>
            </ul>
          </li>
          <li>二级栏目</li>
          <li>二级栏目</li>
          <li>二级栏目</li>
        </ul>
      </li>
      <li>一级栏目</li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    name: 'login',
    data () {
      return {

      }
    },
    components:{

    },
    mounted(){
      $('li').has('ul').addClass('show').children('ul').hide();
      $('li').has('ul').click(function(ev){
        if(this==ev.target){
          if($(this).children('ul').is(':hidden')){//满足子元素ul显示
            $(this).addClass('hide').removeClass('show').children('ul').show(400);
          }else{
            $(this).addClass('show').removeClass('hide').children('ul').hide(400);
          }
        }
      });
    },
    computed:{
      ...mapGetters([
        'popoverAlive'
      ])
    },
    methods:{
      ...mapActions([
        'popoverAlert'
      ]),
      backTo(){
        this.$router.push({
          name:'',
          path:"/"
        })
      }
    }
  }
</script>

<style scoped>
  *{
    padding: 0px;
    margin: 0px;
  }
  body{
    padding: 100px;
  }
  ul{
    list-style: none;
    margin-left: 50px;
  }
  li{
    padding-left: 20px;
  }
 /* .show{
    background: url(./img/+.gif) no-repeat 0 5px;
  }
  .hide{
    background: url(./img/-.gif) no-repeat 0 5px;
  }*/

</style>
