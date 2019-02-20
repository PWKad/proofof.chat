import {CurrencySymbolWithValueValueConverter} from '../../../../src/resources/value-converters/currency-symbol-with-value';
import {Container} from 'aurelia-dependency-injection';

describe('CurrencySymbolWithValueValueConverter', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(CurrencySymbolWithValueValueConverter);
  });

  describe('toView()', () => {
    it('formats bitcoin', () => {
      const result = sut.toView(1, 'btc');

      expect(result).toBe('₿ 1');
    });
  });

  describe('toView()', () => {
    it('formats litecoin', () => {
      const result = sut.toView(1, 'ltc');

      expect(result).toBe('Ł 1');
    });
  });

  describe('toView()', () => {
    it('formats usd', () => {
      const result = sut.toView(1, 'usd');

      expect(result).toBe('$ 1');
    });
  });
});
