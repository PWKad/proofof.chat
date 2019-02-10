export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'],  moduleId: './routes/list', nav: false, title: 'List' },
      { route: '/ln-visualizer',  moduleId: './routes/ln-visualizer', nav: false, title: 'LN Visualizer' },
      { route: '/:id',  moduleId: './routes/details', nav: false, title: 'Details' }
    ]);

    this.router = router;
  }
}
