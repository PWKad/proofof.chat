import {HttpClient} from 'aurelia-http-client';
import environment from '../environment';

export class HttpWrapper {
  static inject = [HttpClient];
  constructor(httpClient) {
    this.httpClient = httpClient.configure(x => {
      x.withBaseUrl(environment.apiBaseUrl);
    });
  }
  get(url) {
    return this.httpClient.get(url).then(result => {
      return result.content;
    });
  }
  post(url, body) {
    return this.httpClient.post(url, body).then(result => {
      return result.content;
    });
  }
  patch(url, body) {
    return this.httpClient.patch(url, body).then(result => {
      return result.content;
    });
  }
  put(url, body) {
    return this.httpClient.put(url, body).then(result => {
      return result.content;
    });
  }
  delete(url) {
    return this.httpClient.delete(url);
  }
}
