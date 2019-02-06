import {Session} from '../../services/session';

export class ValueInUsdValueConverter {
  static inject = [Session];
  constructor(session) {
    this.session = session;
  }

  toView(value, lastExchangeRate) {
    if (!lastExchangeRate) {
      lastExchangeRate = this.session.currentExchangeRate.last;
    }

    const dollarsPerSatoshi = lastExchangeRate / 100000000;
    const satoshis = value;

    const dollarValue = dollarsPerSatoshi * satoshis;

    const valueString = dollarValue ? dollarValue.toString() : '0';
    const dotIndex = valueString.indexOf('.');
    const truncatedValueString = dotIndex > -1 ? valueString.slice(0, dotIndex + 3) : valueString;

    return `${truncatedValueString}`;
  }
}
