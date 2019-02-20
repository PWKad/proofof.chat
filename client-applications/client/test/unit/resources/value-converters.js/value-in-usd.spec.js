import {ValueInUsdValueConverter} from '../../../../src/resources/value-converters/value-in-usd';
import {Container} from 'aurelia-dependency-injection';

describe('ValueInUsdValueConverter', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(ValueInUsdValueConverter);
  });

  describe('toView()', () => {
    it('formats the value in USD', () => {
      const value = 2000;
      const lastExchangeRate = 1000;

      const result = sut.toView(value, lastExchangeRate);

      expect(result).toBe('0.02');
    });
  });
});
