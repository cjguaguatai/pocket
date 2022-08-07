<template>
  <div>
    <!-- 头部 -->
    <el-card class="box-card" body-style="display: flex">
      <searchInput :value.sync="searchData.taskCode">工单编号</searchInput>
      <searchSelect :options="allTaskStatus" @select="changeSelect"
        >工单状态</searchSelect
      >
      <el-button
        type="primary"
        size="medium "
        icon="el-icon-search"
        class="searchBtn"
        @click="searchFn"
        >搜索</el-button
      >
    </el-card>

    <!-- main -->
    <el-card class="main_box">
      <div class="edit">
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-circle-plus-outline"
          class="addBtn"
          @click="addFormShow = true"
          >新建</el-button
        ><el-button type="primary" size="medium" class="configureBtn"
          >工单配置</el-button
        >
      </div>
      <!-- table -->
      <task-table
        :tableData="tableData"
        :tableArr="tableArr"
        :operation="operation"
      >
      </task-table>
      <!-- footer -->
      <footerCase
        :SearchObj="SearchObj"
        @addPageIndex="addPageIndex"
        @lastPageIndex="lastPageIndex"
      />
    </el-card>
    <task-dialog :show="addFormShow">12345678</task-dialog>
  </div>
</template>

<script>
import searchInput from "@/components/searchInput";
import searchSelect from "@/components/searchSelect";
import footerCase from "@/components/footerCase";
import TaskTable from "../components/task_table.vue";
import TaskDialog from "../components/task_dialog.vue";
import { getAllTaskStatus, getTaskSearchList } from "@/api/task";
import dayjs from "dayjs";
export default {
  name: "task-business",
  data() {
    return {
      tableData: [],
      // currentRow: null,
      allTaskStatus: [], //工单状态列表
      SearchObj: {}, //工单搜索返回的全部内容
      // 根据搜索框搜索
      searchData: {
        pageIndex: "1",
        taskCode: "",
        status: "",
      },
      addFormShow: false, // 新增表单显隐
      tableArr: [
        { prop: "taskCode", label: "工单编号" },
        { prop: "innerCode", label: "设配编号" },
        { prop: "taskType.typeName", label: "工单类型" },
        { prop: "createType", label: "工单方式" },
        { prop: "taskStatusTypeEntity.statusName", label: "工单状态" },
        { prop: "userName", label: "运营人员" },
        { prop: "createTime", label: "创建日期" },
      ],
      operation: [{ title: "查看详情", color: false } ],
    };
  },

  created() {
    this.getAllTaskStatus();
    this.getTaskSearchList(this.searchData);
  },

  methods: {
    // 工单搜索
    async getTaskSearchList(obj) {
      try {
        const { data } = await getTaskSearchList(obj);
        this.SearchObj = data;
        if (data.currentPageRecords.length === 0) {
          this.tableData = [];
          this.SearchObj.pageIndex = 0;
          return;
        }
        this.pageIndex = data.pageIndex;
        // 更改数据
        this.changeTableData(data.currentPageRecords);
      } catch (error) {
        console.log(error);
      }
    },
    // 获取工单状态列表
    async getAllTaskStatus() {
      try {
        const { data } = await getAllTaskStatus();
        this.allTaskStatus = data;
      } catch (error) {
        console.log(error);
      }
    },

    // 更改数据
    changeTableData(arr) {
      let arr1 = arr;
      arr1.forEach((ele, index) => {
        if (ele.createType === 0) {
          ele.createType = "自动";
        } else {
          ele.createType = "手动";
        }
        if (ele.taskStatus === 1) {
          ele.taskStatus = "待办";
        } else if (ele.taskStatus === 2) {
          ele.taskStatus = "进行";
        } else if (ele.taskStatus === 3) {
          ele.taskStatus = "取消";
        } else {
          ele.taskStatus = "完成";
        }
        ele.id = (this.pageIndex - 1) * 10 + index + 1;
        dayjs(ele.createTime);
        ele.createTime = dayjs().format("YYYY.MM.DD HH.mm.ss");
        this.tableData = arr1;
        // console.log(this.tableData);
      });
    },
    // 下一页
    addPageIndex() {
      this.searchData.pageIndex++;
      this.getTaskSearchList(this.searchData);
    },
    // 上一页
    lastPageIndex() {
      this.searchData.pageIndex--;
      this.getTaskSearchList(this.searchData);
    },
    // 工作状态改变
    changeSelect(val) {
      this.searchData.status = val;
    },
    searchFn() {
      this.searchData.pageIndex = "1";
      this.getTaskSearchList(this.searchData);
    },
  },
  components: { searchInput, searchSelect, footerCase, TaskTable, TaskDialog },
};
</script>

<style scoped lang="scss">
.searchBtn {
  background-color: #5f84ff !important;
}
.addBtn {
  background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
  border: none;
}
.configureBtn {
  background-color: #fbf4f0 !important;
  border: none;
  color: #655b56 !important;
}
.box-card {
  margin-bottom: 17px;
}
.edit {
  margin-bottom: 20px;
}
</style>
