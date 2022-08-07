<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-05 20:38:44
 * @LastEditors: sj
 * @LastEditTime: 2022-08-05 21:32:19
-->
<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item :label="nameOne+':'">
        <el-input v-model.trim="taskCode" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item :label="nameTwo+':'" v-if="Two">
        <el-select v-model.trim="taskStatus" placeholder="请选择">
          <el-option :label="item" :value="++index" v-for="(item, index) in optionArr" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <my-buttom type="primary" icon="el-icon-search" @click.native="searchBtn"
          >查询</my-buttom
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MyButtom from '@/components/Button.vue'
export default {
  data(){
    return{
    taskCode:'',
    taskStatus:''
    }
  },
  props:{
    nameOne:{
      type: String,
      required: true,
    },
    nameTwo:{
      type:String,
    },
    optionArr:{
      type:Array
    },
    Two:{
      type: Boolean,
      default: false
    }
  },
  components:{
    MyButtom
  },
  methods:{
      searchBtn() {
      if(this.taskCode===''&&this.taskStatus==='') return this.$message('查询不能为空')
      this.$emit('search',this.taskCode,this.taskStatus)
    },
  }
};
</script>

<style lang="scss" scoped>
  .search {
    height: 64px;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
    }
  }
</style>
