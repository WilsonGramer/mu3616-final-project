const ip = require("ip");
const qrCode = require("qrcode-terminal");

const port = 8080;

const ipAddress = ip.address();
const serverUrl = `ws://${ipAddress}:${port}`;
const appUrl = `http://${ipAddress}:5173/?serverUrl=${encodeURIComponent(serverUrl)}`;
console.log("server:", serverUrl);
console.log("app:", appUrl);
console.log();
qrCode.generate(appUrl);
