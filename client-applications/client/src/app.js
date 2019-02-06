import {DataStore} from './services/data-store';

export class App {
  static inject = [DataStore];
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Proof of Chat';

    config.map([
      {
        route: ['', 'messages'],
        name: 'messages',
        moduleId: './routes/messages/index',
        nav: true,
        title: 'Messages'
      }, {
        route: 'nodes',
        name: 'nodes',
        moduleId: './routes/nodes/index',
        nav: true,
        title: 'Nodes'
      }
    ]);

    config.mapUnknownRoutes('./routes/messages/index');
  }
}
