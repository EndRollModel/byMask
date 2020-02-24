const config = require('./Config');
const pharmacyData = require('./PharmacyData');
const Parser = require('./LoadCsv');

async function processingData(keyword) {
  const fileName = await pharmacyData.updatePharmacy();// 先更新資料
  const parser = new Parser(config.path + fileName);
  console.log(parser.allKeys);
  parser.find2Json(keyword).forEach((item, index, thisArr)=>{
    if (index === 0) {
      console.log(`符合條件:${thisArr.length}家`)
    }
    if (item['成人口罩剩餘數'] > 0) {
      console.log(item['醫事機構名稱']);
      console.log(item['醫事機構地址']);
      console.log(item['醫事機構電話']);
      console.log(`成人口罩剩餘數量:${item['成人口罩剩餘數']}`);
      console.log(`兒童口罩剩餘數量:${item['兒童口罩剩餘數']}`);
      console.log(`最後更新時間:${item['來源資料時間']}`);
      console.log(`--------------------`)
    }
  });
};

// 使用方法 ↓
// processingData(關鍵字)
