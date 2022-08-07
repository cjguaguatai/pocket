<!--
 * @Descripttion:
 * @version:
 * @Author: suiyue
 * @email: 1373842098@qq.com
 * @Date: 2022-08-03 20:11:13
 * @LastEditors: sj
 * @LastEditTime: 2022-08-03 20:11:13
-->
<template>
  <div class="app-main">
    <d-search nameOne="设备编号" @search="searchFn" />
    <el-card v-loading="loading">
      <result-list
        :totalPage="totalPage"
        :totalCount="totalCount"
        :pageIndex="pageIndex"
        :tableData="tableData"
        :tableArr="tableArr"
        @upPage="upPage"
        @nextPage="nextPage"
        :operation="{
          opeWidth: '80',
          ope: [{ title: '查看', color: false }],
        }"
        :selection="true"
      />
    </el-card>
  </div>
</template>

<script>
import DSearch from "@/components/Search.vue";
import ResultList from "@/components/ResultList.vue";
import { getSearchList } from "@/api/vm";

export default {
  components: { DSearch, ResultList },

  data() {
    return {
      searchParams: {}, // 搜索数据
      searchList: [], // table渲染列表（根据搜索获得）
      tableData: [], //table 渲染数据
      pageIndex: "", // 当前页数
      totalPage: "", //  总页数
      totalCount: "", // 总共多少条记录
      loading: false, // 控制加载
      tableArr: [
        { prop: "innerCode", label: "设备编号" },
        { prop: "type.name", label: "设备型号" },
        { prop: "node.addr", label: "详细地址" },
        { prop: "ownerName", label: "合作商" },
        { prop: "vmStatus", label: "运营状态" },
      ],
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
    // 搜索
    searchFn(val) {
      this.getSearchList({ innerCode: val });
    },
  },
};
</script>

<style></style>
