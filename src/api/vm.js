import request from "@/utils/request";

/**
 * 搜索售货机(售货机列表)
 * @param {Object} params
 * @returns
 */
export const getSearchList = (params) => {
  return request({
    url: "/api/vm-service/vm/search",
    params,
  });
};

/**
 * 售货机类型列表(搜索)
 * @param {Object} params
 * @returns
 */
export const getTypeList = (params) => {
  return request({
    url: "/api/vm-service/vmType/search",
    params,
  });
};

/**
 * 获取售货机维修次数
 * @param {String} innerCode
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getRepairCount = (innerCode, start, end) => {
  return request({
    url:
      "/api/task-service/task/repairCount/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
};

/**
 * 获取售货机补货次数
 * @param {String} innerCode
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getSupplyCount = (innerCode, start, end) => {
  return request({
    url:
      "/api/task-service/task/supplyCount/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
};

/**
 * 获取售货机商品销量
 * @param {String} innerCode
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getSkuCollect = (innerCode, start, end) => {
  return request({
    url:
      "/api/order-service/report/skuCollect/" +
      innerCode +
      "/" +
      start +
      "/" +
      end,
  });
};

/**
 * 获取售货机销售额
 * @param {String} innerCode
 * @param {String} start
 * @param {String} end
 * @returns
 */
export const getOrderAmount = (innerCode, start, end) => {
  return request({
    url: "/api/order-service/report/orderAmount",
    params: {
      innerCode,
      start,
      end,
    },
  });
};
