const http = require('http');

http.createServer(function (req, res) {
  res.write("chicken dj");
  res.end();
}
).listen(3000);

console.log("chicken dj running on port 3000");
