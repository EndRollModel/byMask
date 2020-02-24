const config = {};
// 藥局資料
config.csvUrl = `https://data.nhi.gov.tw/Datasets/Download.ashx?rid=A21030000I-D50001-001&l=https://data.nhi.gov.tw/resource/mask/maskdata.csv`;
// csv路徑
config.path = `./csv/`;
// 更新資料的時間(分鐘單位)
config.minute = 10;

module.exports = config;