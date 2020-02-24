const request = require('request');
const moment = require('moment');
const fs = require('fs');
const config = require('./Config');
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
function deleteCsv(filename){
  fs.unlink(config.path + fs.readdirSync(config.path)[0],function () {
    console.log(`${filename} 已刪除`);
    downloadCsv(config.csvUrl, function () {
      console.log(`檔案已建立`);
      return (fs.readdirSync(config.path)[0]);
    })
  });
}

/**
 * (對外)更新資料接口
 * @param forceUpdate
 * @return {Promise<path>}
 */
data.updatePharmacy = function ( forceUpdate ) {
  return new Promise((resolve, reject) => {
    const pathFile = fs.readdirSync(config.path);
    if(pathFile.length === 0){
      downloadCsv(config.csvUrl, function () {
        console.log(`初次下載結束`);
        resolve(fs.readdirSync(config.path)[0]);
      });
    } else {
      const filename = pathFile[0];
      if(forceUpdate){
        console.log(`強制更新`);
        resolve(deleteCsv(filename));
      }else{
        const fileTime = Number(pathFile[0].replace(/pharmacy_|.csv/g,'')); // 取得檔案時間
        if(moment(fileTime).add(config.minute, "minutes").isBefore(moment().valueOf())){ // 看時間有沒有超過
          console.log(`超過${config.minute}分鐘`);
          deleteCsv(filename);
        } else {
          console.log(`距離上次時間未超過${config.minute}分鐘`);
          resolve(filename);
        }
      }
    }
  });
};

module.exports = data;