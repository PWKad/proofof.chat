const { JsonRpcRequest, jsonRpcClient } = require('../services/json-rpc');

class NetworkInfoService {
  getNetworkInfo() {
    let request = {
      method: 'getnetworkinfo',
      params: [],
      id: 'getnetworkinfo'
    };

    return jsonRpcClient.post(request);
  }

  getEstimatedFee(blocks = 2) {
    let request = {
      method: 'estimatefee',
      params: [blocks],
      id: 'estimatefee'
    };

    return jsonRpcClient.post(request);
  }
}

module.exports = NetworkInfoService;
