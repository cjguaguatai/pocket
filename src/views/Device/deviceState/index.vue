<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:12:09
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:12:09
-->
<template>
  <div class="app-main">
    <d-search nameOne="设备编号" />
    <!-- table -->
    <el-card class="box-card">
      <div class="result">
        <!-- 表格上方按钮 -->
        <div class="operation-btn">
          <!-- 点击新建按钮触发的事件 clickAddBtn -->
          <!-- 点击第二个按钮触发的事件  clickSecondBtn-->
          <my-buttom
            bcColor="orange"
            icon="el-icon-circle-plus-outline"
            @click.native="$emit('clickAddBtn')"
            >新建</my-buttom
          >
        </div>
        <!-- 列表 -->
        <div class="result-list">
          <el-table
            :data="tableData"
            style="width: 100%"
            row-key="String"
            ref="table"
            v-loading="loading"
          >
            <!-- 序号列 -->
            <el-table-column
              prop="itemIndex"
              label="序号"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="innerCode"
              label="设备编号"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="type.name"
              label="设备型号"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="node.addr"
              label="详细地址"
              width="300"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="vmStatus"
              label="运营状态"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="status"
              label="设备状态"
              width="250"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span
                  class="statusBtn"
                  :class="{ faultStatusBtn: item.color }"
                  v-for="(item, index) in status(scope.row.status)"
                  :key="index"
                  >{{ item.text }}</span
                >
              </template>
            </el-table-column>
            <!-- 操作列 -->
            <el-table-column fixed="right" label="操作" prop="taskId">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="handleClick(scope.row)"
                  size="medium"
                  class="operationBtn"
                  >操作
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <!-- $attrs 祖孙传值  $listeners 方法-->
          <my-pagination
            :totalPage="totalPage"
            :totalCount="totalCount"
            :pageIndex="pageIndex"
            @upPage="upPage"
            @nextPage="nextPage"
          ></my-pagination>
        </div></div
    ></el-card>
  </div>
</template>

<script>
import DSearch from "@/components/Search.vue";
import DResultList from "@/components/ResultList.vue";
import MyButtom from "@/components/Button.vue";
import MyPagination from "@/components/Pagination.vue";
import { getSearchList } from "@/api/vm";

export default {
  components: {
    DSearch,
    DResultList,
    MyButtom,
    MyPagination,
  },

  data() {
    return {
      searchParams: {}, // 搜索数据
      searchList: [], // table渲染列表（根据搜索获得）
      tableData: [], //table 渲染数据
      pageIndex: "", // 当前页数
      totalPage: "", //  总页数
      totalCount: "", // 总共多少条记录
      loading: false, // 控制加载
    };
  },

  created() {
    this.getSearchList(this.searchParams);
  },

  methods: {
    // 获取渲染列表
    async getSearchList(data) {
      this.loading = true;
      const res = await getSearchList(data);
      this.pageIndex = res.pageIndex;
      this.totalPage = res.totalPage;
      this.totalCount = res.totalCount;
      this.changeTableData(res.currentPageRecords);
      this.loading = false;
    },
    // 更改数据
    changeTableData(arr) {
      let arr1 = arr;
      arr1.forEach((ele, index) => {
        if (ele.vmStatus === 0) {
          ele.vmStatus = "未投放";
        } else if (ele.vmStatus === 1) {
          ele.vmStatus = "运营";
        } else {
          ele.vmStatus = "撤机";
        }
        ele.itemIndex = (this.pageIndex - 1) * 10 + index + 1;
        // dayjs(ele.createTime);
        // ele.createTime = dayjs().format("YYYY.MM.DD HH.mm.ss");
        this.tableData = arr1;
        // console.log(this.tableData);
      });
    },
    // 点击操作按钮
    handleClick(row, val) {
      console.log(row);
      // 点击哪个按钮就把 当前这一列的信息 和 按钮的内容 val 传到父组件通过接收到的值触发不同处理函数，
      this.$emit("operationBtn", row, val);
    },
    // status 处理
    status(data) {
      let arr = [];
      // console.log(data);
      if (data["10001"]) {
        arr.push({ text: "在线", color: false });
      } else {
        arr.push({ text: "离线", color: true });
      }
      if (data["10002"]) {
        arr.push({ text: "货道", color: false });
      } else {
        arr.push({ text: "货道  ", color: true });
      }
      if (data["10003"]) {
        arr.push({ text: "传动轴", color: false });
      } else {
        arr.push({ text: "传动轴", color: true });
      }
      // console.log(arr);
      return arr;
    },
    // 点击上一页
    upPage() {
      this.getSearchList({
        pageIndex: --this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
    },
    // 点击下一页
    nextPage() {
      this.getSearchList({
        pageIndex: ++this.pageIndex,
        pageSize: 10,
        isRepair: false,
      });
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
  .statusBtn {
    height: 23px;
    padding: 0 12px;
    background: #ff665f linear-gradient(135deg, #3fc997, #4bda98);
    border-radius: 14px;
    text-align: center;
    color: #fff;
    line-height: 23px;
    margin-right: 10px;
  }
  .faultStatusBtn {
    background: #ff665f linear-gradient(135deg, #ffb043, #ffc020);
  }
}
</style>
