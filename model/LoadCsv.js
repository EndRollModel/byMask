const fs = require('fs');

class LoadCsv {
  /**
   * 建構子 需要檔案路徑/檔案內容
   * @param file
   */
  constructor( file = undefined ) {
    if(file === undefined){
      this._file = '';
      return;
    }
    if(file.indexOf('.csv') > -1){
      this._file = fs.readFileSync(file, 'utf-8').split(/\r?\n/); // 非path
    } else {
      this._file = file.split(/\r?\n/); // 直接讀取檔案
    }
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

  set file( file ){
    if(file.indexOf('.csv') > -1){
      this._file = fs.readFileSync(file, 'utf-8').split(/\r?\n/);
    } else {
      this._file = file.split(/\r?\n/);
    }
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
          findArray.push(item);
        }
      }
    });
    return this.toJson(findArray);
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


