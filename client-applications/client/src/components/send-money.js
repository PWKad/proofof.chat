import {bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {ExchangeRatesService} from '../services/exchange-rates';
import {InvoicesService} from '../services/invoices';
import {Invoice} from '../models/index';

export class SendMoney {
  @bindable amount = 0;
  @bindable address;
  @bindable currency = 'btc';
  @bindable listing;
  @bindable invoice;

  currencies = [
    { name: 'Bitcoin', symbol: 'BTC', code: 'btc' },
    { name: 'Satoshis', symbol: 'SAT', code: 'sat' },
    { name: 'Dollar', symbol: 'USD', code: 'usd' }
  ];

  @bindable selectedCurrency;

  @bindable isShowingLightningPanel;

  static inject = [DialogController, ExchangeRatesService, InvoicesService];
  constructor(dialogController, exchangeRatesService, invoicesService) {
    this.controller = dialogController;
    this.exchangeRatesService = exchangeRatesService;
    this.invoicesService = invoicesService;
  }

  activate(model) {
    this.address = model.address;
    this.listing = model.listing;

    this.selectedCurrency = this.currencies.find(currency => currency.code === 'sat');
  }
  attached() {
    return this.exchangeRatesService.getExchangeRate().then(result => {
      this.exchangeRate = result;
    });
  }
  amountChanged(newValue) {
    let displayValue = (newValue * this.exchangeRate);
    this.currentUsdValue = displayValue;
  }
  generateInvoice() {
    let invoice = new Invoice({
      description: `Invoice for ${this.address.address}`,
      tokens: this.amount,
      internalDescription: `${this.address.address}`,
      currency: this.selectedCurrency.code,
      listing: this.listing
    });

    return this.invoicesService.createInvoice(invoice).then(result => {
      this.invoice = result;
    });
  }
  toggleShowLightning() {
    this.isShowingLightningPanel = !this.isShowingLightningPanel;
  }
  toggleOpenCurrencies() {
    this.isCurrenciesOpen = !this.isCurrenciesOpen;
  }
  selectCurrency(currency) {
    this.currency = currency.code;
    this.selectedCurrency = currency;
    this.isCurrenciesOpen = false;
  }
}
