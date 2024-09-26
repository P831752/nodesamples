const http = require('http');
const server = http.createServer((req, res) => {
    res.end('Welcome to CAP');
})

server.listen(5000, () => console.log('listen port 5000'));
