import {DisplayInvoice} from '../../../src/components/display-invoice';
import {Container} from 'aurelia-dependency-injection';

class QRCodeMock {
  constructor() {}
  clear() {}
  makeCode() {}
}

window.QRCode = QRCodeMock;

describe('DisplayInvoice', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(DisplayInvoice);
    sut.invoice = { request: 'fake request' };
  });

  describe('showQrCode()', () => {
    it('creates a new instance of QRCode if not already set', () => {
      sut.qrCode = null;

      sut.showQrCode();

      expect(sut.qrCode).not.toBe(null);
    });

    it('calls to clear and remake the QRCode if an instance of qrCode already exist', () => {
      const mock = new QRCodeMock();

      sut.qrCode = mock;
      spyOn(sut.qrCode, 'clear');

      sut.showQrCode();

      expect(sut.qrCode.clear).toHaveBeenCalled();
    });
  });
});
