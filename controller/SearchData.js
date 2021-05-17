const config = require('../config/Config');
const pharmacyData = require('./PharmacyData');
const csvLoadCsv = require('../model/LoadCsv');
const searchData = {};

/**
 * 最早版本
 * @param keyword
 * @return {Promise<any>}
 */
searchData.processingData = function (keyword) {
  return new Promise(async (resolve, reject) => {
    const fileName = await pharmacyData.updatePharmacy(config.forceUpdate);// 原寫法 - 先更新資料 ( 可設定時間不下載 短期整理資訊可變快 )
    const parser = new csvLoadCsv(config.path + fileName); // 原寫法 - 取路徑
    const finalData = {};
    const dataArray = [];
    parser.find2Json(keyword).forEach((item, index, thisArr)=>{
      const pharmacyObject = replaceItem(item);
      dataArray.push(pharmacyObject);
    });
    finalData.count = dataArray.length;
    finalData.data = dataArray;
    resolve(finalData);
  });
};

/**
 * 全字串搜尋
 * @param data
 * @param keyword
 * @return {Promise<any>}
 */
searchData.keywordSearch = function (data, keyword) {
  return new Promise(async (resolve, reject) => {
    const parser = new csvLoadCsv(data);
    const finalData = {};
    const dataArray = [];
    parser.find2Json(keyword).forEach((item, index, thisArr)=>{
      const pharmacyObject = replaceItem(item);
      dataArray.push(pharmacyObject);
    });
    finalData.count = dataArray.length;
    finalData.data = dataArray;
    resolve(finalData);
  });
};

/**
 * 搜尋藥局名稱 藥局關鍵字
 * @param data
 * @param name
 * @return {Promise<any>}
 */
searchData.pharmacyNameSearch = function(data, name) {
  return new Promise(async (resolve, reject) => {
    const parser = new csvLoadCsv(data);
    const finalData = {};
    const dataArray = [];
    parser.find2Json(name).forEach((item, index)=>{
      if(item['醫事機構名稱'].indexOf(name) > -1){
        const pharmacy = replaceItem(item);
        dataArray.push(pharmacy);
      }
    });
    finalData.count = dataArray.length;
    finalData.data = dataArray;
    resolve(finalData);
  })
};

/**
 * 取代Object名稱與內容
 * @param  item
 * @return {Object}
 */
function replaceItem( item ){
  const pharmacyObject = {};
  pharmacyObject.code = item['﻿醫事機構代碼'];
  pharmacyObject.name = item['醫事機構名稱'];
  pharmacyObject.address = item['醫事機構地址'];
  pharmacyObject.phone = item['醫事機構電話'];
  pharmacyObject.adult_lave = item['成人口罩剩餘數'];
  pharmacyObject.child_lave = item['兒童口罩剩餘數'];
  pharmacyObject.updateTime = item['來源資料時間'];
  return pharmacyObject;
}

module.exports = searchData;
