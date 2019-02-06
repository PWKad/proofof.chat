import {HttpWrapper} from './http-wrapper';

export class ExchangeRatesService {
  static inject  = [HttpWrapper];
  constructor(httpWrapper) {
    this.http = httpWrapper;
  }
  getExchangeRate(code = 'btcusd') {
    let url = `/exchange-rates/${code}`;

    return this.http.get(url).then(result => {
      return result;
    });
  }
}
