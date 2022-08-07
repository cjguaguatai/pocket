<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-06 20:07:48
 * @LastEditors: sj
 * @LastEditTime: 2022-08-06 20:53:43
-->
<template>
  <el-dialog
    class="dialog"
    :title="dialogTitle"
    :visible="dialogVisible"
    @close="handleClose"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogTitle: {
      type: String,
      required: true,
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    margin-top: 5vh;
    width: 630px;
    position: relative;
    margin: 0 auto;
    background: #fff;
    box-sizing: border-box;
    border-radius: 10px;
  }
}
</style>
