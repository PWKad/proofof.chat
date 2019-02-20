import {NodeDetails} from '../../../src/components/node-details';
import {Container} from 'aurelia-dependency-injection';

describe('NodeDetails', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(NodeDetails);
  });

  describe('getNodeUri()', () => {
    it('concatenates the pubkey and address in to a valid QRCode for channel creation', () => {
      const pubkey = '123';
      const address = '456:789';

      const result = sut.getNodeUri(pubkey, address);

      const expectedResult = `123@456:789`;
      expect(result).toBe(expectedResult);
    });
  });
});
