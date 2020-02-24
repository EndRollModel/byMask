const fs = require('fs');

/**
 * 解析CSV
 */
class LoadCsv {
  /**
   * 建構子 需要檔案路徑
   * @param filePath
   */
  constructor( filePath ) {
    this._file = fs.readFileSync(filePath, 'utf-8').split(/\r?\n/);
  }

  /**
   * 資料筆數
   * @return {number}
   */
  count(){
    return this._file.length - 1;
  }

  /**
   * 取得資料陣列
   * @return {Array}
   */
  get file(){
    return this._file;
  }

  /**
   * 轉成Json
   * @return {Object}
   */
  toJson(file = null){
    const resolve = []; //最終回饋
    let csvKey = [];
    const csvFile = ( file === null ) ?  this._file : file ;
    csvFile.forEach((item, index)=>{
      const csvObject = {};
      if ( index === 0 ){
        csvKey = item.split(',');
      } else {
        item.split(`,`).forEach((elem, num)=>{
          csvObject[csvKey[num]] = elem
        });
        resolve.push(csvObject);
      }
    });
    return resolve;
  }

  /**
   * 找到關鍵字並且轉換成JSON
   * @param keywords
   * @return {Object}
   */
  find2Json( keywords ){
    if (keywords === undefined){
      return this.toJson()
    }
    const findArray = [];
    this._file.forEach((item, index)=>{
      if(index === 0){
        findArray.push(item);
      }else{
        if (item.indexOf(keywords) > -1) {
          findArray.push(item)
        }
      }
    });
    return this.toJson(findArray)
  }

  /**
   * 撈取特定筆數的資料
   * @param num
   * @return {string}
   */
  index( num ){
    return this._file[num];
  }

  /**
   * 取得CSV所有的Key
   * @return {Array}
   */
  get allKeys(){
    return this._file[0].split(`,`);
  }

}

module.exports = LoadCsv;


