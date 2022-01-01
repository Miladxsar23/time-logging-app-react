const handler = require('serve-handler');
const {createServer} = require('http');
const { middleware } = require('./disable-browser-catch');

const server = createServer((req, res) => {
    middleware(req, res);
    handler(req, res, {
        public : './public'
    })
})
server.listen(3000, () => {
    console.log("server run at : http://localhost:3000")
})