<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:02:49
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:02:49
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-05 23:10:34
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 02:12:20
-->
<template>
  <el-pagination layout="slot" size="10" class="pagination">
    <slot>
      <span>共{{ totalCount }}条记录 第{{ pageIndex }}/{{ totalPage }}页</span>
    </slot>
    <el-button class="pageBtn" @click="upPage" :disabled="upPageBtn"
      >上一页</el-button
    >
    <el-button class="pageBtn" @click="nextPage" :disabled="nextPageBtn"
      >下一页</el-button
    >
  </el-pagination>
</template>

<script>
export default {
  props: {
    // 总共多少条记录
    totalCount: {
      type: [Number, String],
      default: "",
    },
    //  总页数
    totalPage: {
      type: [Number, String],
      default: "",
    },
    //  当前页数
    pageIndex: {
      type: [Number, String],
      default: "",
    },
  },
  methods: {
    // 点击上一页
    upPage() {
      this.$emit("upPage");
    },
    // 点击下一页
    nextPage() {
      this.$emit("nextPage");
    },
  },
  computed: {
    upPageBtn() {
      return this.pageIndex === "1" ? true : false;
    },
    nextPageBtn() {
      return this.pageIndex === this.totalPage ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 32px 16px;
  span {
    flex: 1;
    font-size: 16px !important;
    color: #dbdfe5 !important;
  }

  .pageBtn {
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
  }
}
</style>
