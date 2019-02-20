import {CurrencySymbolValueConverter} from '../../../../src/resources/value-converters/currency-symbol';
import {Container} from 'aurelia-dependency-injection';

describe('CurrencySymbolValueConverter', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(CurrencySymbolValueConverter);
  });

  describe('toView()', () => {
    it('formats bitcoin', () => {
      const result = sut.toView('btc');

      expect(result).toBe('₿');
    });
  });

  describe('toView()', () => {
    it('formats litecoin', () => {
      const result = sut.toView('ltc');

      expect(result).toBe('Ł');
    });
  });

  describe('toView()', () => {
    it('formats usd', () => {
      const result = sut.toView('usd');

      expect(result).toBe('$');
    });
  });
});
