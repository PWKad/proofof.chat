import {DisplayQrCode} from '../../../src/components/display-qr-code';
import {Container} from 'aurelia-dependency-injection';

class QRCodeMock {
  constructor() {}
  clear() {}
  makeCode() {}
}

window.QRCode = QRCodeMock;

describe('DisplayQrCode', () => {
  let sut;
  let container;

  beforeEach(() => {
    container = new Container();

    sut = container.get(DisplayQrCode);
    sut.value = '1234';
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
