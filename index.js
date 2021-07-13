const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer(function (req, res) {
    // console.log(req.url);
    const baseURL = "http://" + req.headers.host + "/";
    const reqUrl = new URL(req.url, baseURL);
    console.log(reqUrl.pathname);
    if (reqUrl.pathname == "/") {
      reqUrl.pathname = "/index";
    }
    console.log(reqUrl.pathname);

    fs.readFile(`.${reqUrl.pathname}.html`, function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return fs.createReadStream("./404.html").pipe(res);
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
