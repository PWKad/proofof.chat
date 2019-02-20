import {SatsToBtcValueConverter} from '../../../../src/resources/value-converters/sats-to-btc';
import {Container} from 'aurelia-dependency-injection';

describe('SatsToBtcValueConverter', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(SatsToBtcValueConverter);
  });

  describe('toView()', () => {
    it('formats sats in btc', () => {
      const sats = 100;
      const expectedResult = '0.000001';

      const result = sut.toView(sats);

      expect(result).toBe(expectedResult);
    });
  });
});
