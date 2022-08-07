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
