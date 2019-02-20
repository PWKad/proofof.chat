import {SortValueConverter} from '../../../../src/resources/value-converters/sort';
import {Container} from 'aurelia-dependency-injection';

describe('SortValueConverter', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(SortValueConverter);
  });

  describe('toView()', () => {
    it('sorts by property passed in', () => {
      const itemOne = {id: 100};
      const itemTwo = {id: 10};

      const result = sut.toView([itemOne, itemTwo]);

      expect(result[0]).toBe(itemTwo);
    });
  });
});
