fs = require('fs');
http = require('http');
url = require('url');


http.createServer(function(req, res) {
    var request = url.parse(req.url, true);
    var action = decodeURIComponent(request.pathname);
    console.log("action = " + action);

    if (fs.existsSync(action)) {
        // Do something
        var img = fs.readFileSync(action);
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.end(img, 'binary');
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World \n');
    }
}).listen(8080, '127.0.0.1');