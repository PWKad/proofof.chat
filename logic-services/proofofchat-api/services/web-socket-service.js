const WebSocketServer = require('ws').Server;

class WebSocketService {
  createServer(server) {
    this.wss = new WebSocketServer({ server });
  }
  subscribe(eventEmitter) {

    eventEmitter.on('end', function(data) {
      console.log('end')
      console.log(data)
    });
    eventEmitter.on('connection', function(data) {
      console.log('connect')
      console.log(data)
    });
    eventEmitter.on('error', function(data) {
      console.log('error')
      console.log(data)
    });

    eventEmitter.on('status', function(data) {
      console.log('status')
      console.log(data)
    });
    eventEmitter.on('data', function(data) {
      console.log('data')
      console.log(data)
      // this.wss.clients.forEach(client => {
      //   client.send(data.toString());
      // });
      // this.wss.emit('data', data.toString());
    });

    eventEmitter.on('exit', function(code) {
      console.log('exit')
      console.log(code)
      // this.wss.clients.forEach(client => {
      //   client.send(code);
      // });;
    });
    setTimeout(() => {
      console.log('going to try to emit and see what happens')
      eventEmitter.emit('data', { test: 'ok' });
    }, 10000);
    console.log('done')
  }
}

module.exports = new WebSocketService();
