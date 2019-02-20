const WebSocketServer = require('ws').Server;
const Message = require('../models/message');

class WebSocketService {
  createServer(server) {
    this.wss = new WebSocketServer({ server });

    this.wss.on('connection', (ws) => {
      ws.send(JSON.stringify({message: 'connection accepted'}));
    });

    return this.wss;
  }
  sendNewMessage(message) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        const body = JSON.stringify(message);
        client.send(body);
      }
    });
  }
  subscribe(eventEmitter) {
    eventEmitter.on('data', (invoice) => {
      setTimeout(() => {
        Message.getMessageByInvoiceId(invoice.id).then(message => {
          if (message && !message.paymentConfirmed && invoice.is_confirmed) {
            message.paymentConfirmed = true;
            message.message = message.hiddenMessage;

            message.save().then(() => {
              this.sendNewMessage(message);
            });
          } else {
            this.sendNewMessage(message);
          }
        });
      }, 500);
    });

    eventEmitter.on('exit', (data) => {
      console.log('exiting')
    });
  }
}

module.exports = new WebSocketService();
