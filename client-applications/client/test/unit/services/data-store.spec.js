import {DataStore} from '../../../src/services/data-store';
import {Container} from 'aurelia-dependency-injection';
import {Message} from '../../../src/models/message';

describe('DataStore', () => {
  let sut;
  let container;

  const fakeNode = { id: '123', pub_key: 123 };
  const fakeNodeTwo = { id: '321', pub_key: 1234 };
  const fakeMessage = new Message({ id: '4556', message: 'Hello World' });

  beforeEach(() => {
    container = new Container();

    sut = container.get(DataStore);
  });

  describe('addNode()', () => {
    it('adds a node', () => { sut.addNode(fakeNode); expect(sut.nodes.indexOf(fakeNode) > -1) });
  });

  describe('addNodes()', () => {
    it('adds a list of nodes', () => {
      sut.addNodes([fakeNode, fakeNodeTwo]);

      expect(sut.nodes.indexOf(fakeNode) > -1);
      expect(sut.nodes.indexOf(fakeNodeTwo) > -1);
    });
  });

  describe('removeNode()', () => {
    it('removes a node', () => {
      sut.nodes = [fakeNode];

      sut.removeNode(fakeNode);
      expect(sut.nodes.indexOf(fakeNode) === -1)
    });
  });

  describe('addMessage()', () => {
    it('adds a node', () => { sut.addNode(fakeMessage); expect(sut.nodes.indexOf(fakeMessage) > -1) });
  });

  describe('removeMessage()', () => {
    it('removes a message', () => {
      sut.nodes = [fakeMessage];

      sut.removeMessage(fakeMessage);
      expect(sut.nodes.indexOf(fakeMessage) === -1);
    });
  });

  describe('getNodeById()', () => {
    it('returns a node by given id', () => {
      sut.nodes = [fakeNode];

      const result = sut.getNodeById(fakeNode.id);

      expect(result).toBe(fakeNode);
    });
  });

  describe('getMessageById()', () => {
    it('returns a message by given id', () => {
      sut.messages = [fakeMessage];

      const result = sut.getMessageById(fakeMessage.id);

      expect(result).toBe(fakeMessage);
    });
  });

  describe('updateMessage()', () => {
    describe('when message already is in messages array', () => {
      it('merges the two messages', () => {
        const newMessage = newMessage;
        const updatedFakeMessage = { id: fakeMessage.id, message: newMessage };

        sut.messages = [fakeMessage];

        sut.updateMessage(updatedFakeMessage);

        expect(fakeMessage.message).toBe(newMessage);
      });
    });

    describe('when message is not already in messages array', () => {
      it('adds the new message', () => {
        const newFakeMessage = { id: '987', message: 'Hello World Test' };

        sut.messages = [fakeMessage];

        sut.updateMessage(newFakeMessage);

        expect(sut.messages.length).toBe(2);
      });
    });
  });
});
