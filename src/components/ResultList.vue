<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-07 10:02:05
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 10:02:05
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-05 23:06:21
 * @LastEditors: sj
 * @LastEditTime: 2022-08-07 09:52:21
-->
<template>
  <div class="result">
    <!-- 表格上方按钮 -->
    <div class="operation-btn" v-if="isShowBtn">
      <!-- 点击新建按钮触发的事件 clickAddBtn -->
      <!-- 点击第二个按钮触发的事件  clickSecondBtn-->
      <my-buttom
        bcColor="orange"
        icon="el-icon-circle-plus-outline"
        @click.native="$emit('clickAddBtn')"
        >新建</my-buttom
      >
      <my-buttom
        bcColor="lightsalmon"
        v-if="isShowSecondBtn"
        @click.native="$emit('clickSecondBtn')"
        >{{ secondBtnContent }}</my-buttom
      >
    </div>

    <!-- 列表 -->
    <div class="result-list">
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="String"
        ref="table"
      >
        <!-- 多选框 -->
        <el-table-column type="selection" v-if="selection"></el-table-column>
        <!-- 序号列 -->
        <el-table-column prop="itemIndex" label="序号" width="80"></el-table-column>
        <!-- 循环渲染列表主要内容 -->
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          v-for="(item, index) in tableArr"
          :key="index"
          :formatter="formatter"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- 操作列 -->
        <el-table-column
          fixed="right"
          label="操作"
          :width="length"
          prop="taskId"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleClick(scope.row, item.title)"
              size="medium"
              :class="{ color: item.color }"
              v-for="(item, index) in operation"
              :key="index"
              class="operationBtn"
            >
              {{ item.title }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- $attrs 祖孙传值  $listeners 方法-->
      <my-pagination
        v-bind="$attrs"
        v-on="$listeners"
        v-if="isShowPagination"
      ></my-pagination>
    </div>
  </div>
</template>

<script>
import MyPagination from "@/components/Pagination.vue";
import MyButtom from "@/components/Button.vue";
import dayjs from "dayjs";
export default {
  props: {
    // 是否显示表格上方按钮
    isShowBtn: {
      type: Boolean,
      default: true,
    },
    // 是否显示第二个按钮
    isShowSecondBtn: {
      type: Boolean,
      default: false,
    },
    // 第二个按钮的内容
    secondBtnContent: {
      type: String,
      default: "按钮",
    },
    isShowPagination: {
      type: Boolean,
      default: true,
    },
    // 表头数据
    tableArr: {
      type: Array,
      // default: [],
    },
    // 需要渲染的表格数据
    tableData: {
      type: Array,
      // default: [],
    },
    // 是否显示多选框
    selection: {
      type: Boolean,
      default: false,
    },
    // 操作框控制
    operation: {
      type: Array,
    },
  },
  components: {
    MyButtom,
    MyPagination,
  },
  methods: {
    formatter(row, column, cellValue) {
      //  console.log(cellValue);
      //  console.log(column);
      if (column.label === "创建日期") {
        return dayjs(row.updateTime).format("YYYY.MM.DD HH:mm:ss");
      } else if (column.label === "工单方式") {
        return row.createType ? "手动" : "自动";
      } else {
        return cellValue;
      }
    },
    handleClick(row, val) {
      console.log(row);
      // 点击哪个按钮就把 当前这一列的信息 和 按钮的内容 val 传到父组件通过接收到的值触发不同处理函数，
      this.$emit("operationBtn", row, val);
    },
  },
  computed: {
    length() {
      return this.operation?.length === 4 ? 200 : "";
    },
  },
};
</script>

<style lang="scss" scoped>
.color {
  color: red;
}
.operationBtn {
  margin-left: 0px !important;
}
.result {
  padding: 20px 15px 19px 17px;
  background-color: #fff;

  .operation-btn {
    margin-bottom: 20px;
  }
  ::v-deep .el-table th.is-leaf {
    line-height: 1.15;
    padding: 10px 0px 9px;
    background: rgb(243, 246, 251);
    font-weight: 500;
    text-align: left;
    color: rgb(102, 102, 102);
    border-bottom: 0;
  }
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
}
</style>
