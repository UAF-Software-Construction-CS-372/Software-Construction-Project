var http = require('http');
var fs = require('fs');

http.createServer( function (req, res) {
    fs.readFile('src/test.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
    });

    fs.readFile('public/login.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(10000);
