const Message = require('../../../models/message');

describe('Message', () => {
  let message;

  beforeEach(() => {
    message = new Message({
      signature: 'test',
      hiddenMessage: 'test',
      invoiceId: 'test',
      paymentConfirmed: 'test',
      lightningRequest: 'test'
    });
  });

  describe('toJSON()', () => {
    it('removes discrete properties when serializing to JSON', () => {
      expect(message.signature).not.toBe(undefined);
      expect(message.hiddenMessage).not.toBe(undefined);
      expect(message.invoiceId).not.toBe(undefined);
      expect(message.paymentConfirmed).not.toBe(undefined);
      expect(message.lightningRequest).not.toBe(undefined);

      const jsonMessage = JSON.stringify(message);
      const result = JSON.parse(jsonMessage);

      expect(result.signature).toBe(undefined);
      expect(result.hiddenMessage).toBe(undefined);
      expect(result.invoiceId).toBe(undefined);
      expect(result.paymentConfirmed).toBe(undefined);
      expect(result.lightningRequest).toBe(undefined);
    });
  });
});
