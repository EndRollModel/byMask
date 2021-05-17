const config = {};
// 藥局資料
config.csvUrl = `https://data.nhi.gov.tw/Datasets/Download.ashx?rid=A21030000I-D50001-001&l=https://data.nhi.gov.tw/resource/mask/maskdata.csv`;
// 更新資料的時間(分鐘單位)
config.minute = 3;
// 剩餘數量大於0
config.lave = false;
// 無論時間 強制更新
config.forceUpdate = false;
// csv路徑
// config.path = `${process.cwd()}\\csv\\`; // 打包用路徑
config.path = `./csv/`; //

module.exports = config;
