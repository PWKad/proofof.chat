import {bindable} from 'aurelia-templating';
import $ from 'jquery';

export class DisplayQrCode {
  @bindable value;
  @bindable message = '';

  qrCodeElement;

  attached() {
    this.showQrCode();
  }
  showQrCode() {
    if (this.qrCode) {
      this.qrCode.clear();
      this.qrCode.makeCode(this.value);
    } else {
      this.qrCode = new QRCode(this.qrCodeElement, {
        text: this.value,
        width: 150,
        height: 150
      });
    }
  }
}
