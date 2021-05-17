const express = require('express');
const app = express();
const index = require('./controller/SearchData');
const config = require('./config/Config');
const data = require('./controller/PharmacyData');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
let pharmacyData = ''; //
let returnData; // 須回傳的資料

app.post('/',async (req, res)=>{
    if(pharmacyData !== ''){
      if(req.body['keywords']) {
        returnData = await index.keywordSearch(pharmacyData, req.body['keywords']);
      }
      if(req.body['name']) {
        returnData = await index.pharmacyNameSearch(pharmacyData, req.body['name']);
      }
      res.send(returnData);
    }
});

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`伺服器啟動`);
});

async function getPharmacyData() {
  pharmacyData = await data.readOnlineCsv().catch(); // 取得csv檔案
}

setInterval(getPharmacyData,config.minute * 60 * 1000); // 重複撈取資料更新

getPharmacyData().then().catch(); // 初次取得資料
