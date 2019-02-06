import {bindable} from 'aurelia-templating';
import $ from 'jquery';
import {ExchangeRatesService} from '../services/exchange-rates';

export class DisplayQrCode {
  @bindable value;
  @bindable message = '';

  qrCodeElement;

  static inject = [Session, ExchangeRatesService];
  constructor(session, exchangeRatesService) {
    this.session = session;
    this.exchangeRatesService = exchangeRatesService;
  }

  attached() {
    if (!this.session.currentExchangeRate) {
      return this.refreshExchangeRateAndValues().then(() => {
        this.showQrCode();
      });
    } else {
      this.showQrCode();
    }
  }
  showQrCode() {
    if (this.qrCode) {
      this.qrCode.clear();
      this.qrCode.makeCode(this.value);
    } else {
      this.qrCode = new QRCode(this.qrCodeElement, {
        text: this.value,
        width: 150,
        height: 150
      });
    }
  }
  refreshExchangeRateAndValues() {
    return this.exchangeRatesService.getExchangeRate();
  }
}
