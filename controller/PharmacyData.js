const request = require('request');
const fs = require('fs');
const moment = require('moment');
const config = require('../config/Config');
const data = {};

/**
 * 下載 CSV
 * @param url
 * @param callback
 */
function downloadCsv( url, callback ){
  let stream = fs.createWriteStream(`${config.path}/pharmacy_${moment().valueOf()}.csv`);
  request(url).pipe(stream).on('close', callback);
}

/**
 * 刪除過期的CSV檔案
 * @param filename
 */
function deleteCsv(filename, index){
  return new Promise((resolve, reject) => {
    fs.unlink(config.path + fs.readdirSync(config.path)[index],function () {
      console.log(`${filename} 已刪除`);
      downloadCsv(config.csvUrl, function () {
        console.log(`檔案已建立`);
        return resolve (fs.readdirSync(config.path)[index]);
      })
    });
  });
}

/**
 * 更新資料接口
 * @param forceUpdate
 * @return {Promise<path>}
 */
data.updatePharmacy = function ( forceUpdate ) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(config.path)) {
      fs.mkdirSync(config.path);
    }
    const pathFile = fs.readdirSync(config.path);
    let fileIndex = -1;
    pathFile.forEach((item, index)=>{
      if (item.indexOf('pharmacy_') > -1) {
        fileIndex = index;
        return;
      }
    });
    console.log(`fileindex ${fileIndex}`);
    if(fileIndex === -1){
      downloadCsv(config.csvUrl, function () {
        console.log(`初次下載結束`);
        resolve(fs.readdirSync(config.path)[fileIndex]);
      });
    } else {
      const filename = pathFile[fileIndex];
      if(forceUpdate){
        console.log(`強制更新`);
        resolve(await deleteCsv(filename, fileIndex));
      } else {
        const fileTime = Number(pathFile[fileIndex].replace(/pharmacy_|.csv/g,'')); // 取得檔案時間
        if(moment(fileTime).add(config.minute, "minutes").isBefore(moment().valueOf())){ // 看時間有沒有超過
          console.log(`超過${config.minute}分鐘`);
          resolve(await deleteCsv(filename, fileIndex));
        } else {
          console.log(`距離上次時間未超過${config.minute}分鐘`);
          resolve(filename);
        }
      }
    }
  });
};

/**
 * 讀取線上CSV接口
 * @return {Promise<String>}
 */
data.readOnlineCsv = function() {
  return new Promise((resolve, reject) => {
    request.get(config.csvUrl,(err, res, body)=>{
      if(!err){
        console.log(`更新資料 :${moment().format('YYYY年 MM月 DD日 HH時 mm分 ss秒')}`);
        return resolve(body);
      }else{
        return reject(err);
      }
    });
  });
};

module.exports = data;
