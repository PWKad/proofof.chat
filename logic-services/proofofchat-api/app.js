const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errorHandler = require('./config/error-handler');
const seedData = require('./config/seed-data');

// const channels = require('./routes/channels');
const exchangeRates = require('./routes/exchange-rates');
// const invoices = require('./routes/invoices');
const messages = require('./routes/messages');
const networkInfo = require('./routes/network-info');
// const peers = require('./routes/peers');
const {verifyClient} = require('ln-service/push');
const {subscribeToInvoices} = require('ln-service');

const invoicesService = require('@coinmesh/lnd-adapter').invoicesService;
const transactionsService = require('@coinmesh/lnd-adapter').transactionsService;

const webSocketService = require('./services/web-socket-service');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function getApp(getServer = null) {
  return new Promise((resolve, reject) => {
    if (getServer) {
      const server = getServer(app);

      // let wss = new WebSocketServer({ server });

      // wss.on('connection', (ws) => {
      //   console.log('!'.repeat(100))
      //   ws.send('connection accepted.');
      //   console.log('sent')
      // });

      // let invoicesSubscription = invoicesService.subscribe();
      const lnd = invoicesService.lnd;
      app.lnd = lnd;
      const invoicesSubscription = subscribeToInvoices({lnd});
      console.log('-'.repeat(100))
      console.log(lnd)

      invoicesSubscription.on('data', () => { console.log('testing'); });

      webSocketService.createServer(server);
      webSocketService.subscribe(invoicesSubscription);

      app.webSocketService = webSocketService;
      console.log('ok done')

//TODO: Move this to wherever it works
      // invoicesSubscription.on('data', (invoice) => {
      //   console.log('-'.repeat(100))
      //   console.log('invoice updated')
      //   console.log(invoice)
      //   if (invoice.is_confirmed) {
      //     messagesService.getByLightningRequest(invoice.request).then(message => {
      //       console.log('='.repeat(100))
      //       console.log(message)
      //       if (message && !message.paymentConfirmed) {
      //         message.paymentConfirmed = true;
      //         message.message = message.hiddenMessage;
      //         message.save().then(() => {
      //           wss.emit('data', message);
      //         });
      //       }
      //     });
      //   }
      // });
      // invoicesSubscription.on('error', (data) => {
      //   console.log(data)
      // });
      // invoicesSubscription.on('end', (data) => {
      //   console.log(data)
      // });
      // invoicesSubscription.on('status', (data) => {
      //   console.log(data)
      // });
      // app.invoicesSubscription = invoicesSubscription;
    }

    // app.use('/v1/channels', channels);
    app.use('/v1/exchange-rates', exchangeRates);
    // app.use('/v1/invoices', invoices);
    app.use('/v1/messages', messages);
    app.use('/v1/network-info', networkInfo);
    // app.use('/v1/peers', peers);

    app.use(errorHandler);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use((err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.json({ error: err });
    });

    resolve(app);
  });
}

module.exports = getApp;
