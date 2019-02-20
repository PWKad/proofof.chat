const graphUpdatesService = require('./service');

const ChannelUpdate = {
  id: 'i',
  base_fee_mtokens: 'a',
  capacity: 'b',
  cltv_delta: 'c',
  fee_rate: 'd',
  is_disabled: 'e',
  min_htlc_mtokens: 'f',
  public_keys: 'g',
  transaction_id: 'h',
  transaction_vout: 'j',
  type: 't',
  updated_at: 'u'
}

const ChannelClosedUpdate = {
  capacity: 'k',
  id: 'i',
  close_height: 'l',
  transaction_id: 'm',
  transaction_vout: 'n',
  type: 't',
  updated_at: 'u'
}

const NodeUpdate = {
  alias: 'o',
  color: 'a',
  public_key: 'p',
  sockets: 'q',
  type: 'r',
  updated_at: 's'
}

class SerializedUpdate {
  constructor(data, classToUse) {
    Object.keys(data).forEach(key => {
      let value = data[key];
      this[classToUse[key]] = value;
    });
  }
  deserialize() {
    const classToUse = this.t === 'node_update' ? NodeUpdate : (this.t === 'channel_update' ? ChannelUpdate : ChannelClosedUpdate);

    Object.keys(classToUse).forEach(key => {
      let shortKey = classToUse[key];
      let value = this[shortKey];
      this[key] = value;
      delete this[shortKey];
    });
  }
}

class GraphPreserverService {
  subscribe(eventEmitter) {
    eventEmitter.on('end', (data) => {
      console.log('end')
      console.log(data)
    });

    eventEmitter.on('error', (data) => {
      console.log('error')
      console.log(data)
    });

    eventEmitter.on('status', (data) => {
      console.log('status')
      console.log(data)
    });

    eventEmitter.on('data', (data) => {
      if (!data) {
        throw new Error('No data.  Something went wrong');
      }
      let classToUse;

      if (data.public_keys) {
        classToUse = ChannelUpdate;
      } else if (data.close_height) {
        classToUse = ChannelClosedUpdate;
      } else if (data.alias) {
        classToUse = NodeUpdate;
      }

      if (classToUse) {
        const item = new SerializedUpdate(data, classToUse);
        graphUpdatesService.create(item);
      }
    });

    eventEmitter.on('exit', (data) => {
      console.log('exiting')
    });
  }
}

module.exports = new GraphPreserverService();
