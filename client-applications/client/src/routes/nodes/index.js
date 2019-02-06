import {NetworkInfo} from '../../models/network-info';
import {bindable, computedFrom} from 'aurelia-framework';
import {NetworkInfosService} from '../../services/network-infos';
import {ChannelsService} from '../../services/channels';
import {DataStore} from '../../services/data-store';

export class Index {
  @bindable channelConnectionStatus;
  @bindable channel;
  @bindable networkInfo;

  static inject = [NetworkInfosService, DataStore, ChannelsService];
  constructor(networkInfosService, dataStore, channelsService) {
    this.networkInfosService = networkInfosService;
    this.dataStore = dataStore;
    this.channelsService = channelsService;
  }
  activate() {
    let promises = [];

    promises.push(this.networkInfosService.getInfo().then(networkInfo => {
      this.networkInfo = networkInfo;
    }));

    return Promise.all(promises);
  }
  @computedFrom('networkInfo.walletInfo', 'networkInfo.nodeInfo')
  get nodeUri() {
    if (!this.networkInfo || !this.networkInfo.walletInfo || !this.networkInfo.nodeInfo || !this.networkInfo.nodeInfo.sockets) {
      return '(not loaded)';
    }
    const pubKey = this.networkInfo.walletInfo.public_key;
    const socket = this.networkInfo.nodeInfo.sockets[0].socket;

    return `${pubKey}@${socket}`;
  }
}
