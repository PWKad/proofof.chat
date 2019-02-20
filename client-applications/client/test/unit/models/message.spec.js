import {Message} from '../../../src/models/message';

describe('Message', () => {
  const messageId = 123;
  const text = 'test';

  let message;

  beforeEach(() => {
    message = new Message({id: messageId, message: text});
  });

  describe('merge()', () => {
    const color = 'blue';
    let secondMessage;
    let secondText = 'test two';

    beforeEach(() => {
      secondMessage = new Message({id: messageId, message: secondText, fromColor: color});
    });

    it('merges like properties of two messages overwriting the first', () => {
      message.merge(secondMessage);

      expect(message.message).toBe(secondText);
    });

    it('merges the properties of two messages using the second if does not exist on first', () => {
      message.merge(secondMessage);

      expect(message.fromColor).toBe(color);
    });
  });
});
