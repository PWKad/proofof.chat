import environment from './environment';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .globalResources([
      './resources/date-format'
    ])
    .plugin('aurelia-dialog');

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  return aurelia.start().then(() => aurelia.setRoot());
}
