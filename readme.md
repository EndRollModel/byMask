＊本sample資料內容均以採用[政府公開資料平台](https://data.nhi.gov.tw/Datasets/Download.ashx?rid=A21030000I-D50001-001&l=https://data.nhi.gov.tw/resource/mask/maskdata.csv)

帶口罩api 

2020 1月起 由政府開放資料開放剩餘口罩數量資料

運作模式：   
固定時間內連線至公開平台拿取資料保存
可以查詢剩餘數量

Config內可以設定參數       
minute：每幾分鐘更新一次     
lave: 是否僅顯示數量大於0的資料     
forceUpdate:棄用      
path:棄用     

#

### How to use

port : 3000     
Content-Type : application/json    

```
data : 
（neme 或是 keywords 擇一搜尋即可）
{   
    "name" : "藥局/醫院名稱"
    "keywords" : 查詢任何資料內的關鍵字 地址或是營業時間
} 
```
