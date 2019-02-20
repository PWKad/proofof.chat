const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const errorHandler = require('./config/error-handler');
const seedData = require('./config/seed-data');
const cleanGraphData = require('./config/clean-graph-data');

const exchangeRates = require('./routes/exchange-rates');
const messages = require('./routes/messages');
const nodes = require('./routes/nodes');
const networkInfo = require('./routes/network-info');
const {verifyClient} = require('ln-service/push');

const invoicesService = require('@coinmesh/lnd-adapter').invoicesService;
const transactionsService = require('@coinmesh/lnd-adapter').transactionsService;
const networkInfoService = require('@coinmesh/lnd-adapter').networkInfoService;

const webSocketService = require('./services/web-socket-service');
const graphPreserverService = require('./services/graph-updates/preserver-service');

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

      let invoicesEventEmitter = invoicesService.subscribe();
      let graphEventEmitter = networkInfoService.subscribe();

      webSocketService.createServer(server);
      webSocketService.subscribe(invoicesEventEmitter);

      graphPreserverService.subscribe(graphEventEmitter);
    }

    // cleanGraphData();

    app.use('/v1/exchange-rates', exchangeRates);
    app.use('/v1/messages', messages);
    app.use('/v1/nodes', nodes);
    app.use('/v1/network-info', networkInfo);

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
