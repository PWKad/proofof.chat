import {HttpWrapper} from './http-wrapper';
import {Channel} from '../models/channel';

export class ChannelsService {
  static inject = [HttpWrapper];
  constructor(http) {
    this.http = http;
  }

  getChannels() {
    return this.http.get('/channels').then(result => {
      return result.map(item => {
        return new Channel(item);
      });
    });
  }
  connectChannel(channel) {
    let body = {
      partner_public_key: 'test'
    };
    return this.http.post('/channels', channel).then(result => {
      return new Channel(result);
    });
  }
  getByPubkey(pubkey) {
    return this.http.get(`/channels/pubkey/${pubkey}`).then(result => {
      if (result) {
        return new Channel(result);
      }
      return result;
    });
  }
  getStatusByPubkey(pubkey) {
    return this.http.get(`/channels/pubkey/${pubkey}/status`).then(result => {
      return result;
    });
  }
  connectChannel() {
    return this.http.get(`/channels/connect`).then(result => {
      return result;
    });
  }
}
