import {bindable} from 'aurelia-templating';

export class NodeDetails {
  @bindable node;
  @bindable close = () => { console.error('Must override close'); }

  getNodeUri(pubKey, address) {
    return `${pubKey}@${address}`;
  }
}
