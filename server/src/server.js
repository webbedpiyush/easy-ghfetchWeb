const http = require("http");
const app = require("./app");
const PORT = 8000;
const server = http.createServer(app);

server.listen(PORT, (req, res) => {
  console.log(`the server is listening to ${PORT}...`);
});
