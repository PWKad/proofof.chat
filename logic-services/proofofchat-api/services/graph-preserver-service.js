const ChannelUpdate = {
  id: 'i',
  base_fee_mtokens: '1',
  capacity: '2',
  cltv_delta: '3',
  fee_rate: '4',
  is_disabled: '5',
  min_htlc_mtokens: '6',
  public_keys: '7',
  transaction_id: '8',
  transaction_vout: '9',
  type: 't',
  updated_at: 'u'
}

const ChannelClosedUpdate = {
  capacity: '0',
  id: 'i',
  close_height: '2',
  transaction_id: '3',
  transaction_vout: '4',
  type: 't',
  updated_at: 'u'
}

const NodeUpdate = {
  alias: '0',
  color: '1',
  public_key: '2',
  sockets: '3',
  type: 't',
  updated_at: 'u'
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
        graphPreserverService.saveUpdate(item);
      }
    });

    eventEmitter.on('exit', (data) => {
      console.log('exiting')
    });
  }
}

module.exports = new GraphPreserverService();
