import {DateFormatValueConverter} from '../../../../src/resources/value-converters/date-format';
import {Container} from 'aurelia-dependency-injection';
import moment from 'moment';

describe('DateFormatValueConverter', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(DateFormatValueConverter);
  });

  describe('toView()', () => {
    it('formats dates', () => {
      const Feb192019atTen09PM = 1550635789651;
      const result = sut.toView(Feb192019atTen09PM);

      expect(result).toBe('2/19/2019 10:09:49 pm');
    });
  });
});
