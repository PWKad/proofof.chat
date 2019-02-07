import {bindable} from 'aurelia-templating';
import $ from 'jquery';
import {ExchangeRatesService} from '../services/exchange-rates';

export class DisplayInvoice {
  @bindable invoice;

  qrCodeElement;

  static inject = [ExchangeRatesService];
  constructor(exchangeRatesService) {
    this.exchangeRatesService = exchangeRatesService;
  }

  attached() {
    return this.refreshExchangeRateAndValues().then(exchangeRate => {
      this.showQrCode();
    });
  }
  showQrCode() {
    if (this.qrCode) {
      this.qrCode.clear();
      this.qrCode.makeCode(this.invoice.request);
    } else {
      this.qrCode = new QRCode(this.qrCodeElement, {
        text: this.invoice.request,
        width: 250,
        height: 250
      });
    }
  }
  refreshExchangeRateAndValues() {
    return this.exchangeRatesService.getExchangeRate();
  }
}
