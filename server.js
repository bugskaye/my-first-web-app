// 1. 載入 Node.js 內建的網頁伺服器模組 (HTTP 模組)
const http = require('http');

// 2. 定義伺服器的連接埠 (Port)。我們選用 3000 連接埠
const PORT = 3000;

// 3. 建立伺服器主體邏輯 (這相當於 SAP 的網頁服務處理器，例如 OData Handler)
const server = http.createServer((req, res) => {
    
    // 設定網頁回應標頭：允許跨網域存取 (CORS)，並宣告回傳內容為 JSON 格式
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 商業邏輯路由判斷 (相當於在 SAP 內判斷不同的 OData Entity Set)
    if (req.url === '/api/sap-info' && req.method === 'GET') {
        
        // 模擬從資料庫（SAP Database Table）抓取出來的資料
        const sapData = {
            systemId: "DEV",
            client: "100",
            developer: "kaye (ABAPER)",
            status: "Connected to WSL Ubuntu successfully!",
            timestamp: new Date().toISOString()
        };

        // 回傳狀態碼 200 (成功)，並將資料轉為字串送回給前端
        res.writeHead(200);
        res.end(JSON.stringify(sapData));

    } else {
        // 如果前端亂打網址，回傳 404 Not Found (相當於物件不存在)
        res.writeHead(404);
        res.end(JSON.stringify({ error: "找不到該 API 路徑！" }));
    }
});

// 4. 啟動伺服器，開始監聽 3000 連接埠
server.listen(PORT, () => {
    console.log(`🚀 後端 API 伺服器已成功啟動！`);
    console.log(`🌐 正在監聽網址: http://localhost:${PORT}/api/sap-info`);
});
